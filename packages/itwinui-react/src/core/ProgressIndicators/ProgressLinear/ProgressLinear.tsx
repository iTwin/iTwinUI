/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

import cx from 'classnames';
import { CommonProps, useTheme } from '../../utils';
import '@itwin/itwinui-css/css/progress-indicator.css';

export type ProgressLinearProps = {
  /**
   * Progress percentage. Should be a number between 0 and 100.
   * @default 0
   */
  value?: number;
  /**
   * Progress variant. If true, value will be ignored.
   * @default false
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
   * Status of progress. Positive status always has 100% value.
   */
  status?: 'positive' | 'negative';
} & CommonProps;

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
export const ProgressLinear = (props: ProgressLinearProps) => {
  const {
    value = 0,
    indeterminate = false,
    labels = [],
    isAnimated = false,
    status,
    className,
    style,
    ...rest
  } = props;

  useTheme();

  const boundedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cx(
        'iui-progress-indicator-linear',
        {
          [`iui-${status}`]: !!status,
        },
        className,
      )}
      style={style}
      {...rest}
    >
      <div className='iui-track'>
        <div
          className={cx('iui-fill', {
            'iui-determinate': !indeterminate && isAnimated,
            'iui-indeterminate': indeterminate,
          })}
          style={{ width: indeterminate ? '100%' : `${boundedValue}%` }}
        />
      </div>
      {labels.length > 0 && (
        <div className='iui-label'>
          {labels.map((label, index) => (
            <span key={index}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressLinear;
