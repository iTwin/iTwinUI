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
import '@itwin/itwinui-css/css/badge.css';

/**
 * Helper function that returns one of the preset badge color values.
 */
const getBadgeColorValue = (color: BadgeProps['backgroundColor']) => {
  if (!color) {
    return '';
  }

  switch (color) {
    case 'primary':
      return '#A5D7F5';
    case 'positive':
      return '#C3E1AF';
    case 'negative':
      return '#EFA9A9';
    case 'warning':
      return '#F9D7AB';
    default:
      return isSoftBackground(color) ? SoftBackgrounds[color] : color;
  }
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
    | 'positive'
    | 'negative'
    | 'warning'
    | keyof typeof SoftBackgrounds
    // eslint-disable-next-line @typescript-eslint/ban-types -- This allows custom strings and keeps intellisense. See https://github.com/Microsoft/TypeScript/issues/29729
    | (string & {});
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

  const _style = backgroundColor
    ? {
        '--iui-badge-background-color': getBadgeColorValue(backgroundColor),
        ...style,
      }
    : { ...style };

  return (
    <span className={cx('iui-badge', className)} style={_style} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
