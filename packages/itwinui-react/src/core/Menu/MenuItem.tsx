/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  SvgCaretRightSmall,
  Portal,
  useMergedRefs,
  useId,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Menu } from './Menu.js';
import { ListItem } from '../List/ListItem.js';
import type { ListItemOwnProps } from '../List/ListItem.js';
import { usePopover } from '../Popover/Popover.js';
import {
  FloatingNode,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
} from '@floating-ui/react';
import { DropdownMenuContext } from '../DropdownMenu/DropdownMenu.js';

export type MenuItemProps = {
  /**
   * Item is selected.
   */
  isSelected?: boolean;
  /**
   * Item is disabled.
   */
  disabled?: boolean;
  /**
   * Value of the item.
   */
  value?: unknown;
  /**
   * Callback function that handles click and keyboard submit actions.
   */
  onClick?: (value?: unknown) => void;
  /**
   * Modify height of the item.
   * Use 'large' when any of the sibling items have `sublabel`.
   *
   * Defaults to 'large' if `sublabel` provided, otherwise 'default'.
   */
  size?: 'default' | 'large';
  /**
   * Sub label shown below the main content of the item.
   */
  sublabel?: React.ReactNode;
  /**
   * SVG icon component shown on the left.
   */
  startIcon?: JSX.Element;
  /**
   * @deprecated Use startIcon.
   * SVG icon component shown on the left.
   */
  icon?: JSX.Element;
  /**
   * SVG icon component shown on the right.
   */
  endIcon?: JSX.Element;
  /**
   * @deprecated Use endIcon.
   * SVG icon component shown on the right.
   */
  badge?: JSX.Element;
  /**
   * ARIA role. For menu item use 'menuitem', for select item use 'option'.
   * @default 'menuitem'
   */
  role?: string;
  /**
   * Items to be shown in the submenu when hovered over the item.
   */
  subMenuItems?: JSX.Element[];
  /**
   * Content of the menu item.
   */
  children?: React.ReactNode;
} & Pick<ListItemOwnProps, 'focused'>;

/**
 * Basic menu item component. Should be used inside `Menu` component for each item.
 */
export const MenuItem = React.forwardRef((props, forwardedRef) => {
  const {
    children,
    isSelected,
    disabled,
    value,
    onClick,
    sublabel,
    size = !!sublabel ? 'large' : 'default',
    icon,
    startIcon = icon,
    badge,
    endIcon = badge,
    role = 'menuitem',
    subMenuItems = [],
    ...rest
  } = props;

  const menuItemRef = React.useRef<HTMLElement>(null);
  const submenuId = useId();

  const [isSubmenuVisible, setIsSubmenuVisible] = React.useState(false);
  const [rightArrowPressed, setRightArrowPressed] = React.useState(false);

  const dropdownMenuContext = React.useContext(DropdownMenuContext);

  const nodeId = useFloatingNodeId();
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();

  React.useEffect(() => {
    const handleArrowLeftPressed = (event: TreeEvent) => {
      if (event.parentId === nodeId) {
        dropdownMenuContext.setLastFocusedNode({ nodeId, parentId });
        setIsSubmenuVisible(false);
        menuItemRef.current?.focus();
      }
    };

    /**
     * The `FloatingTree` needs to be updated with the nodes from the new submenu before calling this function.
     */
    const handleArrowRightPressed = (event: TreeEvent) => {
      if (
        tree?.nodesRef.current.find((n) => n.parentId === event.nodeId)?.id ===
        nodeId
      ) {
        menuItemRef.current?.focus();
      }
    };

    const handleNodeFocused = (event: TreeEvent) => {
      // Consider a node "X" with its submenu "Y".
      // Focusing "X" should close all submenus of "Y".
      if (parentId === event.nodeId) {
        setIsSubmenuVisible(false);
      }

      // When a node "X" is focused, close "X"'s siblings' submenus
      // i.e. only one submenu in each menu can be open at a time
      if (parentId === event.parentId && nodeId !== event.nodeId) {
        setIsSubmenuVisible(false);
      }
    };

    tree?.events.on('arrowLeftPressed', handleArrowLeftPressed);
    tree?.events.on('arrowRightPressed', handleArrowRightPressed);
    tree?.events.on('nodeFocused', handleNodeFocused);

    return () => {
      tree?.events.off('arrowLeftPressed', handleArrowLeftPressed);
      tree?.events.off('arrowRightPressed', handleArrowRightPressed);
      tree?.events.off('nodeFocused', handleNodeFocused);
    };
  }, [
    nodeId,
    parentId,
    tree?.events,
    tree?.nodesRef,
    dropdownMenuContext,
    children,
  ]);

  // Needed to trigger arrowRightPressed only after the FloatingTree has been
  // updated with the nodes from the new submenu.
  React.useEffect(
    () => {
      if (
        rightArrowPressed &&
        subMenuItems.length > 0 &&
        !!tree?.nodesRef.current.find((n) => n.parentId === nodeId) // Tree has been updated with the new submenu
      ) {
        tree.events.emit('arrowRightPressed', {
          nodeId,
          parentId,
        } satisfies TreeEvent);

        setRightArrowPressed(false);
      }
    },
    // TODO: Try to not require this eslint disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      rightArrowPressed, // Run this whenever rightArrowPressed changes
      nodeId,
      parentId,
      subMenuItems.length,
      tree?.events,
      // TODO: How to handle this warning?
      // warning  React Hook React.useEffect has an unnecessary dependency: 'tree?.nodesRef.current'. Either exclude it or remove the dependency array. Mutable values like 'tree.nodesRef.current' aren't valid dependencies because mutating them doesn't re-render the component  react-hooks/exhaustive-deps
      tree?.nodesRef.current,
      children,
      tree?.nodesRef,
    ],
  );

  const popover = usePopover({
    nodeId,
    visible:
      isSubmenuVisible ||
      // to keep the submenus open up till the last hovered submenu, even after hovering out of the entire tree.
      (dropdownMenuContext.lastFocusedNode != null &&
        isAncestor({
          tree,
          node: nodeId,
          referenceNode: dropdownMenuContext.lastFocusedNode.nodeId,
        })),
    onVisibleChange: setIsSubmenuVisible,
    placement: 'right-start',
    trigger: { hover: true },
  });

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.altKey) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Spacebar': {
        !disabled && onClick?.(value);
        event.preventDefault();
        break;
      }
      case 'ArrowRight': {
        if (subMenuItems.length > 0) {
          setIsSubmenuVisible(true);
          setRightArrowPressed(true);

          event.preventDefault();
          event.stopPropagation();
        }
        break;
      }
      case 'ArrowLeft': {
        tree?.events.emit('arrowLeftPressed', {
          nodeId,
          parentId,
        } satisfies TreeEvent);

        event.stopPropagation();
        event.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      menuItemRef.current?.focus();
    }
  };

  const onFocus = (e: React.FocusEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      dropdownMenuContext.setLastFocusedNode({ nodeId, parentId });

      tree?.events.emit('nodeFocused', {
        nodeId,
        parentId,
      } satisfies TreeEvent);
    }
  };

  const handlers = {
    onClick: () => !disabled && onClick?.(value),
    onKeyDown,
    onMouseEnter,
    onFocus,
  };

  return (
    <>
      <ListItem
        as='div'
        actionable
        size={size}
        active={isSelected}
        disabled={disabled}
        ref={useMergedRefs(
          menuItemRef,
          forwardedRef,
          subMenuItems.length > 0 ? popover.refs.setReference : null,
        )}
        role={role}
        tabIndex={disabled || role === 'presentation' ? undefined : -1}
        aria-selected={isSelected}
        aria-haspopup={subMenuItems.length > 0 ? 'true' : undefined}
        aria-controls={subMenuItems.length > 0 ? submenuId : undefined}
        aria-expanded={subMenuItems.length > 0 ? popover.open : undefined}
        aria-disabled={disabled}
        {...(subMenuItems.length === 0
          ? { ...handlers, ...rest }
          : popover.getReferenceProps({ ...handlers, ...rest }))}
      >
        {startIcon && (
          <ListItem.Icon as='span' aria-hidden>
            {startIcon}
          </ListItem.Icon>
        )}
        <ListItem.Content>
          <div>{children}</div>
          {sublabel && <ListItem.Description>{sublabel}</ListItem.Description>}
        </ListItem.Content>
        {!endIcon && subMenuItems.length > 0 && (
          <ListItem.Icon as='span' aria-hidden>
            <SvgCaretRightSmall />
          </ListItem.Icon>
        )}
        {endIcon && (
          <ListItem.Icon as='span' aria-hidden>
            {endIcon}
          </ListItem.Icon>
        )}
      </ListItem>

      {subMenuItems.length > 0 && popover.open && (
        <FloatingNode id={nodeId}>
          <Portal>
            <Menu
              setFocus={false}
              ref={popover.refs.setFloating}
              {...popover.getFloatingProps({
                id: submenuId,
                onPointerMove: () => {
                  // pointer might move into a nested submenu and set isSubmenuVisible to false,
                  // so we need to flip it back to true when pointer re-enters this submenu.
                  setIsSubmenuVisible(true);
                },
              })}
            >
              {subMenuItems}
            </Menu>
          </Portal>
        </FloatingNode>
      )}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', MenuItemProps>;

// ----------------------------------------------------------------------------

export type TreeEvent = {
  nodeId: string;
  parentId: string | null;
};

// ----------------------------------------------------------------------------

/**
 * Returns `true` if `node` is an ancestor of `referenceNode` in the tree.
 */
const isAncestor = ({
  tree,
  referenceNode,
  node,
}: {
  tree: ReturnType<typeof useFloatingTree>;
  referenceNode: string;
  node: string;
}) => {
  const ancestorTree = getAncestorTree({ tree });
  return ancestorTree[node]?.includes(referenceNode);
};

/**
 * @example
 * <caption>Input (tree?.nodesRef.current):</caption>
 * ```tsx
 * [
 *   { id: "1", "parentId": null },
 *   { id: "2", "parentId": "1" },
 *   { id: "3", "parentId": "2" },
 *   { id: "4", "parentId": "2" },
 *   { id: "5", "parentId": "2" },
 *   { id: "6", "parentId": "2" },
 *   { id: "7", "parentId": "6" },
 *   { id: "8", "parentId": "6" },
 * ]
 * ```
 *
 * <caption>Output:</caption>
 * ```tsx
 * {
 *   "1": ["2", "3", "4", "5", "6", "7", "8"],
 *   "2": ["3", "4", "5", "6", "7", "8"],
 *   "3": [],
 *   "4": [],
 *   "5": [],
 *   "6": ["7", "8"],
 *   "7": [],
 *   "8": [],
 * }
 * ```
 */
const getAncestorTree = ({
  tree,
}: {
  tree: ReturnType<typeof useFloatingTree>;
}) => {
  const result: Record<string, string[]> = {};

  if (!tree) {
    return result;
  }

  const nodes = tree.nodesRef.current;
  if (!nodes) {
    return result;
  }

  const nodeIds = nodes.map((node) => node.id).reverse();

  for (const nodeId of nodeIds) {
    const directChildren = nodes
      .filter((node) => node.parentId === nodeId)
      .map((node) => node.id);
    const indirectChildren = directChildren.flatMap((child) => result[child]);

    result[nodeId] = [...directChildren, ...indirectChildren];
  }

  return result;
};
