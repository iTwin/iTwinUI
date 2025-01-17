/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { JSX } from 'react';
import {
  getFocusableElements,
  Box,
  useMergedRefs,
  mergeEventHandlers,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import cx from 'classnames';
import { TreeNodeExpander } from './TreeNodeExpander.js';
import { useTreeContext } from './TreeContext.js';

type TreeNodeProps = {
  /**
   * Unique id of the node.
   * It has to be compatible with HTML id attribute.
   */
  nodeId: string;
  /**
   * Props for main node inside the treeitem (excluding the sub-tree).
   *
   * If you need to customize the root node instead, pass top-level props
   * directly to the `TreeNode` component.
   */
  nodeProps?: React.ComponentProps<'div'>;
  /**
   * The main text displayed on the node.
   */
  label: React.ReactNode;
  /**
   * Props for TreeNode label(affects both the main and sub label).
   */
  labelProps?: React.ComponentProps<'div'>;
  /**
   * Props for the TreeNode's main label.
   */
  titleProps?: React.ComponentProps<'div'>;
  /**
   * Small note displayed below main label.
   */
  sublabel?: React.ReactNode;
  /**
   * Props for TreeNode sublabel
   */
  sublabelProps?: React.ComponentProps<'div'>;
  /**
   * Icon shown before label and sublabel content.
   */
  icon?: JSX.Element;
  /**
   * Props for TreeNode Icon
   */
  iconProps?: React.ComponentProps<'span'>;
  /**
   * Flag whether the node has child sub-nodes. It is used to show expander icon.
   * @default false
   */
  hasSubNodes?: boolean;
  /**
   * Props for subTree list(affects all subnodes of this node).
   */
  subTreeProps?: React.ComponentProps<'div'>;
  /**
   * Flag whether the node is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Flag whether the node is expanded.
   * @default false
   */
  isExpanded?: boolean;
  /**
   * Flag whether the node is selected.
   * @default false
   */
  isSelected?: boolean;
  /**
   * Callback fired when expanding or closing a TreeNode.
   * Gives nodeId and new isExpanded value of specified node.
   */
  onExpanded: (nodeId: string, isExpanded: boolean) => void;
  /**
   * Callback fired when selecting a TreeNode.
   * Gives nodeId and new isSelected value of specified node.
   */
  onSelected?: (nodeId: string, isSelected: boolean) => void;
  /**
   * Checkbox to be shown at the very beginning of the node.
   * If undefined, checkbox will not be shown.
   * Recommended to use `Checkbox` component.
   */
  checkbox?: React.ReactNode;
  /**
   * Props for TreeNode checkbox.
   */
  checkboxProps?: React.ComponentProps<'div'>;
  /**
   * Custom expander element. If `hasSubNodes` is false, it won't be shown.
   */
  expander?: React.ReactNode;
  /**
   * Props for the default TreeNodeExpander that is shown when there are sub nodes and no expander is given.
   */
  expanderProps?: React.ComponentProps<typeof TreeNodeExpander>;
  /**
   * Props for content of the TreeNode.
   * This affects all passed in children of the node, as well as the label, sublabel, icon, and expander.
   * Note that this does not affect the checkbox.
   */
  contentProps?: React.ComponentProps<'div'>;
  /**
   * Content shown after `TreeNode`.
   */
  children?: React.ReactNode;
  /**
   * @deprecated Use `nodeId` instead.
   */
  id?: never;
};

/**
 * `TreeNode` component to display node content within a `Tree`.
 * Must be used inside `Tree` component to correctly set node `depth` and `subNodes`.
 * @example
  <TreeNode
    nodeId={props.nodeId}
    label={props.node.label}
    sublabel={props.node.sublabel}
    onExpanded={onExpanded}
    onSelected={onSelectedNodeChange}
    isDisabled={props.isDisabled}
    isExpanded={props.isExpanded}
    isSelected={props.isSelected}
    checkbox={
      <Checkbox variant='eyeball' disabled={props.isDisabled} />
    }
    icon={<SvgPlaceholder />}
  />
 */
export const TreeNode = React.forwardRef((props, forwardedRef) => {
  const {
    nodeId,
    nodeProps = {},
    label,
    labelProps = {},
    sublabel,
    sublabelProps = {},
    children,
    className,
    icon,
    iconProps = {},
    hasSubNodes = false,
    isDisabled = false,
    isExpanded = false,
    isSelected = false,
    onSelected,
    onExpanded,
    checkbox,
    checkboxProps = {},
    subTreeProps = {},
    contentProps = {},
    titleProps = {},
    expanderProps = {},
    expander,
    ...rest
  } = props;

  const {
    nodeDepth,
    subNodeIds = [],
    parentNodeId,
    scrollToParent,
    groupSize,
    indexInGroup,
  } = useTreeContext();

  const [isFocused, setIsFocused] = React.useState(false);
  const nodeRef = React.useRef<HTMLDivElement>(null);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey) {
      return;
    }
    const isNodeFocused =
      nodeRef.current === nodeRef.current?.ownerDocument.activeElement;
    switch (event.key) {
      case 'ArrowLeft': {
        event.preventDefault();
        if (isNodeFocused) {
          if (isExpanded) {
            onExpanded(nodeId, false);
            break;
          }
          if (parentNodeId) {
            scrollToParent?.();
            break;
          }
          // If it is top level node (doesn't have parent node), then do nothing.
          break;
        }

        const focusableElements = getFocusableElements(nodeRef.current);
        const currentIndex = focusableElements.indexOf(
          nodeRef.current?.ownerDocument.activeElement as HTMLElement,
        );
        if (currentIndex === 0) {
          nodeRef.current?.focus();
        } else {
          (focusableElements[currentIndex - 1] as HTMLElement)?.focus();
        }
        break;
      }
      case 'ArrowRight': {
        event.preventDefault();
        const focusableElements = getFocusableElements(nodeRef.current);
        if (isNodeFocused) {
          if (!isExpanded && hasSubNodes) {
            onExpanded(nodeId, true);
            break;
          }
          (focusableElements[0] as HTMLElement)?.focus();
          break;
        }

        const currentIndex = focusableElements.indexOf(
          nodeRef.current?.ownerDocument.activeElement as HTMLElement,
        );
        if (currentIndex < focusableElements.length - 1) {
          (focusableElements[currentIndex + 1] as HTMLElement).focus();
          break;
        }
        break;
      }
      case ' ':
      case 'Spacebar':
      case 'Enter': {
        // Ignore if it is called on the element inside, e.g. checkbox or expander
        if (event.target !== nodeRef.current) {
          break;
        }
        event.preventDefault();
        if (!isDisabled) {
          onSelected?.(nodeId, !isSelected);
        }
        break;
      }
      default:
        break;
    }
  };

  const onExpanderClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onExpanded(nodeId, !isExpanded);
      event.stopPropagation();
    },
    [isExpanded, nodeId, onExpanded],
  );

  return (
    <Box
      as='div'
      role='treeitem'
      className={cx('iui-tree-item', className)}
      aria-expanded={hasSubNodes ? isExpanded : undefined}
      aria-disabled={isDisabled}
      aria-selected={isSelected}
      aria-level={nodeDepth + 1}
      aria-setsize={groupSize}
      aria-posinset={indexInGroup + 1}
      tabIndex={-1}
      {...rest}
      id={nodeId}
      ref={useMergedRefs(nodeRef, forwardedRef)}
      onFocus={mergeEventHandlers(props.onFocus, (e) => {
        setIsFocused(true);
        // Prevents from triggering onFocus on parent Tree
        e.stopPropagation();
      })}
      onBlur={mergeEventHandlers(props.onBlur, () => {
        setIsFocused(false);
      })}
      onKeyDown={mergeEventHandlers(props.onKeyDown, onKeyDown)}
    >
      <Box
        as='div'
        style={{ '--level': nodeDepth } as React.CSSProperties}
        onClick={() => !isDisabled && onSelected?.(nodeId, !isSelected)}
        {...nodeProps}
        className={cx(
          'iui-tree-node',
          {
            'iui-active': isSelected,
            'iui-disabled': isDisabled,
          },
          nodeProps?.className,
        )}
      >
        {checkbox && (
          <Box
            as='div'
            {...checkboxProps}
            className={cx('iui-tree-node-checkbox', checkboxProps?.className)}
          >
            {React.isValidElement(checkbox)
              ? React.cloneElement(checkbox as JSX.Element, {
                  tabIndex: isFocused ? 0 : -1,
                })
              : checkbox}
          </Box>
        )}
        <Box
          as='div'
          {...contentProps}
          className={cx('iui-tree-node-content', contentProps?.className)}
        >
          {hasSubNodes && expander}
          {hasSubNodes && !expander && (
            <TreeNodeExpander
              isExpanded={isExpanded}
              disabled={isDisabled}
              onClick={onExpanderClick}
              tabIndex={isFocused ? 0 : -1}
              {...expanderProps}
            />
          )}
          {icon && (
            <Box
              as='span'
              aria-hidden
              {...iconProps}
              className={cx('iui-tree-node-content-icon', iconProps?.className)}
            >
              {icon}
            </Box>
          )}
          <Box
            as='div'
            {...labelProps}
            className={cx('iui-tree-node-content-label', labelProps?.className)}
          >
            <Box
              as='div'
              {...titleProps}
              className={cx(
                'iui-tree-node-content-title',
                titleProps?.className,
              )}
            >
              {label}
            </Box>
            {sublabel && (
              <Box
                as='div'
                {...sublabelProps}
                className={cx(
                  'iui-tree-node-content-caption',
                  sublabelProps?.className,
                )}
              >
                {sublabel}
              </Box>
            )}
          </Box>
          {children}
        </Box>
      </Box>

      {hasSubNodes && (
        <Box
          as='div'
          role='group'
          aria-owns={subNodeIds.join(' ')}
          {...subTreeProps}
          className={cx('iui-sub-tree', subTreeProps?.className)}
        />
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TreeNodeProps>;
if (process.env.NODE_ENV === 'development') {
  TreeNode.displayName = 'TreeNode';
}
