// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import cx from 'classnames';
import { CommonProps } from '../utils/props';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/badge.css';

export type BadgeProps = {
  /**
   * Background color of the badge.
   * Recommended to use one of the data visualization colors: `$iui-color-dataviz-*`.
   */
  backgroundColor: string;
  /**
   * Badge label.
   * Always gets converted to uppercase, and truncated if too long.
   */
  children: string;
} & CommonProps;

/**
 * A colorful visual indicator for categorizing items.
 * @example
 * <Badge backgroundColor="#6AB9EC">Label</Badge>
 */
export const Badge = (props: BadgeProps) => {
  const { backgroundColor, style, className, children, ...rest } = props;
  useTheme();
  return (
    <span
      className={cx('iui-badge', className)}
      style={{ backgroundColor, ...style }}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Badge;
