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

  const statuses = ['informational', 'positive', 'negative', 'warning'];

  const isStatus =
    reducedBackgroundColor && statuses.includes(reducedBackgroundColor);

  const _style =
    reducedBackgroundColor && !isStatus
      ? {
          '--iui-badge-background-color': isSoftBackground(
            reducedBackgroundColor,
          )
            ? SoftBackgrounds[reducedBackgroundColor]
            : reducedBackgroundColor,
          ...style,
        }
      : { ...style };

  return (
    <span
      className={cx('iui-badge', className)}
      style={_style}
      data-iui-status={isStatus ? reducedBackgroundColor : undefined}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Badge;
