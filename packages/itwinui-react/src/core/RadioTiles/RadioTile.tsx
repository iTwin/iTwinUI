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
   * Set focus on radio tile element.
   * @default false
   */
  setFocus?: boolean;
  /**
   * Passes props for tile.
   */
  tileProps?: React.ComponentProps<'label'>;
  /**
   * Passes props for tile input.
   */
  inputProps?: React.ComponentProps<'input'>;
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
    setFocus = false,
    tileProps = {},
    inputProps = {},
    iconProps = {},
    labelProps = {},
    subLabelProps = {},
  } = props;

  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const refs = useMergedRefs<HTMLInputElement>(inputElementRef, ref);

  React.useEffect(() => {
    if (inputElementRef.current && setFocus) {
      inputElementRef.current.focus();
    }
  }, [setFocus]);

  const { className: tileClassName, ...restTileProps } = tileProps;
  const { className: inputClassName, ...restInputProps } = inputProps;
  const { className: iconClassName, ...restIconProps } = iconProps;
  const { className: labelClassName, ...restLabelProps } = labelProps;
  const { className: subLabelClassName, ...restSubLabelProps } = subLabelProps;

  return (
    <Box
      as='label'
      className={cx('iui-radio-tile', tileClassName)}
      style={style}
      {...restTileProps}
    >
      <Box
        as='input'
        className={cx('iui-radio-tile-input', inputClassName)}
        type='radio'
        ref={refs}
        {...restInputProps}
      />
      <Box className='iui-radio-tile-content'>
        {icon && (
          <Box
            as='span'
            className={cx('iui-radio-tile-icon', iconClassName)}
            aria-hidden
            {...restIconProps}
          >
            {icon}
          </Box>
        )}
        {label && (
          <Box
            as='div'
            className={cx('iui-radio-tile-label', labelClassName)}
            {...restLabelProps}
          >
            {label}
          </Box>
        )}
        {description && (
          <Box
            as='div'
            className={cx('iui-radio-tile-sublabel', subLabelClassName)}
            {...restSubLabelProps}
          >
            {description}
          </Box>
        )}
      </Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'input', RadioTileProps>;

export default RadioTile;
