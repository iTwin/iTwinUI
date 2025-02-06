/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import cx from 'classnames';
import * as React from 'react';

import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type HeaderLogoOwnProps = {
  /**
   * Logo shown before the main content.
   */
  logo: JSX.Element;
  /**
   * Click event handler.
   * If passed, the component will be rendered as a `<button>` rather than `<div>`.
   */
  onClick?: (e: unknown) => void;
};

/**
 * Header Title section
 * @example
 * <HeaderLogo logo={<SvgImodelHollow />}>iTwin Application</HeaderLogo>
 * <HeaderLogo logo={<SvgImodelHollow />} />
 * <HeaderLogo logo={<img src='image.png' />} />
 * <HeaderLogo logo={<img src='data:image/png;base64,...' />}>Downloaded Image</HeaderLogo>
 */
export const HeaderLogo = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    logo,
    onClick,
    as = (!!onClick ? 'button' : 'div') as any,
    ...rest
  } = props;

  return (
    <Box
      className={cx('iui-header-brand', className)}
      as={as}
      type={as === 'button' ? 'button' : undefined}
      onClick={onClick}
      ref={ref}
      {...rest}
    >
      {logo ? (
        <Box as='span' className='iui-header-brand-icon' aria-hidden>
          {logo}
        </Box>
      ) : null}
      {children && (
        <Box as='span' className='iui-header-brand-label'>
          {children}
        </Box>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', HeaderLogoOwnProps>;
if (process.env.NODE_ENV === 'development') {
  HeaderLogo.displayName = 'HeaderLogo';
}
