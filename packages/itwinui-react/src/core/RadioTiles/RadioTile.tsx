/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useMergedRefs, Box } from '../utils/index.js';
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

  const labelElementRef = React.useRef<HTMLLabelElement>(null);
  const refs = useMergedRefs<HTMLLabelElement>(labelElementRef, ref);

  return (
    <Box
      as='label'
      className={cx('iui-radio-tile', className)}
      style={style}
      ref={refs}
      {...rest}
    >
      <Box
        {...inputProps}
        as='input'
        className={cx('iui-radio-tile-input', inputProps?.className)}
        type='radio'
      />
      <Box
        {...contentProps}
        as='div'
        className={cx('iui-radio-tile-content', contentProps?.className)}
      >
        {icon && (
          <Box
            {...iconProps}
            as='span'
            className={cx('iui-radio-tile-icon', iconProps?.className)}
            aria-hidden
          >
            {icon}
          </Box>
        )}
        {label && (
          <Box
            {...labelProps}
            as='div'
            className={cx('iui-radio-tile-label', labelProps?.className)}
          >
            {label}
          </Box>
        )}
        {description && (
          <Box
            {...subLabelProps}
            as='div'
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
