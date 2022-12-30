/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useMergedRefs, useTheme } from '../utils';
import '@itwin/itwinui-css/css/radio-tile.css';

export type RadioTileProps = {
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
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

/**
 * RadioTile component to be used in RadioTileGroup component
 * @example
 * <RadioTile label='My tile' description='Some info' icon={<SvgSmileyHappy />} />
 */
export const RadioTile = React.forwardRef(
  (props: RadioTileProps, ref: React.RefObject<HTMLInputElement>) => {
    const {
      icon,
      label,
      description,
      setFocus = false,
      className,
      style,
      ...rest
    } = props;

    useTheme();

    const inputElementRef = React.useRef<HTMLInputElement>(null);
    const refs = useMergedRefs<HTMLInputElement>(inputElementRef, ref);

    React.useEffect(() => {
      if (inputElementRef.current && setFocus) {
        inputElementRef.current.focus();
      }
    }, [setFocus]);

    return (
      <label className={cx('iui-radio-tile', className)} style={style}>
        <input
          className='iui-radio-tile-input'
          type='radio'
          ref={refs}
          {...rest}
        />
        <div className='iui-radio-tile-content'>
          {icon &&
            React.cloneElement(icon, {
              className: cx('iui-radio-tile-icon', icon.props.className),
            })}
          {label && <div className='iui-radio-tile-label'>{label}</div>}
          {description && (
            <div className='iui-radio-tile-sublabel'>{description}</div>
          )}
        </div>
      </label>
    );
  },
);

export default RadioTile;
