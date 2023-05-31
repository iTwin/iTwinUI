/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useMergedRefs, Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import '@itwin/itwinui-css/css/radio-tile.css';

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
   * Set focus on radio tile element.
   * @default false
   */
  setFocus?: boolean;
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
    setFocus = false,
    className,
    style,
    ...rest
  } = props;

  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const refs = useMergedRefs<HTMLInputElement>(inputElementRef, ref);

  React.useEffect(() => {
    if (inputElementRef.current && setFocus) {
      inputElementRef.current.focus();
    }
  }, [setFocus]);

  return (
    <Box as='label' className={cx('iui-radio-tile', className)} style={style}>
      <Box
        as='input'
        className='iui-radio-tile-input'
        type='radio'
        ref={refs}
        {...rest}
      />
      <Box className='iui-radio-tile-content'>
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
    </Box>
  );
}) as PolymorphicForwardRefComponent<'input', RadioTileProps>;

export default RadioTile;
