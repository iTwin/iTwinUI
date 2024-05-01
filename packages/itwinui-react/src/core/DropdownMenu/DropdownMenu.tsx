/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  // useMergedRefs,
  Portal,
  cloneElementWithRef,
  useControlledState,
  mergeRefs,
  mergeEventHandlers,
} from '../../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../../utils/index.js';
import { Menu } from '../Menu/Menu.js';
import { usePopover } from '../Popover/Popover.js';
import {
  FloatingNode,
  FloatingTree,
  useFloatingNodeId,
} from '@floating-ui/react';
// import { MenuItemContext } from '../Menu/MenuItem.js';

export type DropdownMenuProps = {
  /**
   * List of menu items. Recommended to use MenuItem component.
   * You can pass function that takes argument `close` that closes the dropdown menu, or a list of MenuItems.
   */
  menuItems:
    | ((close: () => void) => JSX.Element[])
    | JSX.Element[]
    | JSX.Element;
  /**
   * ARIA role. Role of menu. For menu use 'menu', for select use 'listbox'.
   * @default 'menu'
   */
  role?: string;
  /**
   * Child element to wrap dropdown with.
   */
  children: React.ReactNode;
} & Pick<
  Parameters<typeof usePopover>[0],
  'visible' | 'onVisibleChange' | 'placement' | 'matchWidth'
> &
  React.ComponentPropsWithoutRef<'ul'> &
  Pick<PortalProps, 'portal'>;

/**
 * Dropdown menu component.
 * Built on top of the {@link Popover} component.
 * @example
 * const menuItems = (close: () => void) => [
 *   <MenuItem key={1} onClick={onClick(1, close)}>
 *     Item #1
 *   </MenuItem>,
 *   <MenuItem key={2} onClick={onClick(2, close)}>
 *     Item #2
 *   </MenuItem>,
 *   <MenuItem key={3} onClick={onClick(3, close)}>
 *     Item #3
 *   </MenuItem>,
 * ];
 * <DropdownMenu menuItems={menuItems}>
 *   <Button>Menu</Button>
 * </DropdownMenu>
 */
export const DropdownMenu = React.forwardRef((props, forwardedRef) => {
  return (
    <FloatingTree>
      <DropdownMenuContent ref={forwardedRef} {...props} />
    </FloatingTree>
  );
}) as PolymorphicForwardRefComponent<'div', DropdownMenuProps>;

// ----------------------------------------------------------------------------

const DropdownMenuContent = React.forwardRef((props, forwardedRef) => {
  const {
    menuItems,
    children,
    role = 'menu',
    visible: visibleProp,
    placement = 'bottom-start',
    matchWidth = false,
    onVisibleChange,
    portal = true,
    ...rest
  } = props;

  const [visible, setVisible] = useControlledState(
    false,
    visibleProp,
    onVisibleChange,
  );

  const triggerRef = React.useRef<HTMLElement>(null);

  const close = React.useCallback(() => {
    setVisible(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, [setVisible]);

  const menuContent = React.useMemo(() => {
    if (typeof menuItems === 'function') {
      return menuItems(close);
    }
    return menuItems;
  }, [menuItems, close]);

  // const [currentFocusedNodeIndex, setCurrentFocusedNodeIndex] = React.useState<
  //   number | null
  // >(null);
  // const focusableNodes = React.useRef<Array<HTMLElement | null>>([]);

  const nodeId = useFloatingNodeId();

  // const popover = usePopover({
  //   nodeId,
  //   visible,
  //   onVisibleChange: (open) => (open ? setVisible(true) : close()),
  //   placement,
  //   matchWidth,
  //   interactions: {
  //     listNavigation: {
  //       focusItemOnOpen: true,
  //     },
  //   },
  // });

  const menuProps = Menu.getMenuProps({
    popoverProps: {
      nodeId,
      visible,
      onVisibleChange: (open) => (open ? setVisible(true) : close()),
      placement,
      matchWidth,
      interactions: {
        listNavigation: {
          focusItemOnOpen: true,
        },
      },
    },
  });

  console.log('DROPDOWNMENU', menuProps.focusableNodes.current.length);

  // const popoverRef = useMergedRefs(forwardedRef, menuProps.popover.refs.setFloating);

  return (
    <>
      {cloneElementWithRef(children, (children) => ({
        ...menuProps.popover.getReferenceProps(children.props),
        'aria-expanded': menuProps.popover.open,
        ref: mergeRefs(triggerRef, menuProps.popover.refs.setReference),
      }))}
      <FloatingNode id={nodeId}>
        {menuProps.popover.open && (
          <Portal portal={portal}>
            {/* <MenuItemContext.Provider
              value={{
                setCurrentFocusedNodeIndex,
                focusableNodes,
              }}
            > */}
            <Menu
              menuProps={menuProps}
              setFocus={false}
              // {...popover.getFloatingProps({
              //   role,
              //   ...rest,
              //   onKeyDown: mergeEventHandlers(props.onKeyDown, (e) => {
              //     if (e.defaultPrevented) {
              //       return;
              //     }
              //     if (e.key === 'Tab') {
              //       close();
              //     }
              //   }),
              // })}
              // ref={popoverRef}
              // TODO: Properly fix type errors for onKeyDown
              // onKeyDown={props.onKeyDown}
              onKeyDown={mergeEventHandlers(
                props.onKeyDown as
                  | React.KeyboardEventHandler<HTMLDivElement>
                  | undefined,
                (e) => {
                  if (e.defaultPrevented) {
                    return;
                  }
                  if (e.key === 'Tab') {
                    close();
                  }
                },
              )}
              role={role}
              ref={forwardedRef}
              // TODO: Properly fix type errors
              {...(rest as React.ComponentPropsWithoutRef<'div'>)}
            >
              {menuContent}
            </Menu>
            {/* </MenuItemContext.Provider> */}
          </Portal>
        )}
      </FloatingNode>
    </>
  );
}) as PolymorphicForwardRefComponent<'div', DropdownMenuProps>;
