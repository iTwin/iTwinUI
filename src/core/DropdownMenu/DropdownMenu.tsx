// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { Popover, Position } from '../../utils';
import { PopoverProps } from '../../utils/Popover/Popover';
import { Menu } from '../Menu';
import { CommonProps } from '../utils/props';

export type DropdownMenuProps = {
  /**
   * List of menu items. Recommended to use MenuItem component.
   * You can pass function that takes argument `close` that closes the dropdown menu.
   */
  menuItems: (close: () => void) => JSX.Element[];
  /**
   * ARIA role. Role of menu. For menu use 'menu', for select use 'listbox'.
   * @default 'menu'
   */
  role?: string;
  /**
   * How many pixels should the positioned element be from the parent / target element.
   * @default 0
   */
  targetOffset?: number;
  /**
   * Position where dropdown will be shown.
   * @default Position.BOTTOM_LEFT
   */
  position?: Position;
} & Omit<
  PopoverProps,
  | 'content'
  | 'bringFocusInside'
  | 'hoverTargetOnly'
  | 'bodyOffset'
  | 'targetOffset'
  | 'position'
> &
  CommonProps;

/**
 * Dropdown menu component.
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
export const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const {
    menuItems,
    children,
    className,
    style,
    position = Position.BOTTOM_LEFT,
    role = 'menu',
    targetOffset = 0,
    ...restPopoverProps
  } = props;

  return (
    <Popover
      targetOffset={targetOffset}
      position={position}
      content={(close) => (
        <Menu className={className} style={style} role={role}>
          {menuItems(close)}
        </Menu>
      )}
      {...restPopoverProps}
    >
      {children}
    </Popover>
  );
};

export default DropdownMenu;
