// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import {
  SvgCheckmark as Positive,
  SvgImportant as Negative,
} from '@bentley/icons-generic-react';
import cx from 'classnames';
import React from 'react';
import { CommonProps } from '../../utils/props';
import { useTheme } from '../../utils/hooks/useTheme';
import '@bentley/itwinui/css/progress-indicators.css';

export type ProgressRadialProps = {
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
   * Status of Progress. Positive status always has 100% value.
   */
  status?: 'positive' | 'negative';
  /**
   * Size of the Progress.
   * @default ''
   */
  size?: '' | 'small';
} & CommonProps;

/**
 * Circular Progress Indicator
 * @example
 * Basic
 * <ProgressRadial value={50} />
 * Indeterminate
 * <ProgressRadial indeterminate />
 * Positive / Negative
 * <ProgressRadial status='positive' />
 * <ProgressRadial status='negative' />
 * Centered Content
 * <ProgressRadial value={63}>63</ProgressRadial>
 * Small
 * <ProgressRadial size={'small'} indeterminate/>
 */

export const ProgressRadial: React.FC<ProgressRadialProps> = (props) => {
  const {
    value = 0,
    indeterminate = false,
    status,
    children,
    size = '',
    className,
    style,
  } = props;

  useTheme();

  const statusMap = {
    negative: <Negative />,
    positive: <Positive />,
  };

  const fillStyle: React.CSSProperties = {
    strokeDashoffset:
      status === 'positive'
        ? 0
        : 88 -
          Math.min(88, Math.max(0, indeterminate ? 88 : (88 * value) / 100)),
  };

  return (
    <div
      className={cx('iui-progress-indicator-radial', {
        'iui-determinate': !indeterminate,
        'iui-indeterminate': indeterminate,
        'iui-small': size === 'small',
        [`iui-${status}`]: !!status,
        className,
      })}
      style={style}
    >
      <svg className='iui-radial' viewBox='0 0 32 32' aria-hidden='true'>
        <circle className='iui-track' cx='16' cy='16' r='14' />
        <circle className='iui-fill' cx='16' cy='16' r='14' style={fillStyle} />
      </svg>
      <>
        {status && (
          <span className='iui-inner-content'>{statusMap[status]}</span>
        )}
        {!status && children && (
          <span className='iui-inner-content'>{children}</span>
        )}
      </>
    </div>
  );
};

export default ProgressRadial;
