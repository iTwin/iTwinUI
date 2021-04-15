/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { Button, ButtonProps } from '../Button';
import { IconButton } from '../IconButton';
import { DropdownMenu } from '../../DropdownMenu';
import { Placement } from 'tippy.js';
import SvgCaretDownSmall from '@itwin/itwinui-icons-react/cjs/icons/CaretDownSmall';
import SvgCaretUpSmall from '@itwin/itwinui-icons-react/cjs/icons/CaretUpSmall';

import { useTheme } from '../../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/button.css';

export type SplitButtonProps = {
  /**
   * Callback fired on clicking the primary button.
   */
  onClick: () => void;
  /**
   * Items in the dropdown menu.
   * Pass a function that takes the `close` argument (to close the menu),
   * and returns a list of `MenuItem` components.
   */
  menuItems: (close: () => void) => JSX.Element[];
  /**
   * Placement of the dropdown menu.
   * @default 'bottom-end'
   */
  menuPlacement?: Placement;
  /*
   * Style of the button.
   * @default 'default'
   */
  styleType?: 'cta' | 'high-visibility' | 'default';
  /**
   * Content of primary button.
   */
  children: React.ReactNode;
} & Omit<ButtonProps, 'styleType' | 'onClick'>;

/**
 * Split button component with a DropdownMenu.
 * @example
 * const menuItems = (close: () => void) => [
 *   <MenuItem key={1} onClick={onClick(1, close)}>Item #1</MenuItem>,
 *   <MenuItem key={2} onClick={onClick(2, close)}>Item #2</MenuItem>,
 * ];
 * <SplitButton onClick={onClick} menuItems={menuItems}>Default</SplitButton>
 * <SplitButton onClick={onClick} menuItems={menuItems} styleType='high-visibility'>High visibility</SplitButton>
 */
export const SplitButton = (props: SplitButtonProps) => {
  const {
    onClick,
    menuItems,
    className,
    menuPlacement = 'bottom-end',
    styleType = 'default',
    size,
    children,
    style,
    title,
    ...rest
  } = props;

  useTheme();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [menuWidth, setMenuWidth] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      setMenuWidth(ref.current.offsetWidth);
    }
  }, [children, size]);

  return (
    <span
      className={cx(className, 'iui-button-split-menu')}
      style={style}
      title={title}
      ref={ref}
    >
      <Button styleType={styleType} size={size} onClick={onClick} {...rest}>
        {children}
      </Button>
      <DropdownMenu
        placement={menuPlacement}
        menuItems={menuItems}
        style={{ minWidth: menuWidth }}
        onShow={React.useCallback(() => setIsMenuOpen(true), [])}
        onHide={React.useCallback(() => setIsMenuOpen(false), [])}
      >
        <IconButton styleType={styleType} size={size}>
          {isMenuOpen ? <SvgCaretUpSmall /> : <SvgCaretDownSmall />}
        </IconButton>
      </DropdownMenu>
    </span>
  );
};

export default SplitButton;
