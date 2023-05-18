/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';

import { useMergedRefs, useGlobals, Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import '@itwin/itwinui-css/css/radio.css';

type RadioProps = {
  /**
   * Label of the radio.
   */
  label?: React.ReactNode;
  /**
   * Status of the radio.
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * Set focus on radio element.
   * @default false
   */
  setFocus?: boolean;
};

/**
 * Basic radio input component
 * @example
 * <Radio />
 * <Radio label='Radio' />
 * <Radio disabled={true} label='Radio' />
 * <Radio status='positive' label='Positive' />
 * <Radio status='warning' label='Warning' />
 * <Radio status='negative' label='Negative' />
 */
export const Radio = React.forwardRef((props, ref) => {
  const {
    className,
    disabled = false,
    label,
    status,
    style,
    setFocus = false,
    ...rest
  } = props;

  useGlobals();

  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const refs = useMergedRefs<HTMLInputElement>(inputElementRef, ref);

  React.useEffect(() => {
    if (inputElementRef.current && setFocus) {
      inputElementRef.current.focus();
    }
  }, [setFocus]);

  const radio = (
    <Box
      as='input'
      className={cx('iui-radio', className && { [className]: !label })}
      style={!label ? style : undefined}
      disabled={disabled}
      type='radio'
      ref={refs}
      {...rest}
    />
  );

  return !label ? (
    radio
  ) : (
    <Box
      as='label'
      className={cx(
        'iui-radio-wrapper',
        { 'iui-disabled': disabled, [`iui-${status}`]: !!status },
        className,
      )}
      style={style}
    >
      {radio}
      {label && (
        <Box as='span' className='iui-radio-label'>
          {label}
        </Box>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'input', RadioProps>;

export default Radio;
