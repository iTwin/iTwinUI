/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box, getBoundedValue } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

type ProgressLinearProps = {
  /**
   * Progress percentage. Should be a number between 0 and 100.
   */
  value?: number;
  /**
   * Progress variant. If true, `value` will be ignored.
   *
   * Defaults to true if `value` is passed, otherwise false.
   */
  indeterminate?: boolean;
  /**
   * Labels array. One label will be centered, two will be put to the sides.
   */
  labels?: React.ReactNode[];
  /**
   * Apply animation to the value change, if determinate.
   * @default false
   */
  isAnimated?: boolean;
  /**
   * Status of progress.
   */
  status?: 'positive' | 'negative';
  /**
   * Pass props to ProgressLinear label group.
   */
  labelGroupProps?: React.ComponentProps<'div'>;
};

/**
 * Shows progress on a linear bar
 * @example
 * Determinate
 * <ProgressLinear value={25}/>
 * Indeterminate
 * <ProgressLinear indeterminate={true}/>
 * Labeled - Center
 * <ProgressLinear value={50} labels={['Centered Label']} />
 * Labeled - Left & Right
 * <ProgressLinear value={50} labels={['Loading...', '50%']} />
 * Positive / Negative.
 * <ProgressLinear status='positive' labels={['Upload done!', <SvgStatusSuccessHollow />]} />
 * <ProgressLinear status='negative' />
 */
export const ProgressLinear = React.forwardRef((props, forwardedRef) => {
  const {
    value,
    indeterminate = value === undefined,
    labels = [],
    isAnimated = false,
    status,
    className,
    labelGroupProps,
    ...rest
  } = props;

  const boundedValue = getBoundedValue(value ?? 100, 0, 100);

  return (
    <Box
      className={cx('iui-progress-indicator-linear', className)}
      ref={forwardedRef}
      data-iui-status={status}
      data-iui-indeterminate={indeterminate ? 'true' : undefined}
      data-iui-animated={isAnimated ? 'true' : undefined}
      style={
        {
          '--iui-progress-percentage': `${boundedValue}%`,
        } as React.CSSProperties
      }
      {...rest}
    >
      {labels.length > 0 && (
        <Box
          as='div'
          {...labelGroupProps}
          className={cx(
            'iui-progress-indicator-linear-label',
            labelGroupProps?.className,
          )}
        >
          {labels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </Box>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', ProgressLinearProps>;

export default ProgressLinear;
