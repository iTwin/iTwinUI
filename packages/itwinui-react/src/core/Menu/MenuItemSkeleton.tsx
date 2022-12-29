/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { CommonProps, useTheme, VisuallyHidden } from '../utils';
import '@itwin/itwinui-css/css/menu.css';

export type MenuItemSkeletonProps = {
  /**
   * Flag whether to show skeleton for sub-label.
   */
  hasSublabel?: boolean;
  /**
   * Flag whether to show skeleton for icon.
   */
  hasIcon?: boolean;
  /**
   * Skeleton content width.
   */
  contentWidth?: string;
  /**
   * Translated strings used for accessibility.
   */
  translatedStrings?: {
    /**
     * Label for loading state. Defaults to "Loading…".
     * It is only visible for the screen readers.
     */
    loading: string;
  };
} & CommonProps;

/**
 * Menu item that uses skeletons to indicate loading state.
 */
export const MenuItemSkeleton = (props: MenuItemSkeletonProps) => {
  const {
    hasSublabel,
    hasIcon,
    contentWidth,
    translatedStrings = { loading: 'Loading…' },
    className,
    style,
    ...rest
  } = props;

  useTheme();

  return (
    <li
      className={cx(
        'iui-menu-item',
        'iui-menu-item-skeleton',
        { 'iui-large': hasSublabel },
        className,
      )}
      style={{
        ...{
          '--iui-menu-item-content-skeleton-max-width': contentWidth,
        },
        ...style,
      }}
      {...rest}
    >
      {hasIcon && <div className='iui-icon iui-skeleton' aria-hidden />}
      <span className='iui-content'>
        <div className='iui-menu-label iui-skeleton' aria-hidden />
        {hasSublabel && (
          <div className='iui-menu-description iui-skeleton' aria-hidden />
        )}
        <VisuallyHidden>{translatedStrings.loading}</VisuallyHidden>
      </span>
    </li>
  );
};

export default MenuItemSkeleton;
