/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { SvgChevronRight, Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type HeaderBreadcrumbsProps = {
  /**
   * Array of elements, chevrons will be put between them.
   * (expects HeaderButton[])
   * @example
   * [
   *  <HeaderButton key={...} ... />
   *  <HeaderButton key={...} ... />
   * ]
   */
  items: React.ReactNode[];
};

/**
 * Header breadcrumbs, adds chevron between each provided items.
 * @example
 * <HeaderBreadcrumbs
 *   items={[
 *     <HeaderButton key={...} ... />
 *     <HeaderButton key={...} ... />
 *   ]}
 * />
 */
export const HeaderBreadcrumbs = React.forwardRef((props, forwardedRef) => {
  const { className, items, ...rest } = props;

  return (
    <Box
      as='nav'
      aria-label='breadcrumbs'
      className={cx('iui-breadcrumbs', 'iui-header-breadcrumbs', className)}
      ref={forwardedRef}
      {...rest}
    >
      <Box
        as='ol'
        className={cx('iui-breadcrumbs-list', 'iui-header-breadcrumbs-list')}
      >
        {items.reduce(
          (previous: React.ReactNode[], current, index) => [
            ...previous,
            current,
            index !== items.length - 1 && (
              <Box as='li' className='iui-breadcrumbs-separator' key={index}>
                <SvgChevronRight
                  key={`chevron${index}`}
                  aria-hidden
                  className='iui-chevron'
                />
              </Box>
            ),
          ],
          [],
        )}
      </Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'nav', HeaderBreadcrumbsProps>;
