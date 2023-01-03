/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import '@itwin/itwinui-css/css/utils.css';

export type IconProps = {
  /**
   * Size of the svg.
   *  - 'auto': scales with text
   *  - 'medium': works well with most text
   *  - 'small': smaller than medium
   *  - 'large': larger than medium
   *
   * @default 'auto'
   */
  size?: 'auto' | 'small' | 'medium' | 'large';
  /**
   * Fill (color) of the svg.
   * Defaults to `--iui-color-icon-muted`. Can be specified to
   * use one of the status colors.
   *
   * @default 'default'
   */
  fill?: 'default' | 'positive' | 'informational' | 'negative' | 'warning';
} & React.ComponentProps<'span'>;

const sizeMap = {
  auto: 'auto',
  small: 's',
  medium: 'm',
  large: 'l',
} as const;

/**
 * A utility to component to provide size and fill to svgs.
 * Works well with svgs from `@itwin/itwinui-icons-react`.
 *
 * @example
 * <Icon size='default'>
 *   <SvgPlaceholder />
 * </Icon>
 *
 * @example
 * <Icon fill='negative'>
 *   <SvgStatusError />
 * </Icon>
 */
export const Icon = (props: IconProps) => {
  const { size = 'auto', fill = 'default', className, ...rest } = props;

  return (
    <span
      className={cx('iui-svg-icon', className)}
      data-iui-icon-size={sizeMap[size] || size}
      data-iui-icon-color={fill}
      {...rest}
    />
  );
};

export default Icon;
