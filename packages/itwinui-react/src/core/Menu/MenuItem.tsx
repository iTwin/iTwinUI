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
  FloatingTree,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
} from '@floating-ui/react';
import { DropdownMenuContext } from '../DropdownMenu/DropdownMenu.js';
import { flushSync } from 'react-dom';
// import { flushSync } from 'react-dom';

/**
 * Context used to provide menu item ref to sub-menu items.
 */
const MenuItemContext = React.createContext<{
  ref: React.RefObject<HTMLElement> | undefined;
  setIsSubmenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNestedSubmenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  ref: undefined,
  setIsSubmenuVisible: () => {},
  setIsNestedSubmenuVisible: () => {},
});

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
  const [focusOnSubmenu, setFocusOnSubmenu] = React.useState(false);
  const submenuId = useId();

  const [isSubmenuVisible, setIsSubmenuVisible] = React.useState(false);
  // const [isNestedSubmenuVisible, setIsNestedSubmenuVisible] =
  //   React.useState(false);
  // const parent = React.useContext(MenuItemContext);

  const dropdownMenuContext = React.useContext(DropdownMenuContext);

  const nodeId = useFloatingNodeId();
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();

  // console.log(tree?.nodesRef.current);

  // const onVisibleChange = (open: boolean) => {
  //   if (open) {
  //     // Once the menu is opened, reset focusOnSubmenu (since it is set to true when the right arrow is pressed)
  //     setFocusOnSubmenu(false);

  //     tree?.events.emit('submenuOpened', {
  //       nodeId,
  //       parentId,
  //     } satisfies TreeEvent);
  //   }

  //   setIsSubmenuVisible(open || isNestedSubmenuVisible);

  //   // we don't want parent to close when mouse goes into a nested submenu,
  //   // so we need to let the parent know whether the submenu is still open.
  //   parent.setIsNestedSubmenuVisible(open);
  // };

  const onVisibleChange = (open: boolean) => {
    setIsSubmenuVisible(open);

    if (open) {
      // Once the menu is opened, reset focusOnSubmenu (since it is set to true when the right arrow is pressed)
      setFocusOnSubmenu(false);

      tree?.events.emit('submenuOpened', {
        nodeId,
        parentId,
      } satisfies TreeEvent);
    }
  };

  React.useEffect(() => {
    const handleSubmenuOpened = (event: TreeEvent) => {
      // Only one submenu in each menu can be open at a time
      // So, if a sibling's submenu is opened, close this submenu
      if (event.parentId === parentId && event.nodeId !== nodeId) {
        // TODO: Temporary. Might need to uncomment this line or replace with a proper solution
        // dropdownMenuContext.setLastHoveredNode({ nodeId, parentId });
        setIsSubmenuVisible(false);
        // setIsNestedSubmenuVisible(false);
      }
    };

    const handleArrowLeftPressed = (event: TreeEvent) => {
      if (event.parentId === nodeId) {
        // TODO: Temporary. Might need to uncomment this line or replace with a proper solution
        // dropdownMenuContext.setLastHoveredNode({ nodeId, parentId });
        setIsSubmenuVisible(false);
        // setIsNestedSubmenuVisible(false);
        menuItemRef.current?.focus();
      }
    };

    tree?.events.on('submenuOpened', handleSubmenuOpened);
    tree?.events.on('arrowLeftPressed', handleArrowLeftPressed);

    return () => {
      tree?.events.off('submenuOpened', handleSubmenuOpened);
      tree?.events.off('arrowLeftPressed', handleArrowLeftPressed);
    };
  }, [nodeId, parentId, tree?.events, tree?.nodesRef, dropdownMenuContext]);

  const popover = usePopover({
    nodeId,
    visible:
      isSubmenuVisible ||
      // isNestedSubmenuVisible ||
      // to keep the submenus open up till the last hovered submenu, even after hovering out of the entire tree.
      (dropdownMenuContext.lastHoveredNode != null
        ? isAncestor({
            tree,
            referenceNode: nodeId,
            node: dropdownMenuContext.lastHoveredNode.nodeId,
          })
        : false),
    onVisibleChange,
    // onVisibleChange: setIsSubmenuVisible,
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
          // flushSync(() => setFocusOnSubmenu(true));
          // setIsSubmenuVisible(true);

          setIsSubmenuVisible(true);

          // flush and reset state so we are ready to focus again next time
          flushSync(() => setFocusOnSubmenu(true));
          setFocusOnSubmenu(false);

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

  // console.log('lastHoceredNode', dropdownMenuContext.lastHoveredNode);

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      // console.log('Focusing', children);

      dropdownMenuContext.setLastHoveredNode({ nodeId, parentId });
      menuItemRef.current?.focus();

      // if (isSubmenuVisible) {
      //   flushSync(() => setIsSubmenuVisible(false));
      // }

      e.stopPropagation();
    }
  };

  const handlers = {
    onClick: () => !disabled && onClick?.(value),
    onKeyDown,
    onMouseEnter,
  };

  return (
    <ConditionalFloatingTreeWrapper>
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
          {/* <div>{children}</div> */}
          <div>
            {children}, {nodeId}
          </div>
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

        {subMenuItems.length > 0 && popover.open && (
          <FloatingNode id={nodeId}>
            <Portal>
              <MenuItemContext.Provider
                value={{
                  ref: menuItemRef,
                  setIsSubmenuVisible,
                  setIsNestedSubmenuVisible: () => {},
                }}
              >
                <Menu
                  setFocus={focusOnSubmenu}
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
              </MenuItemContext.Provider>
            </Portal>
          </FloatingNode>
        )}
      </ListItem>
    </ConditionalFloatingTreeWrapper>
  );
}) as PolymorphicForwardRefComponent<'div', MenuItemProps>;

// ----------------------------------------------------------------------------

export type TreeEvent = {
  nodeId: string;
  parentId: string | null;
};

/**
 * Wraps `children` with `<FloatingTree>` if a `FloatingTree` context is not found.
 *
 * This is useful when `MenuItem`s are used outside of a `DropdownMenu`.
 */
const ConditionalFloatingTreeWrapper = (props: {
  children: React.ReactNode;
}) => {
  const { children } = props;
  const tree = useFloatingTree();

  return !tree ? <FloatingTree>{children}</FloatingTree> : children;
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

  // console.log(tree?.nodesRef.current, ancestorTree);

  return ancestorTree[referenceNode]?.includes(node);
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
