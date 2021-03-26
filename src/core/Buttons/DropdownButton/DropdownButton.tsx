// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import cx from 'classnames';
import { Button, ButtonProps } from '../Button';
import { DropdownMenu } from '../../DropdownMenu';
import { Position } from '../../../utils';
import SvgCaretDown2 from '@bentley/icons-generic-react/cjs/icons/CaretDown2';
import SvgCaretUp2 from '@bentley/icons-generic-react/cjs/icons/CaretUp2';

import { useTheme } from '../../utils/hooks/useTheme';
import '@bentley/itwinui/css/buttons.css';

export type DropdownButtonProps = {
  /**
   * Items in the dropdown menu.
   * Pass a function that takes the `close` argument (to close the menu),
   * and returns a list of `MenuItem` components.
   */
  menuItems: (close: () => void) => JSX.Element[];
} & Omit<ButtonProps, 'onClick' | 'styleType'>;

/**
 * Button that opens a DropdownMenu.
 * @example
 * const menuItems = (close: () => void) => [
 *   <MenuItem key={1} onClick={onClick(1, close)}>Item #1</MenuItem>,
 *   <MenuItem key={2} onClick={onClick(2, close)}>Item #2</MenuItem>,
 * ];
 * <DropdownButton menuItems={menuItems}>Default</DropdownButton>
 */
export const DropdownButton: React.FC<DropdownButtonProps> = (props) => {
  const { menuItems, className, size, children, ...rest } = props;

  useTheme();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [menuWidth, setMenuWidth] = React.useState(0);
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      setMenuWidth(ref.current.offsetWidth);
    }
  }, [children]);

  return (
    <DropdownMenu
      position={Position.BOTTOM_RIGHT}
      menuItems={menuItems}
      style={{ minWidth: menuWidth }}
      onOpen={() => setIsMenuOpen(true)}
      onClose={() => setIsMenuOpen(false)}
    >
      <Button
        className={cx('dropdown', className)}
        size={size}
        ref={ref}
        {...rest}
      >
        {children}
        {isMenuOpen ? (
          <SvgCaretUp2 className='iui-buttons-icon' />
        ) : (
          <SvgCaretDown2 className='iui-buttons-icon' />
        )}
      </Button>
    </DropdownMenu>
  );
};

export default DropdownButton;
