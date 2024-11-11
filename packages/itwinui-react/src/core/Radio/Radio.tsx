/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';

import { useMergedRefs, Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

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
   * Passes props to Radio label.
   */
  labelProps?: React.ComponentProps<'span'>;
  /**
   * Passes props to Radio wrapper.
   */
  wrapperProps?: React.ComponentProps<'label'>;
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
    labelProps,
    wrapperProps,
    style,
    ...rest
  } = props;

  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const refs = useMergedRefs<HTMLInputElement>(inputElementRef, ref);

  const radio = (
    <Box
      as='input'
      className={cx('iui-checkbox', 'iui-radio', className)}
      style={style}
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
      {...wrapperProps}
      className={cx('iui-checkbox-wrapper', wrapperProps?.className)}
      data-iui-status={status}
      data-iui-disabled={disabled ? 'true' : undefined}
    >
      {radio}
      {label && (
        <Box
          as='span'
          {...labelProps}
          className={cx('iui-radio-label', labelProps?.className)}
        >
          {label}
        </Box>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'input', RadioProps>;
if (process.env.NODE_ENV === 'development') {
  Radio.displayName = 'Radio';
}
