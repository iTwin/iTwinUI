/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

type RadioTileProps = {
  /**
   * Icon to be used.
   */
  icon?: JSX.Element;
  /**
   * Label of the Radio tile.
   */
  label?: React.ReactNode;
  /**
   * Additional description, if needed.
   */
  description?: React.ReactNode;
  /**
   * Passes props for tile input.
   */
  inputProps?: React.ComponentProps<'input'>;
  /**
   * Passes props for tile content.
   */
  contentProps?: React.ComponentProps<'div'>;
  /**
   * Passes props for tile icon.
   */
  iconProps?: React.ComponentProps<'span'>;
  /**
   * Passes props for tile label.
   */
  labelProps?: React.ComponentProps<'div'>;
  /**
   * Passes props for tile sublabel.
   */
  subLabelProps?: React.ComponentProps<'div'>;
};

/**
 * RadioTile component to be used in RadioTileGroup component
 * @example
 * <RadioTile label='My tile' description='Some info' icon={<SvgSmileyHappy />} />
 */
export const RadioTile = React.forwardRef((props, ref) => {
  const {
    icon,
    label,
    style,
    description,
    className,
    inputProps,
    contentProps,
    iconProps,
    labelProps,
    subLabelProps,
    ...rest
  } = props;

  return (
    <Box
      as='label'
      style={style}
      ref={ref}
      {...rest}
      className={cx('iui-radio-tile', className)}
    >
      <Box
        as='input'
        type='radio'
        {...inputProps}
        className={cx('iui-radio-tile-input', inputProps?.className)}
      />
      <Box
        as='div'
        {...contentProps}
        className={cx('iui-radio-tile-content', contentProps?.className)}
      >
        {icon && (
          <Box
            as='span'
            aria-hidden
            {...iconProps}
            className={cx('iui-radio-tile-icon', iconProps?.className)}
          >
            {icon}
          </Box>
        )}
        {label && (
          <Box
            as='div'
            {...labelProps}
            className={cx('iui-radio-tile-label', labelProps?.className)}
          >
            {label}
          </Box>
        )}
        {description && (
          <Box
            as='div'
            {...subLabelProps}
            className={cx('iui-radio-tile-sublabel', subLabelProps?.className)}
          >
            {description}
          </Box>
        )}
      </Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'label', RadioTileProps>;

export default RadioTile;
