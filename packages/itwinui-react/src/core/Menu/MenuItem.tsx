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
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { Menu } from './Menu.js';
import { ListItem } from '../List/ListItem.js';
import type { ListItemOwnProps } from '../List/ListItem.js';
import { flushSync } from 'react-dom';
import { usePopover } from '../Popover/Popover.js';
import {
  FloatingFocusManager,
  FloatingNode,
  FloatingTree,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
} from '@floating-ui/react';

/**
 * Context used to provide menu item ref to sub-menu items.
 */
const MenuItemContext = React.createContext<{
  ref: React.RefObject<HTMLElement> | undefined;
  isNestedSubmenuVisible: boolean | undefined;
  setIsNestedSubmenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  value: string | undefined;
}>({
  ref: undefined,
  isNestedSubmenuVisible: undefined,
  setIsNestedSubmenuVisible: () => {},
  value: undefined,
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
  const [isNestedSubmenuVisible, setIsNestedSubmenuVisible] =
    React.useState(false);
  const parent = React.useContext(MenuItemContext);

  const onVisibleChange = (open: boolean) => {
    if (!open) {
      console.log(
        `${children}, onVisibleChange`,
        open,
        isNestedSubmenuVisible,
        // parent.value,
        // parent.isNestedSubmenuVisible,
      );
    }

    setIsSubmenuVisible(open || isNestedSubmenuVisible);

    if (children === 'Item 2_3' && !open) {
      return;
    }

    // we don't want parent to close when mouse goes into a nested submenu,
    // so we need to let the parent know whether the submenu is still open.
    parent.setIsNestedSubmenuVisible(open);

    // await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // if (["Item #10", "Item #11"].includes(children as string)) {
  //   console.log(children, open, isNestedSubmenuVisible);

  //   let currentNode = parent;
  //   while (currentNode != null) {
  //     console.log(currentNode.value, currentNode.isNestedSubmenuVisible);
  //     currentNode = currentNode.parent;
  //   }
  // }

  const popover = usePopover({
    // nodeId,
    // visible: isSubmenuVisible,
    visible: isSubmenuVisible || isNestedSubmenuVisible,
    // || children === 'Item #3',
    onVisibleChange,
    placement: 'right-start',
    trigger: { hover: true, focus: true },
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
          // setFocusOnSubmenu(true);

          // flush and reset state so we are ready to focus again next time
          flushSync(() => setFocusOnSubmenu(true));
          setFocusOnSubmenu(false);

          event.preventDefault();
          event.stopPropagation();
        }
        break;
      }
      case 'ArrowLeft': {
        if (parent.ref) {
          parent.ref.current?.focus();
          parent.setIsNestedSubmenuVisible(false);
        }
        event.stopPropagation();
        event.preventDefault();
        break;
      }
      case 'Escape': {
        // focus might get lost if submenu closes so move it back to parent
        parent.ref?.current?.focus();
        break;
      }
      default:
        break;
    }
  };

  const handlers = {
    onClick: () => !disabled && onClick?.(value),
    onKeyDown,
    // onClick: (event: React.MouseEvent<HTMLDivElement>) => {
    //   // props.onClick?.(event);
    //   !disabled && onClick?.(value);
    //   tree?.events.emit('click');
    // },
    // onFocus: (event: React.FocusEvent<HTMLDivElement>) => {
    //   // console.log('OnFocus', children, event);

    //   props.onFocus?.(event);
    //   setIsSubmenuVisible(false);
    //   parent.setIsNestedSubmenuVisible(true);
    //   // menu.setHasFocusInside(true);
    // },
  };

  // const item = useListItem({ label: disabled ? null : label });
  // const tree = useFloatingTree();

  // // Event emitter allows you to communicate across tree components.
  // // This effect closes all menus when an item gets clicked anywhere
  // // in the tree.
  // React.useEffect(() => {
  //   if (!tree) return;

  //   function handleTreeClick() {
  //     setIsSubmenuVisible(false);
  //   }

  //   function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
  //     if (event.nodeId !== nodeId && event.parentId === parentId) {
  //       setIsSubmenuVisible(false);
  //     }
  //   }

  //   tree.events.on('click', handleTreeClick);
  //   tree.events.on('menuopen', onSubMenuOpen);

  //   return () => {
  //     tree.events.off('click', handleTreeClick);
  //     tree.events.off('menuopen', onSubMenuOpen);
  //   };
  // }, [tree, nodeId, parentId]);

  // React.useEffect(() => {
  //   if (isSubmenuVisible && tree) {
  //     tree.events.emit('menuopen', { parentId, nodeId });
  //   }
  // }, [tree, isSubmenuVisible, nodeId, parentId]);

  // console.log('nodeid', nodeId);

  return (
    // <FloatingNode id={nodeId}>
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
      // onFocus={(e) => {
      //   console.log('onFocus', children, e);
      //   e.bubbles = false;
      //   // e.preventDefault();
      // }}
      // onMouseDown={(e) => {
      //   // prevent focus on mousedown
      //   e.preventDefault();
      // }}
      // onFocusCapture={(e) => {
      //   // prevent focus on mousedown
      //   e.preventDefault();
      // }}
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

      {subMenuItems.length > 0 && popover.open && (
        <Portal>
          {/* <FloatingFocusManager
              context={popover.context}
              modal={false}
              // initialFocus={popover.refs.floating}
              // initialFocus={isNested ? -1 : 0}
              // returnFocus={!isNested}
            > */}
          <MenuItemContext.Provider
            value={{
              ref: menuItemRef,
              isNestedSubmenuVisible,
              setIsNestedSubmenuVisible,
              value: `${children}`,
            }}
          >
            <FloatingTree>
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
            </FloatingTree>
          </MenuItemContext.Provider>
          {/* </FloatingFocusManager> */}
        </Portal>
      )}
    </ListItem>
    // </FloatingNode>
  );
}) as PolymorphicForwardRefComponent<'div', MenuItemProps>;
