/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { DropdownMenu } from '../DropdownMenu';
import {
  PolymorphicForwardRefComponent,
  useTheme,
  SvgCaretDownSmall,
  SvgCaretUpSmall,
} from '../utils';
import { SplitButtonProps } from '../Buttons';
import { HeaderBasicButton } from './HeaderBasicButton';

export type HeaderSplitButtonProps = SplitButtonProps;

type HeaderSplitButtonComponent = PolymorphicForwardRefComponent<
  'button',
  HeaderSplitButtonProps
>;

export const HeaderSplitButton: HeaderSplitButtonComponent = React.forwardRef(
  (props, forwardedRef) => {
    const {
      menuItems,
      className,
      menuPlacement = 'bottom-end',
      children,
      style,
      title,
      disabled,
      ...rest
    } = props;

    useTheme();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const [menuWidth, setMenuWidth] = React.useState(0);
    const ref = React.useRef<HTMLLIElement>(null);

    React.useEffect(() => {
      if (ref.current) {
        setMenuWidth(ref.current.offsetWidth);
      }
    }, [children]);

    return (
      <span
        className={cx('iui-header-breadcrumb-button-wrapper', className)}
        style={style}
        title={title}
        ref={ref}
      >
        <HeaderBasicButton ref={forwardedRef} disabled={disabled} {...rest}>
          {children}
        </HeaderBasicButton>
        <DropdownMenu
          placement={menuPlacement}
          menuItems={menuItems}
          style={{ minWidth: menuWidth }}
          onShow={React.useCallback(() => setIsMenuOpen(true), [])}
          onHide={React.useCallback(() => setIsMenuOpen(false), [])}
        >
          <button
            className='iui-header-breadcrumb-button iui-header-breadcrumb-button-split'
            disabled={disabled}
          >
            {isMenuOpen ? (
              <SvgCaretUpSmall
                className='iui-header-breadcrumb-button-dropdown-icon'
                aria-hidden
              />
            ) : (
              <SvgCaretDownSmall
                className='iui-header-breadcrumb-button-dropdown-icon'
                aria-hidden
              />
            )}
          </button>
        </DropdownMenu>
      </span>
    );
  },
);

export default HeaderSplitButton;
