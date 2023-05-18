/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import {
  useGlobals,
  SvgCheckmarkSmall,
  SvgImportantSmall,
  Box,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import '@itwin/itwinui-css/css/progress-indicator.css';

type ProgressRadialProps = {
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
   * Size of the progress indicator. Defaults to medium size.
   * @default ''
   */
  size?: '' | 'x-small' | 'small' | 'large';
  /**
   * Content shown inside progress indicator.
   */
  children?: React.ReactNode;
};

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

export const ProgressRadial = React.forwardRef((props, forwardedRef) => {
  const {
    value = 0,
    indeterminate = false,
    status,
    children,
    size = '',
    className,
    ...rest
  } = props;

  useGlobals();

  const statusMap = {
    negative: <SvgImportantSmall aria-hidden />,
    positive: <SvgCheckmarkSmall aria-hidden />,
  };

  const fillStyle: React.CSSProperties = {
    strokeDashoffset:
      status === 'positive'
        ? 0
        : 88 -
          Math.min(88, Math.max(0, indeterminate ? 88 : (88 * value) / 100)),
  };

  return (
    <Box
      className={cx(
        'iui-progress-indicator-radial',
        {
          'iui-determinate': !indeterminate,
          'iui-indeterminate': indeterminate,
          [`iui-${size}`]: !!size,
          [`iui-${status}`]: !!status,
        },
        className,
      )}
      ref={forwardedRef}
      {...rest}
    >
      <Box
        as='svg'
        className='iui-radial'
        viewBox='0 0 32 32'
        aria-hidden='true'
      >
        <Box as='circle' className='iui-track' cx='16' cy='16' r='14' />
        <Box
          as='circle'
          className='iui-fill'
          cx='16'
          cy='16'
          r='14'
          style={fillStyle}
        />
      </Box>
      <>
        {status && (
          <Box as='span' className='iui-inner-content'>
            {statusMap[status]}
          </Box>
        )}
        {!status && children && (
          <Box as='span' className='iui-inner-content'>
            {children}
          </Box>
        )}
      </>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', ProgressRadialProps>;

export default ProgressRadial;
