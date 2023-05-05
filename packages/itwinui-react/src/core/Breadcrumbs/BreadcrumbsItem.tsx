/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { useTheme, type CommonProps } from '../utils/index.js';
import '@itwin/itwinui-css/css/breadcrumbs.css';

type BreadcrumbsAnchorItemProps =
  | {
      /**
       * Type of breadcrumbs item.
       * @default 'button'
       */
      type?: 'anchor';
      /**
       * Include an href for anchor type breadcrumbs.
       * Use only when `type = 'anchor'`.
       */
      href?: string;
    }
  | {
      /**
       * Type of the breadcrumbs item.
       * @default 'button'
       */
      type?: 'button' | 'text';
    };

type BreadcrumbsButtonItemProps =
  | {
      /**
       * Type of the breadcrumbs item.
       * @default 'button'
       */
      type?: 'button';
      /**
       * Include an onClick function for button type breadcrumbs.
       * Use only when `type = 'button'`.
       */
      onClick?: () => void;
    }
  | {
      /**
       * Type of the breadcrumbs item.
       * @default 'button'
       */
      type?: 'anchor' | 'text';
    };

export type BreadcrumbsItemProps = {
  /**
   * Type of the breadcrumbs item.
   * @default 'button'
   */
  type?: 'anchor' | 'button' | 'text';
  /**
   * Include an href for anchor type breadcrumbs.
   */
  href?: string;
  /**
   * Include an onClick function for button type breadcrumbs.
   */
  onClick?: () => void;
  /**
   * Breadcrumbs item.
   */
  children: React.ReactNode;
} & CommonProps &
  BreadcrumbsAnchorItemProps &
  BreadcrumbsButtonItemProps;

/**
 * Breadcrumb item. Recommended to use inside `Breadcrumbs`.
 *
 * @example
 * <BreadcrumbsItem onClick={() => {}}>Breadcrumb Item Title</BreadcrumbsItem>
 *
 * @example
 * <BreadcrumbsItem onClick={() => {}}><SvgCalendar /></BreadcrumbsItem>
 */
export const BreadcrumbsItem = (props: BreadcrumbsItemProps) => {
  const {
    children,
    type = 'button',
    href,
    onClick,
    className,
    ...rest
  } = props;

  useTheme();

  switch (type) {
    case 'anchor':
      return (
        <a
          className={cx('iui-breadcrumbs-text', className)}
          href={href}
          {...rest}
        >
          {children}
        </a>
      );
    case 'button':
      return (
        <button
          className={cx('iui-breadcrumbs-button', className)}
          onClick={onClick}
          {...rest}
        >
          <span className='iui-breadcrumbs-text'>{children}</span>
        </button>
      );
    default:
      return (
        <span className={cx('iui-breadcrumbs-text', className)} {...rest}>
          {children}
        </span>
      );
  }
};

export default BreadcrumbsItem;
