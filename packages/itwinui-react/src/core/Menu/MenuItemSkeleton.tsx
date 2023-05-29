/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box, VisuallyHidden } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import '@itwin/itwinui-css/css/menu.css';

type MenuItemSkeletonProps = {
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
};

/**
 * Menu item that uses skeletons to indicate loading state.
 */
export const MenuItemSkeleton = React.forwardRef((props, forwardedRef) => {
  const {
    hasSublabel,
    hasIcon,
    contentWidth,
    translatedStrings = { loading: 'Loading…' },
    className,
    style,
    ...rest
  } = props;

  return (
    <Box
      as='li'
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
      ref={forwardedRef}
      {...rest}
    >
      {hasIcon && <Box className='iui-icon iui-skeleton' aria-hidden />}
      <Box as='span' className='iui-content'>
        <Box className='iui-menu-label iui-skeleton' aria-hidden />
        {hasSublabel && (
          <Box className='iui-menu-description iui-skeleton' aria-hidden />
        )}
        <VisuallyHidden>{translatedStrings.loading}</VisuallyHidden>
      </Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'li', MenuItemSkeletonProps>;

export default MenuItemSkeleton;
