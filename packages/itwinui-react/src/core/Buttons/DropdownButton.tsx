/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Button } from './Button.js';
import type { ButtonProps } from './Button.js';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.js';
import type { DropdownMenuProps } from '../DropdownMenu/DropdownMenu.js';
import { SvgCaretDownSmall, SvgCaretUpSmall } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

export type DropdownButtonProps = {
  /**
   * Items in the dropdown menu.
   * Pass a function that takes the `close` argument (to close the menu),
   * and returns a list of `MenuItem` components.
   */
  menuItems: (close: () => void) => React.JSX.Element[];
  /**
   * Style of the dropdown button.
   * Use 'borderless' to hide outline.
   * @default 'default'
   */
  styleType?: 'default' | 'borderless' | 'high-visibility';
  /**
   * Props for the `DropdownMenu` which extends `PopoverProps`.
   */
  dropdownMenuProps?: Omit<DropdownMenuProps, 'menuItems' | 'children'>;
} & Omit<ButtonProps, 'styleType' | 'endIcon'>;

/**
 * Button that opens a DropdownMenu.
 * @example
 * const menuItems = (close: () => void) => [
 *   <MenuItem key={1} onClick={onClick(1, close)}>Item #1</MenuItem>,
 *   <MenuItem key={2} onClick={onClick(2, close)}>Item #2</MenuItem>,
 * ];
 * <DropdownButton menuItems={menuItems}>Default</DropdownButton>
 */
export const DropdownButton = React.forwardRef((props, forwardedRef) => {
  const {
    menuItems,
    className,
    size,
    styleType,
    children,
    dropdownMenuProps,
    ...rest
  } = props;

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <DropdownMenu
      menuItems={menuItems}
      matchWidth
      visible={isMenuOpen}
      {...dropdownMenuProps}
      onVisibleChange={(open) => {
        setIsMenuOpen(open);
        dropdownMenuProps?.onVisibleChange?.(open);
      }}
    >
      <Button
        className={cx('iui-button-dropdown', className)}
        size={size}
        styleType={styleType}
        endIcon={
          isMenuOpen ? (
            <SvgCaretUpSmall aria-hidden />
          ) : (
            <SvgCaretDownSmall aria-hidden />
          )
        }
        ref={forwardedRef}
        {...rest}
      >
        {children}
      </Button>
    </DropdownMenu>
  );
}) as PolymorphicForwardRefComponent<'button', DropdownButtonProps>;
if (process.env.NODE_ENV === 'development') {
  DropdownButton.displayName = 'DropdownButton';
}
