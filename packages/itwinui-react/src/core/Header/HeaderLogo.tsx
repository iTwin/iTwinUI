/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import cx from 'classnames';
import React from 'react';

import { useTheme, PolymorphicForwardRefComponent } from '../utils';
import '@itwin/itwinui-css/css/header.css';

export type HeaderLogoProps = {
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
    as: Element = !!onClick ? 'button' : 'div',
    ...rest
  } = props;

  useTheme();

  return (
    <Element
      className={cx('iui-header-brand', className)}
      onClick={onClick}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- TS complains here but it's ok; it is an implementation detail
      // @ts-ignore
      ref={ref}
      {...rest}
    >
      {React.isValidElement<{ className: string }>(logo)
        ? React.cloneElement(logo, {
            className: cx('iui-header-brand-icon', logo.props.className),
          })
        : undefined}
      {children && <span className='iui-header-brand-label'>{children}</span>}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', HeaderLogoProps>;

export default HeaderLogo;
