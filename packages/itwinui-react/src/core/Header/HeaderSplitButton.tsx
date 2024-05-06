/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.js';
import {
  SvgCaretDownSmall,
  SvgCaretUpSmall,
  Box,
  ButtonBase,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import type { SplitButtonProps } from '../Buttons/SplitButton.js';
import { HeaderBasicButton } from './HeaderBasicButton.js';

export const HeaderSplitButton = React.forwardRef((props, forwardedRef) => {
  const {
    menuItems,
    className,
    menuPlacement = 'bottom-end',
    children,
    disabled,
    ...rest
  } = props;

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [menuWidth, setMenuWidth] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      setMenuWidth(ref.current.offsetWidth);
    }
  }, [children]);

  return (
    <Box
      className={cx('iui-header-breadcrumb-button-wrapper', className)}
      ref={ref}
    >
      <HeaderBasicButton ref={forwardedRef} disabled={disabled} {...rest}>
        {children}
      </HeaderBasicButton>
      <DropdownMenu
        placement={menuPlacement}
        menuItems={menuItems}
        style={{ minInlineSize: menuWidth }}
        onVisibleChange={(open) => setIsMenuOpen(open)}
      >
        <ButtonBase
          aria-label='More'
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
        </ButtonBase>
      </DropdownMenu>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'button', SplitButtonProps>;
