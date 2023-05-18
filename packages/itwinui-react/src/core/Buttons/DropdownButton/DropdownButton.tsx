/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Button } from '../Button/index.js';
import type { ButtonProps } from '../Button/Button.js';
import { DropdownMenu } from '../../DropdownMenu/index.js';
import type { DropdownMenuProps } from '../../DropdownMenu/index.js';
import {
  SvgCaretDownSmall,
  SvgCaretUpSmall,
  useGlobals,
  useMergedRefs,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import '@itwin/itwinui-css/css/button.css';

export type DropdownButtonProps = {
  /**
   * Items in the dropdown menu.
   * Pass a function that takes the `close` argument (to close the menu),
   * and returns a list of `MenuItem` components.
   */
  menuItems: (close: () => void) => JSX.Element[];
  /**
   * Style of the dropdown button.
   * Use 'borderless' to hide outline.
   * @default 'default'
   */
  styleType?: 'default' | 'borderless';
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
export const DropdownButton = React.forwardRef((props, ref) => {
  const {
    menuItems,
    className,
    size,
    styleType,
    children,
    dropdownMenuProps,
    ...rest
  } = props;

  useGlobals();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [menuWidth, setMenuWidth] = React.useState(0);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const refs = useMergedRefs(ref, buttonRef);

  React.useEffect(() => {
    if (buttonRef.current) {
      setMenuWidth(buttonRef.current.offsetWidth);
    }
  }, [children, size, styleType]);

  return (
    <DropdownMenu
      menuItems={menuItems}
      {...dropdownMenuProps}
      onShow={(i) => {
        setIsMenuOpen(true);
        dropdownMenuProps?.onShow?.(i);
      }}
      onHide={(i) => {
        setIsMenuOpen(false);
        dropdownMenuProps?.onHide?.(i);
      }}
      style={{ minWidth: menuWidth, ...dropdownMenuProps?.style }}
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
        ref={refs}
        aria-label='Dropdown'
        {...rest}
      >
        {children}
      </Button>
    </DropdownMenu>
  );
}) as PolymorphicForwardRefComponent<'button', DropdownButtonProps>;

export default DropdownButton;
