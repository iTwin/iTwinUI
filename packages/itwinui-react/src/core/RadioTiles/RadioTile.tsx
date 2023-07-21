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
   * Passes props to tile wrapper.
   */
  wrapperProps?: React.ComponentProps<'label'>;
};

/**
 * RadioTile component to be used in RadioTileGroup component
 * @example
 * <RadioTile label='My tile' description='Some info' icon={<SvgSmileyHappy />} />
 */
export const RadioTile = React.forwardRef((props, ref) => {
  const { icon, label, description, wrapperProps, style, ...rest } = props;

  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const refs = useMergedRefs<HTMLInputElement>(inputElementRef, ref);

  return (
    <Box
      as='label'
      className={cx('iui-radio-tile', wrapperProps?.className)}
      data-iui-disabled={props.disabled ? 'true' : undefined}
      {...wrapperProps}
    >
      <Box
        as='input'
        className={cx('iui-radio-tile-input')}
        style={style}
        type='radio'
        ref={refs}
        {...rest}
      />
      {icon && (
        <Box as='span' className='iui-radio-tile-icon' aria-hidden>
          {icon}
        </Box>
      )}
      {label && <Box className='iui-radio-tile-label'>{label}</Box>}
      {description && (
        <Box className='iui-radio-tile-sublabel'>{description}</Box>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'input', RadioTileProps>;

export default RadioTile;
