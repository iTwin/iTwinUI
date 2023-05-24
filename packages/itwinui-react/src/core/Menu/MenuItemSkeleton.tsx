/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { useGlobals, VisuallyHidden } from '../utils/index.js';
import type { CommonProps } from '../utils/index.js';
import '@itwin/itwinui-css/css/menu.css';
import { ListItem } from '../List/ListItem.js';

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

  useGlobals();

  return (
    <ListItem
      className={cx(
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
      {hasIcon && <ListItem.Icon className='iui-skeleton' aria-hidden />}
      <ListItem.Content>
        <div className='iui-menu-label iui-skeleton' aria-hidden />
        {hasSublabel && (
          <div className='iui-menu-description iui-skeleton' aria-hidden />
        )}
        <VisuallyHidden>{translatedStrings.loading}</VisuallyHidden>
      </ListItem.Content>
    </ListItem>
  );
};

export default MenuItemSkeleton;
