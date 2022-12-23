/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { CommonProps, getFocusableElements, useTheme } from '../utils';
import '@itwin/itwinui-css/css/tree.css';
import cx from 'classnames';
import { TreeNodeExpander } from './TreeNodeExpander';
import { useTreeContext } from './TreeContext';

export type TreeNodeProps = {
  /**
   * Unique id of the node.
   * It has to be compatible with HTML id attribute.
   */
  nodeId: string;
  /**
   * The main text displayed on the node.
   */
  label: React.ReactNode;
  /**
   * Small note displayed below main label.
   */
  sublabel?: React.ReactNode;
  /**
   * Icon shown before label and sublabel content.
   */
  icon?: JSX.Element;
  /**
   * Flag whether the node has child sub-nodes. It is used to show expander icon.
   * @default false
   */
  hasSubNodes?: boolean;
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
   * Custom expander element. If `hasSubNodes` is false, it won't be shown.
   */
  expander?: React.ReactNode;
  /**
   * Content shown after `TreeNode`.
   */
  children?: React.ReactNode;
} & Omit<CommonProps, 'id'>;

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
export const TreeNode = (props: TreeNodeProps) => {
  const {
    nodeId,
    label,
    sublabel,
    children,
    className,
    icon,
    hasSubNodes = false,
    isDisabled = false,
    isExpanded = false,
    isSelected = false,
    onSelected,
    onExpanded,
    checkbox,
    expander,
    ...rest
  } = props;
  useTheme();

  const {
    nodeDepth,
    subNodeIds = [],
    parentNodeId,
    scrollToParent,
    groupSize,
    indexInGroup,
  } = useTreeContext();

  const [isFocused, setIsFocused] = React.useState(false);
  const nodeRef = React.useRef<HTMLLIElement>(null);

  const onKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
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
    <li
      role='treeitem'
      className={cx('iui-tree-item', className)}
      id={nodeId}
      aria-expanded={hasSubNodes ? isExpanded : undefined}
      aria-disabled={isDisabled}
      aria-selected={isSelected}
      aria-level={nodeDepth + 1}
      aria-setsize={groupSize}
      aria-posinset={indexInGroup + 1}
      tabIndex={-1}
      onFocus={(e) => {
        setIsFocused(true);
        // Prevents from triggering onFocus on parent Tree
        e.stopPropagation();
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      ref={nodeRef}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {
        <div
          className={cx('iui-tree-node', {
            'iui-active': isSelected,
            'iui-disabled': isDisabled,
          })}
          style={{ '--level': nodeDepth } as React.CSSProperties}
          onClick={() => !isDisabled && onSelected?.(nodeId, !isSelected)}
        >
          {checkbox && React.isValidElement(checkbox)
            ? React.cloneElement(checkbox, {
                className: cx(
                  'iui-tree-node-checkbox',
                  checkbox.props.className,
                ),
                tabIndex: isFocused ? 0 : -1,
              })
            : checkbox}
          <div className='iui-tree-node-content'>
            {hasSubNodes && expander}
            {hasSubNodes && !expander && (
              <TreeNodeExpander
                isExpanded={isExpanded}
                disabled={isDisabled}
                onClick={onExpanderClick}
                tabIndex={isFocused ? 0 : -1}
              />
            )}
            {icon &&
              React.cloneElement(icon, {
                className: cx(
                  'iui-tree-node-content-icon',
                  icon.props.className,
                ),
              })}
            <span className='iui-tree-node-content-label'>
              <div className='iui-tree-node-content-title'>{label}</div>
              {sublabel && (
                <div className='iui-tree-node-content-caption'>{sublabel}</div>
              )}
            </span>
            {children}
          </div>
        </div>
      }
      {hasSubNodes && (
        <ul
          className='iui-sub-tree'
          role='group'
          aria-owns={subNodeIds.join(',')}
        />
      )}
    </li>
  );
};

export default TreeNode;
