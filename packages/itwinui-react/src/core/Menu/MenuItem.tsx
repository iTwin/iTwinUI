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
  useSyncExternalStore,
  createWarningLogger,
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

const logWarningInDev = createWarningLogger();

/**
 * Should be wrapped around the `Menu` containing the `MenuItem`s.
 */
export const MenuItemContext = React.createContext<{
  setCurrentFocusedNodeIndex: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  focusableNodes: React.MutableRefObject<(HTMLElement | null)[]>;
  setHasFocusedNodeInSubmenu?: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  setCurrentFocusedNodeIndex: () => {},
  focusableNodes: { current: [] },
  setHasFocusedNodeInSubmenu: undefined,
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
    onClick: onClickProp,
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

  if (onClickProp != null && subMenuItems.length > 0) {
    logWarningInDev(
      'Passing a non-empty submenuItems array and onClick to MenuItem at the same time is not supported. This is because when a non empty submenuItems array is passed, clicking the MenuItem toggles the submenu visibility.',
    );
  }

  const parent = React.useContext(MenuItemContext);

  const menuItemRef = React.useRef<HTMLElement>(null);
  const submenuId = useId();

  const [isSubmenuVisible, setIsSubmenuVisible] = React.useState(false);
  const [currentFocusedNodeIndex, setCurrentFocusedNodeIndex] = React.useState<
    number | null
  >(null);

  const [hasFocusedNodeInSubmenu, setHasFocusedNodeInSubmenu] =
    React.useState(false);

  const nodeId = useFloatingNodeId();
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();

  const focusableNodeIndexInParentTree =
    parent.focusableNodes.current.findIndex((el) => el === menuItemRef.current);

  useSyncExternalStore(
    React.useCallback(() => {
      const closeUnrelatedMenus = (event: TreeEvent) => {
        if (
          // When a node "X" is focused, close "X"'s siblings' submenus
          // i.e. only one submenu in each menu can be open at a time
          (parentId === event.parentId && nodeId !== event.nodeId) ||
          // Consider a node "X" with its submenu "Y".
          // Focusing "X" should close all submenus of "Y".
          parentId === event.nodeId
        ) {
          setIsSubmenuVisible(false);
          setHasFocusedNodeInSubmenu(false);
        }
      };

      tree?.events.on('onNodeFocused', closeUnrelatedMenus);

      return () => {
        tree?.events.off('onNodeFocused', closeUnrelatedMenus);
      };
    }, [nodeId, parentId, tree?.events]),
    () => undefined,
    () => undefined,
  );

  const focusableNodes = React.useRef<Array<HTMLElement | null>>([]);

  const popover = usePopover({
    nodeId,
    visible: isSubmenuVisible,
    onVisibleChange: (v) => {
      if (!v) {
        setHasFocusedNodeInSubmenu(false);
      }

      setIsSubmenuVisible(v);
    },
    placement: 'right-start',
    interactions: !disabled
      ? {
          click: false,
          hover: {
            enabled: !hasFocusedNodeInSubmenu, // If focus is still inside submenu, don't close the submenu upon hovering out.
          },
          listNavigation: {
            listRef: focusableNodes,
            activeIndex: currentFocusedNodeIndex,
            nested: subMenuItems.length > 0,
            onNavigate: setCurrentFocusedNodeIndex,
          },
        }
      : {},
  });

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.altKey) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Spacebar': {
        onClick();
        event.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    // Focus the item when hovered.
    if (e.target === e.currentTarget) {
      menuItemRef.current?.focus();

      // Since we manually focus the MenuItem on hover, we need to manually update the active index for
      // Floating UI's keyboard navigation to work correctly.
      if (parent != null && focusableNodeIndexInParentTree != null) {
        parent.setCurrentFocusedNodeIndex(focusableNodeIndexInParentTree);
      }
    }
  };

  const onFocus = () => {
    parent.setHasFocusedNodeInSubmenu?.(true);

    tree?.events.emit('onNodeFocused', {
      nodeId,
      parentId,
    } satisfies TreeEvent);
  };

  const onClick = () => {
    onClickProp?.(value);
    setIsSubmenuVisible((prev) => !prev);
  };

  const handlers = !disabled
    ? {
        onClick,
        onKeyDown,
        onMouseEnter,
        onFocus,
      }
    : {};

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

      {subMenuItems.length > 0 && !disabled && popover.open && (
        <FloatingNode id={nodeId}>
          <Portal>
            <MenuItemContext.Provider
              value={{
                setCurrentFocusedNodeIndex,
                focusableNodes,
                setHasFocusedNodeInSubmenu,
              }}
            >
              <Menu
                setFocus={false}
                ref={popover.refs.setFloating}
                {...popover.getFloatingProps({ id: submenuId })}
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
