/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import type { AnyString } from '../../utils/types.js';
import { Box } from '../../utils/components/Box.js';
import type { PolymorphicForwardRefComponent } from '../../utils/props.js';

export type IconProps = {
  /**
   * Size of the svg.
   *  - 'medium': works well with most text
   *  - 'small': smaller than medium
   *  - 'large': larger than medium
   *  - 'auto': scales with text
   *
   * Also accepts a custom string value that will be used unchanged.
   *
   * @default 'medium'
   */
  size?: 'auto' | 'small' | 'medium' | 'large' | AnyString;
  /**
   * Fill (color) of the svg.
   * Defaults to `--iui-color-icon-muted`. Can be specified to
   * use one of the status colors.
   *
   * Also accepts a custom string value that will be used unchanged.
   *
   * @default 'default'
   */
  fill?:
    | 'default'
    | 'positive'
    | 'informational'
    | 'negative'
    | 'warning'
    | AnyString;
  /**
   * Option to add padding to the icon.
   * @default false
   */
  padded?: boolean;
} & React.ComponentPropsWithoutRef<'span'>;

const getSizeValue = (size: string) => {
  switch (size) {
    case 'small':
      return 's';
    case 'medium':
      return 'm';
    case 'large':
      return 'l';
    default:
      return size;
  }
};

/**
 * A utility component to provide size and fill to svgs.
 * Works well with svgs from `@itwin/itwinui-icons-react`.
 *
 * @example
 * <Icon>
 *   <SvgPlaceholder />
 * </Icon>
 *
 * @example
 * <Icon fill='negative'>
 *   <SvgStatusError />
 * </Icon>
 */
export const Icon = React.forwardRef((props, ref) => {
  const {
    size = 'medium',
    fill = 'default',
    className,
    padded = false,
    ...rest
  } = props;

  return (
    <Box
      as='span'
      className={cx('iui-svg-icon', className)}
      data-iui-icon-size={getSizeValue(size)}
      data-iui-icon-color={fill}
      data-iui-padded={padded ? 'true' : undefined}
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'span', IconProps>;
