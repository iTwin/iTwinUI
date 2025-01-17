/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import type { JSX } from 'react';
import { useMergedRefs, Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

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
   * Passes props to tile wrapper.
   */
  wrapperProps?: React.ComponentProps<'label'>;
  /**
   * Passes props to tile icon.
   */
  iconProps?: React.ComponentProps<'span'>;
  /**
   * Passes props to tile label.
   */
  labelProps?: React.ComponentProps<'div'>;
  /**
   * Passes props to tile sublabel.
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
    description,
    className,
    wrapperProps,
    iconProps,
    labelProps,
    subLabelProps,
    style,
    ...rest
  } = props;

  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const refs = useMergedRefs<HTMLInputElement>(inputElementRef, ref);

  return (
    <Box
      as='label'
      data-iui-disabled={props.disabled ? 'true' : undefined}
      {...wrapperProps}
      className={cx('iui-radio-tile', wrapperProps?.className)}
    >
      <Box
        as='input'
        ref={refs}
        className={cx('iui-radio-tile-input', className)}
        style={style}
        type='radio'
        {...rest}
      />
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
  );
}) as PolymorphicForwardRefComponent<'input', RadioTileProps>;
if (process.env.NODE_ENV === 'development') {
  RadioTile.displayName = 'RadioTile';
}
