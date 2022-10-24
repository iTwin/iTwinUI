/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import cx from 'classnames';
import React from 'react';

import { useTheme, CommonProps } from '../utils';
import '@itwin/itwinui-css/css/header.css';

export type HeaderLogoProps = {
  /**
   * Logo shown before the main content.
   */
  logo: JSX.Element;
  /**
   * Click event handler.
   * Will update the Logo to have mouse and keyboard interaction if provided.
   */
  onClick?: () => void;
  /**
   * Expects the app name, is put on the right of the logo.
   */
  children?: React.ReactNode;
} & CommonProps;

/**
 * Header Title section
 * @example
 * <HeaderLogo logo={<SvgImodelHollow />}>iTwin Application</HeaderLogo>
 * <HeaderLogo logo={<SvgImodelHollow />} />
 * <HeaderLogo logo={<img src='image.png' />} />
 * <HeaderLogo logo={<img src='data:image/png;base64,...' />}>Downloaded Image</HeaderLogo>
 */
export const HeaderLogo = (props: HeaderLogoProps) => {
  const { className, children, logo, onClick, ...rest } = props;
  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      onClick &&
      (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar')
    ) {
      e.preventDefault();
      onClick();
    }
  };
  useTheme();
  return (
    <div
      className={cx('iui-header-brand', className)}
      role={onClick && 'button'}
      tabIndex={onClick && 0}
      onKeyDown={keyDownHandler}
      onClick={onClick}
      {...rest}
    >
      {React.isValidElement<{ className: string }>(logo)
        ? React.cloneElement(logo, {
            className: cx('iui-header-brand-icon', logo.props.className),
          })
        : undefined}
      {children && <span className='iui-header-brand-label'>{children}</span>}
    </div>
  );
};

export default HeaderLogo;
