/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { isSoftBackground, SoftBackgrounds, Box } from '../../utils/index.js';
import type {
  AnyString,
  PolymorphicForwardRefComponent,
} from '../../utils/index.js';

/**
 * Helper function that returns one of the preset badge color values.
 */
const getBadgeColorValue = (color: BadgeProps['backgroundColor']) => {
  if (!color) {
    return '';
  }

  return isSoftBackground(color) ? SoftBackgrounds[color] : color;
};

/**
 * Helper function that returns one of the preset badge status values.
 */
const getStatusValue = (color: BadgeProps['backgroundColor']) => {
  const statuses = ['positive', 'negative', 'warning', 'informational'];

  return color && statuses.includes(color) ? color : undefined;
};

type BadgeProps = {
  /**
   * Background color of the badge.
   *
   * Recommended to use one of the preset colors for statuses and soft backgrounds.
   *
   * If not specified, a default neutral background will be used.
   */
  backgroundColor?:
    | 'primary'
    | 'informational'
    | 'positive'
    | 'negative'
    | 'warning'
    | keyof typeof SoftBackgrounds
    | AnyString;
  /**
   * Badge label.
   * Always gets converted to uppercase, and truncated if too long.
   */
  children: string;
};

/**
 * A colorful visual indicator for categorizing items.
 * @example
 * <Badge>Label</Badge>
 * <Badge backgroundColor="sunglow">Label</Badge>
 * <Badge backgroundColor="positive">Label</Badge>
 */
export const Badge = React.forwardRef((props, forwardedRef) => {
  const { backgroundColor, style, className, children, ...rest } = props;

  // choosing 'primary' status should result in data-iui-status equaling 'informational'
  const reducedBackgroundColor =
    backgroundColor === 'primary' ? 'informational' : backgroundColor;

  const statusValue = getStatusValue(reducedBackgroundColor);

  const _style =
    reducedBackgroundColor && !statusValue
      ? {
          '--iui-badge-background-color': getBadgeColorValue(
            reducedBackgroundColor,
          ),
          ...style,
        }
      : { ...style };

  return (
    <Box
      as='span'
      className={cx('iui-badge', className)}
      style={_style}
      data-iui-status={statusValue}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'span', BadgeProps>;
if (process.env.NODE_ENV === 'development') {
  Badge.displayName = 'Badge';
}
