/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box, ShadowRoot, getBoundedValue } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.js';

type ProgressLinearProps = {
  /**
   * Progress percentage. Should be a number between 0 and 100.
   */
  value?: number;
  /**
   * Progress variant. If true, `value` will be ignored.
   *
   * Defaults to false if `value` is passed, otherwise true.
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
  status?: 'positive' | 'negative' | 'warning';
  /**
   * Pass props to ProgressLinear label group.
   */
  labelGroupProps?: React.ComponentProps<'div'>;
};

/**
 * Shows progress on a linear bar
 * @example
 * // Determinate
 * <ProgressLinear value={25}/>
 * // Indeterminate
 * <ProgressLinear indeterminate={true}/>
 * // Labeled - Center
 * <ProgressLinear value={50} labels={['Centered Label']} />
 * // Labeled - Left & Right
 * <ProgressLinear value={50} labels={['Loading...', '50%']} />
 * // Status
 * <ProgressLinear
 *   status='positive'
 *   labels={[
 *    'Upload done!',
 *    <Icon key='icon'>
 *      <SvgStatusSuccess />{' '}
 *    </Icon>
 *   ]}
 * />
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
      {...rest}
      style={
        {
          '--iui-progress-percentage': `${boundedValue}%`,
          ...props.style,
        } as React.CSSProperties
      }
    >
      <ShadowRoot>
        {value !== 100 && <VisuallyHidden>Loading.</VisuallyHidden>}
        <slot />
      </ShadowRoot>

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
if (process.env.NODE_ENV === 'development') {
  ProgressLinear.displayName = 'ProgressLinear';
}
