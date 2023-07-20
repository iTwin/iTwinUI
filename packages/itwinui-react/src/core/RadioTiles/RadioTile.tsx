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
   * Passes props for tile wrapper.
   */
  wrapperProps?: React.ComponentProps<'label'>;
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
    description,
    className,
    style,
    wrapperProps,
    iconProps,
    labelProps,
    subLabelProps,
    ...rest
  } = props;

  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const refs = useMergedRefs<HTMLInputElement>(inputElementRef, ref);

  return (
    <Box
      as='label'
      className={cx('iui-radio-tile', className)}
      style={style}
      data-iui-disabled={props.disabled ? 'true' : undefined}
      {...wrapperProps}
    >
      <Box
        as='input'
        className='iui-radio-tile-input'
        type='radio'
        ref={refs}
        {...rest}
      />
      {icon && (
        <Box
          as='span'
          className='iui-radio-tile-icon'
          aria-hidden
          {...iconProps}
        >
          {icon}
        </Box>
      )}
      {label && (
        <Box as='div' className='iui-radio-tile-label' {...labelProps}>
          {label}
        </Box>
      )}
      {description && (
        <Box as='div' className='iui-radio-tile-sublabel' {...subLabelProps}>
          {description}
        </Box>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'input', RadioTileProps>;

export default RadioTile;
