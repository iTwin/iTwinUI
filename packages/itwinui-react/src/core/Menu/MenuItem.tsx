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
  useListNavigation,
} from '@floating-ui/react';

/**
 * Context used to provide menu item ref to sub-menu items.
 */
const MenuItemContext = React.createContext<{
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  listItemsRef: React.MutableRefObject<(HTMLElement | null)[]>;
}>({
  setActiveIndex: () => {},
  listItemsRef: { current: [] },
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

  const parent = React.useContext(MenuItemContext);

  const menuItemRef = React.useRef<HTMLElement>(null);
  const submenuId = useId();

  const [isSubmenuVisible, setIsSubmenuVisible] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const [hasMouseEntered, setHasMouseEntered] = React.useState(false);
  if (!isSubmenuVisible && hasMouseEntered) {
    setHasMouseEntered(false);
  }

  const nodeId = useFloatingNodeId();
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();

  // TODO: Try to find a better way to get the index.
  const parentTreeIndex = React.useMemo(
    () => {
      const allSiblingNodes = tree?.nodesRef.current.filter(
        (n) => n.parentId === parentId,
      );
      return allSiblingNodes?.findIndex((n) => n.id === nodeId) ?? 0;
    },
    // TODO: Try to remove the eslint-disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodeId, parentId, tree?.nodesRef, tree?.nodesRef.current],
  );

  React.useEffect(() => {
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

    tree?.events.on('nodeFocused', handleNodeFocused);

    return () => {
      tree?.events.off('nodeFocused', handleNodeFocused);
    };
  }, [nodeId, parentId, tree?.events, tree?.nodesRef, children]);

  const listItemsRef = React.useRef<Array<HTMLElement | null>>([]);

  const popover = usePopover({
    nodeId,
    visible: isSubmenuVisible,
    onVisibleChange: setIsSubmenuVisible,
    placement: 'right-start',
    trigger: {
      hover: subMenuItems.length > 0 && !hasMouseEntered,
    },
    triggers: (context) => [
      // TODO: Do a proper fix
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useListNavigation(context, {
        listRef: listItemsRef,
        activeIndex,
        nested: subMenuItems.length > 0,
        onNavigate: setActiveIndex,
      }),
    ],
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
      default:
        break;
    }
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setHasMouseEntered(true);

    if (e.target === e.currentTarget) {
      menuItemRef.current?.focus();
    }
  };

  const onFocus = (e: React.FocusEvent<HTMLElement>) => {
    parent.setActiveIndex(parentTreeIndex);

    if (e.target === e.currentTarget) {
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
          (el) =>
            (parent.listItemsRef.current[parentTreeIndex] = el as HTMLElement),
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
            <MenuItemContext.Provider
              value={{
                setActiveIndex,
                listItemsRef,
              }}
            >
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
                  onMouseEnter: () => {
                    setHasMouseEntered(true);
                  },
                })}
              >
                {subMenuItems}
              </Menu>
            </MenuItemContext.Provider>
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
