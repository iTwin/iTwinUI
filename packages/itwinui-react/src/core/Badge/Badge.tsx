/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  CommonProps,
  useTheme,
  isSoftBackground,
  SoftBackgrounds,
} from '../utils';
import type { AnyString } from '../utils';
import '@itwin/itwinui-css/css/badge.css';

/**
 * Helper function that returns one of the preset badge color values.
 */
const getBadgeColorValue = (color: BadgeProps['backgroundColor']) => {
  const statuses = ['positive', 'negative', 'warning', 'informational'];

  if (!color) {
    return '';
  } else if (statuses.includes(color)) {
    return `var(--iui-color-background-$(color)-muted)`;
  } else if (isSoftBackground(color)) {
    return SoftBackgrounds[color];
  } else {
    return color;
  }
};

/**
 * Helper function that returns one of the preset badge status values.
 */
const getStatusValue = (color: BadgeProps['backgroundColor']) => {
  const statuses = ['positive', 'negative', 'warning', 'informational'];

  return color && statuses.includes(color) ? color : undefined;
};

export type BadgeProps = {
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
} & CommonProps;

/**
 * A colorful visual indicator for categorizing items.
 * @example
 * <Badge>Label</Badge>
 * <Badge backgroundColor="sunglow">Label</Badge>
 * <Badge backgroundColor="positive">Label</Badge>
 */
export const Badge = (props: BadgeProps) => {
  const { backgroundColor, style, className, children, ...rest } = props;

  useTheme();

  // choosing 'primary' status should result in data-iui-status equaling 'informational'
  const reducedBackgroundColor =
    backgroundColor === 'primary' ? 'informational' : backgroundColor;

  const _style = reducedBackgroundColor
    ? {
        '--iui-badge-background-color': getBadgeColorValue(
          reducedBackgroundColor,
        ),
        ...style,
      }
    : { ...style };

  return (
    <span
      className={cx('iui-badge', className)}
      style={_style}
      data-iui-status={getStatusValue(reducedBackgroundColor)}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Badge;
