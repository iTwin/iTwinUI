/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { DropdownMenu } from '../DropdownMenu';
import SvgCaretDownSmall from '@itwin/itwinui-icons-react/cjs/icons/CaretDownSmall';
import SvgCaretUpSmall from '@itwin/itwinui-icons-react/cjs/icons/CaretUpSmall';
import { PolymorphicForwardRefComponent, useTheme } from '../utils';
import { DropdownButtonProps } from '../Buttons';
import { useMergedRefs } from '../utils';
import { HeaderBasicButton } from './HeaderBasicButton';

export type HeaderDropdownButtonProps = DropdownButtonProps;
type HeaderDropdownButtonComponent = PolymorphicForwardRefComponent<
  'button',
  HeaderDropdownButtonProps
>;

export const HeaderDropdownButton: HeaderDropdownButtonComponent = React.forwardRef(
  (props, ref) => {
    const { menuItems, className, children, ...rest } = props;

    useTheme();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const [menuWidth, setMenuWidth] = React.useState(0);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const refs = useMergedRefs(ref, buttonRef);

    React.useEffect(() => {
      if (buttonRef.current) {
        setMenuWidth(buttonRef.current.offsetWidth);
      }
    }, [children]);

    return (
      <DropdownMenu
        menuItems={menuItems}
        style={{ minWidth: menuWidth }}
        onShow={() => setIsMenuOpen(true)}
        onHide={() => setIsMenuOpen(false)}
      >
        <HeaderBasicButton
          className={cx('iui-header-breadcrumb-button', className)}
          ref={refs}
          aria-label='Dropdown'
          endIcon={
            isMenuOpen ? (
              <SvgCaretUpSmall
                className='iui-header-breadcrumb-button-dropdown-icon'
                aria-hidden
              />
            ) : (
              <SvgCaretDownSmall
                className='iui-header-breadcrumb-button-dropdown-icon'
                aria-hidden
              />
            )
          }
          {...rest}
        >
          {children}
        </HeaderBasicButton>
      </DropdownMenu>
    );
  },
);

export default HeaderDropdownButton;
