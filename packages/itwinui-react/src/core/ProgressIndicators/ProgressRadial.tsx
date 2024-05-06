/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import {
  SvgCheckmarkSmall,
  SvgImportantSmall,
  Box,
  getBoundedValue,
  ShadowRoot,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.js';

type ProgressRadialProps = {
  /**
   * Progress percentage. Should be a number between 0 and 100.
   */
  value?: number;
  /**
   * Progress variant. If true, value will be ignored.
   *
   * @default false if value is provided, true otherwise
   */
  indeterminate?: boolean;
  /**
   * Status of Progress. Positive status always has 100% value.
   */
  status?: 'positive' | 'negative' | 'warning';
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
 * // Positive / Negative / Warning
 * <ProgressRadial status='positive' />
 * <ProgressRadial status='negative' />
 * <ProgressRadial status='warning' />
 * Centered Content
 * <ProgressRadial value={63}>63</ProgressRadial>
 * Small
 * <ProgressRadial size={'small'} indeterminate/>
 */
export const ProgressRadial = React.forwardRef((props, forwardedRef) => {
  const {
    value,
    indeterminate = value === undefined,
    status,
    size,
    className,
    style,
    children,
    ...rest
  } = props;

  const statusMap = {
    negative: <SvgImportantSmall aria-hidden />,
    positive: <SvgCheckmarkSmall aria-hidden />,
    warning: <SvgImportantSmall aria-hidden />,
  };

  return (
    <Box
      className={cx('iui-progress-indicator-radial', className)}
      data-iui-size={size}
      data-iui-status={status}
      data-iui-indeterminate={indeterminate ? 'true' : undefined}
      ref={forwardedRef}
      style={{
        ...(value !== undefined && {
          '--iui-progress-percentage': `${getBoundedValue(value, 0, 100)}%`,
        }),
        ...style,
      }}
      {...rest}
    >
      <ShadowRoot>
        {value !== 100 && <VisuallyHidden>Loading.</VisuallyHidden>}
        <slot />
      </ShadowRoot>

      {size !== 'x-small'
        ? children ?? (!!status ? statusMap[status] : null)
        : null}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', ProgressRadialProps>;
