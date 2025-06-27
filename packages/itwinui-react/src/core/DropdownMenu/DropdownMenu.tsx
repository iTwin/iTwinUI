/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { mergeEventHandlers, useControlledState } from '../../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../../utils/index.js';
import { Menu } from '../Menu/Menu.js';
import { usePopover } from '../Popover/Popover.js';
import { FloatingTree } from '@floating-ui/react';

export type DropdownMenuProps = {
  /**
   * List of menu items. Recommended to use MenuItem component.
   * You can pass function that takes argument `close` that closes the dropdown menu, or a list of MenuItems.
   */
  menuItems:
    | ((close: () => void) => React.JSX.Element[])
    | React.JSX.Element[]
    | React.JSX.Element;
  /**
   * ARIA role. Role of menu. For menu use 'menu', for select use 'listbox'.
   * @default 'menu'
   */
  role?: string;
  /**
   * Child element to wrap dropdown with.
   */
  children: React.JSX.Element;
  /**
   * Middleware options.
   *
   * By default, `hide` is enabled. If the menu gets hidden even when it shouldn't (e.g. some custom styles interfering
   * with the trigger's hide detection) consider disabling the `hide` middleware.
   *
   * @see https://floating-ui.com/docs/middleware
   */
  middleware?: {
    hide?: boolean;
  };
  /**
   * If `true`, closes the `DropdownMenu` when any descendant `MenuItem` is clicked.
   * @default false
   */
  closeOnItemClick?: boolean;
} & Pick<
  Parameters<typeof usePopover>[0],
  'visible' | 'onVisibleChange' | 'placement' | 'matchWidth'
> &
  Pick<React.ComponentProps<typeof Menu>, 'positionReference'> &
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
if (process.env.NODE_ENV === 'development') {
  DropdownMenu.displayName = 'DropdownMenu';
}

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
    middleware,
    closeOnItemClick = false,
    ...rest
  } = props;

  const [visible, setVisible] = useControlledState(
    false,
    visibleProp,
    onVisibleChange,
  );

  const close = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const menuContent = React.useMemo(() => {
    if (typeof menuItems === 'function') {
      return menuItems(close);
    }
    return menuItems;
  }, [close, menuItems]);

  const dropdownMenuContextValue = React.useMemo(() => ({ close }), [close]);

  return (
    <DropdownMenuCloseOnClickContext.Provider value={closeOnItemClick}>
      <DropdownMenuContext.Provider value={dropdownMenuContextValue}>
        <Menu
          trigger={children}
          onKeyDown={mergeEventHandlers(props.onKeyDown, (e) => {
            if (e.defaultPrevented) {
              return;
            }
            if (e.key === 'Tab') {
              setVisible(false);
            }
          })}
          role={role}
          ref={forwardedRef}
          portal={portal}
          popoverProps={React.useMemo(
            () => ({
              placement,
              matchWidth,
              visible,
              onVisibleChange: setVisible,
              middleware,
            }),
            [matchWidth, middleware, placement, setVisible, visible],
          )}
          {...rest}
        >
          {menuContent}
        </Menu>
      </DropdownMenuContext.Provider>
    </DropdownMenuCloseOnClickContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', DropdownMenuProps>;

// ----------------------------------------------------------------------------

export const DropdownMenuContext = React.createContext<
  | {
      close: () => void;
    }
  | undefined
>(undefined);

/**
 * @private
 * Wraps around a `DropdownMenu`.
 *
 * If `true`, closes the `DropdownMenu` when any descendant `MenuItem` is clicked.
 */
export const DropdownMenuCloseOnClickContext = React.createContext<
  boolean | undefined
>(undefined);
