/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  getFocusableElements,
  Box,
  polymorphic,
  useLayoutEffect,
  cloneElementWithRef,
} from '../../utils/index.js';
import type { CommonProps } from '../../utils/index.js';
import cx from 'classnames';
import { TreeContext } from './TreeContext.js';
import {
  useVirtualizer,
  Virtualizer,
  type VirtualItem,
} from '@tanstack/react-virtual';

export type NodeData<T> = {
  /**
   * Array of the child nodes contained in the node.
   */
  subNodes?: Array<T>;
  /**
   * Unique id of the node.
   */
  nodeId: string;
  /**
   * Custom type used to map type `T` to `NodeData`
   */
  node: T;
  /**
   * Flag whether the node is expanded.
   */
  isExpanded?: boolean;
  /**
   * Flag whether the node is disabled.
   */
  isDisabled?: boolean;
  /**
   * Flag whether the node is selected.
   */
  isSelected?: boolean;
  /**
   * Flag whether the node has sub-nodes.
   * Used to determine if node should be expandable.
   */
  hasSubNodes: boolean;
};

type FlatNode<T> = {
  nodeProps: NodeRenderProps<T>;
  depth: number;
  subNodeIds?: Array<string>;
  parentNode?: FlatNode<T>;
  indexInGroup: number;
};

export type NodeRenderProps<T> = Omit<NodeData<T>, 'subNodes'>;

export type TreeProps<T> = {
  /**
   * Modify size of the tree.
   *
   * @default 'default'
   */
  size?: 'default' | 'small';
  /**
   * Render function that should return the node element.
   * Recommended to use `TreeNode` component.
   * Must be memoized.
   * @example
   * const nodeRenderer = React.useCallback(({ node, ...rest }: NodeRenderProps<DataType>) => (
   *   <TreeNode
   *     label={node.label}
   *     onNodeExpanded={onNodeExpanded}
   *     {...rest}
   *   />
   * ), [onNodeExpanded])
   */
  nodeRenderer: (props: NodeRenderProps<T>) => JSX.Element;
  /**
   * Array of custom data used for `TreeNodes` inside `Tree`.
   */
  data: T[];
  /**
   * Function that maps your `data` entry to `NodeData` that has all info about the node state.
   * It will be used to render a tree node in `nodeRenderer`.
   * Must be memoized.
   * @example
   * const getNode = React.useCallback((node: DemoData): NodeData<DemoData> => {
   *   return {
   *     subNodes: node.subItems,
   *     nodeId: node.id,
   *     node,
   *     isExpanded: expandedNodes[node.id],
   *     hasSubNodes: node.subItems.length > 0,
   *   };
   * }, [expandedNodes]);
   */
  getNode: (node: T) => NodeData<T>;
  /**
   * Virtualization is used to have a better performance with a lot of nodes.
   *
   * When enabled, Tree DOM structure will change - it will have a wrapper div
   * to which `className` and `style` will be applied.
   * @default false
   * @beta
   */
  enableVirtualization?: boolean;
} & CommonProps;

/**
 * Tree component used to display a hierarchical structure of `TreeNodes`. 
 * User should control state of expanded, selected and disabled nodes using `getNode` prop.
 * @example
  type DemoData = {
    id: string;
    label: string;
    subItems: DemoData[];
  };

  const data: Array<DemoData> = [
    {
      id: 'Node-1',
      label: 'Facility 1',
      subItems: [{ id: 'Node-1-1', label: 'Unit 1', subItems: [] }],
    },
    {
      id: 'Node-2',
      label: 'Facility 2',
      subItems: [{ id: 'Node-2-1', label: 'Unit 2', subItems: [] }],
    },
  ];

  const [expandedNodes, setExpandedNodes] = React.useState<Record<string, boolean>>({});
  const onNodeExpanded = React.useCallback((nodeId: string, isExpanded: boolean) => {
    setExpandedNodes((oldExpanded) => ({ ...oldExpanded, [nodeId]: isExpanded }));
  }, []);

  const getNode = React.useCallback((node: DemoData): NodeData<DemoData> => {
    return {
      subNodes: node.subItems,
      nodeId: node.id,
      node,
      isExpanded: expandedNodes[node.id],
      hasSubNodes: node.subItems.length > 0,
    };
  }, [expandedNodes]);

  <Tree<DemoData>
    data={data}
    getNode={getNode}
    nodeRenderer={React.useCallback(({ node, ...rest }) => (
      <TreeNode
        label={node.label}
        onNodeExpanded={onNodeExpanded}
        {...rest}
      />
    ), [onNodeExpanded])}
  />
 */

export const Tree = <T,>(props: TreeProps<T>) => {
  const {
    data,
    className,
    nodeRenderer,
    getNode,
    size = 'default',
    enableVirtualization = false,
    style,
    ...rest
  } = props;

  const treeRef = React.useRef<HTMLUListElement>(null);

  const focusedIndex = React.useRef<number>(0);
  React.useEffect(() => {
    focusedIndex.current = 0;
  }, [data]);

  const getFocusableNodes = React.useCallback(() => {
    const focusableItems = getFocusableElements(treeRef.current);
    // Filter out focusable elements that are inside each node, e.g. checkbox
    return focusableItems.filter(
      (i) => !focusableItems.some((p) => p.contains(i.parentElement)),
    ) as HTMLElement[];
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.altKey) {
      return;
    }
    const items = getFocusableNodes();
    if (!items?.length) {
      return;
    }

    const activeIndex = items.findIndex((el) =>
      el.contains(treeRef.current?.ownerDocument.activeElement as HTMLElement),
    );
    const currentIndex = activeIndex > -1 ? activeIndex : 0;

    switch (event.key) {
      case 'ArrowUp': {
        event.preventDefault();
        const newIndex = Math.max(0, currentIndex - 1);
        items[newIndex].focus();
        focusedIndex.current = newIndex;
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        const newIndex = Math.min(items.length - 1, currentIndex + 1);
        items[newIndex].focus();
        focusedIndex.current = newIndex;
        break;
      }
      default:
        break;
    }
  };

  const [flatNodesList, firstLevelNodesList] = React.useMemo(() => {
    const flatList: FlatNode<T>[] = [];
    const firstLevelNodes: FlatNode<T>[] = [];

    const flattenNodes = (
      nodes: T[] = [],
      depth = 0,
      parentNode?: FlatNode<T>,
    ) => {
      const nodeIdList = Array<string>();
      nodes.forEach((element, index) => {
        const { subNodes, ...nodeProps } = getNode(element);
        const flatNode: FlatNode<T> = {
          nodeProps,
          depth,
          parentNode,
          indexInGroup: index,
        };
        nodeIdList.push(flatNode.nodeProps.nodeId);
        flatList.push(flatNode);
        if (depth === 0) {
          firstLevelNodes.push(flatNode);
        }
        if (flatNode.nodeProps.isExpanded) {
          const subNodeIds = flattenNodes(subNodes, depth + 1, flatNode);
          flatNode.subNodeIds = subNodeIds;
        }
      });
      return nodeIdList;
    };

    flattenNodes(data);

    return [flatList, firstLevelNodes];
  }, [data, getNode]);

  const itemRenderer = React.useCallback(
    (
      index: number,
      virtualItem?: VirtualItem,
      virtualizer?: Virtualizer<Element, Element>,
    ) => {
      const node = flatNodesList[index];
      return (
        <TreeContext.Provider
          key={node.nodeProps.nodeId}
          value={{
            nodeDepth: node.depth,
            subNodeIds: node.subNodeIds,
            groupSize:
              node.depth === 0
                ? firstLevelNodesList.length
                : node.parentNode?.subNodeIds?.length ?? 0,
            indexInGroup: node.indexInGroup,
            parentNodeId: node.parentNode?.nodeProps.nodeId,
            scrollToParent: node.parentNode
              ? () => {
                  const parentNodeId = node.parentNode?.nodeProps.nodeId;
                  const parentNodeIndex = flatNodesList.findIndex(
                    (n) => n.nodeProps.nodeId === parentNodeId,
                  );
                  setScrollToIndex(parentNodeIndex);
                }
              : undefined,
            size,
          }}
        >
          {virtualItem && virtualizer
            ? cloneElementWithRef(nodeRenderer(node.nodeProps), (children) => ({
                ...children.props,
                key: virtualItem.key,
                'data-iui-index': virtualItem.index,
                ref: virtualizer.measureElement,
                style: {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                },
              }))
            : nodeRenderer(node.nodeProps)}
        </TreeContext.Provider>
      );
    },
    [firstLevelNodesList.length, flatNodesList, nodeRenderer, size],
  );

  const [scrollToIndex, setScrollToIndex] = React.useState<number>();
  const flatNodesListRef = React.useRef<FlatNode<T>[]>(flatNodesList);
  React.useEffect(() => {
    flatNodesListRef.current = flatNodesList;
  }, [flatNodesList]);

  React.useEffect(() => {
    setTimeout(() => {
      if (scrollToIndex !== undefined) {
        const nodeId = flatNodesListRef.current[scrollToIndex].nodeProps.nodeId;
        const nodeElement = treeRef.current?.ownerDocument.querySelector(
          `#${nodeId}`,
        ) as HTMLElement;
        nodeElement?.focus();
        // Need to reset that if navigating with mouse and keyboard,
        // e.g. pressing arrow left to go to parent node and then with mouse
        // clicking some other child node and then pressing arrow left
        setScrollToIndex(undefined);
      }
    });
  }, [scrollToIndex]);

  const handleFocus = (event: React.FocusEvent) => {
    if (treeRef.current?.contains(event.relatedTarget)) {
      return;
    }

    const items = getFocusableNodes();
    if (items.length > 0) {
      items[focusedIndex.current]?.focus();
    }
  };

  return (
    <>
      {enableVirtualization ? (
        <VirtualizedTree
          flatNodesList={flatNodesList}
          itemRenderer={itemRenderer}
          scrollToIndex={scrollToIndex}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          ref={treeRef}
          className={className}
          style={style}
          {...rest}
        />
      ) : (
        <TreeElement
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className={className}
          data-iui-size={size === 'small' ? 'small' : undefined}
          style={style}
          ref={treeRef}
          {...rest}
        >
          {flatNodesList.map((_, i) => itemRenderer(i))}
        </TreeElement>
      )}
    </>
  );
};

const TreeElement = polymorphic.ul('iui-tree', {
  role: 'tree',
  tabIndex: 0,
});

type VirtualizedTreeProps<T> = {
  flatNodesList: FlatNode<T>[];
  itemRenderer: (
    index: number,
    virtualItem?: VirtualItem,
    virtualizer?: Virtualizer<Element, Element>,
  ) => JSX.Element;
  scrollToIndex?: number;
  onKeyDown: React.KeyboardEventHandler<HTMLUListElement>;
  onFocus: React.FocusEventHandler<HTMLUListElement>;
} & CommonProps;

// Having virtualized tree separately prevents from running all virtualization logic
const VirtualizedTree = React.forwardRef(
  <T,>(
    {
      flatNodesList,
      itemRenderer,
      scrollToIndex,
      className,
      style,
      ...rest
    }: VirtualizedTreeProps<T>,
    ref: React.ForwardedRef<HTMLUListElement>,
  ) => {
    const parentRef = React.useRef<HTMLDivElement | null>(null);
    const getScrollableElement = (
      element: HTMLElement | null,
      ownerDocument: Document = document,
    ): HTMLElement => {
      if (!element || element === ownerDocument.body) {
        return ownerDocument.body;
      }

      return isElementScrollable(element)
        ? element
        : getScrollableElement(element.parentElement, ownerDocument);
    };

    const isElementScrollable = (element: HTMLElement) => {
      const computedStyle = getComputedStyle(element);
      return /(auto|scroll|overlay)/.test(
        computedStyle.getPropertyValue('overflow') +
          computedStyle.getPropertyValue('overflow-y'),
      );
    };

    const virtualizer = useVirtualizer({
      count: flatNodesList.length,
      getScrollElement: () =>
        getScrollableElement(
          parentRef.current,
          parentRef.current?.ownerDocument,
        ),
      estimateSize: () => 39, //Set to 39px since that is the height of a treeNode with a sub label with the default font size.
      overscan: 10,
      indexAttribute: 'data-iui-index',
    });

    const outerProps = {
      style: {
        minInlineSize: '100%',
        ...style,
      },
    } as React.HTMLAttributes<HTMLElement>;

    const innerProps = {
      style: {
        minBlockSize: virtualizer.getTotalSize(),
        willChange: 'transform',
      },
    } as const;

    useLayoutEffect(() => {
      setTimeout(() => {
        if (scrollToIndex) {
          virtualizer.scrollToIndex(scrollToIndex, { align: 'auto' });
        }
      });
    }, [scrollToIndex, virtualizer]);

    return (
      <Box
        {...{
          ...outerProps,
          className: cx(className, outerProps.className),
          style: { ...style, ...outerProps.style },
        }}
        ref={parentRef}
      >
        <TreeElement {...innerProps} {...rest} ref={ref}>
          {virtualizer
            .getVirtualItems()
            .map((virtualItem) =>
              itemRenderer(virtualItem.index, virtualItem, virtualizer),
            )}
        </TreeElement>
      </Box>
    );
  },
);
