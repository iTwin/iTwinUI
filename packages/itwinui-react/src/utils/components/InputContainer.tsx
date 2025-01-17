/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { JSX } from 'react';
import cx from 'classnames';
import { Box } from './Box.js';
import { Label } from '../../core/Label/Label.js';
import { StatusMessage } from '../../core/StatusMessage/StatusMessage.js';
import type { PolymorphicForwardRefComponent } from '../props.js';

export type InputContainerProps = {
  label?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  status?: 'positive' | 'warning' | 'negative';
  message?: React.ReactNode;
  icon?: JSX.Element;
  isLabelInline?: boolean;
  statusMessage?: React.ReactNode;
  inputId?: string;
  labelId?: string;
};

/**
 * Input container to wrap inputs with label, and add optional message and icon.
 * @private
 */
export const InputContainer = React.forwardRef((props, forwardedRef) => {
  const {
    label,
    disabled,
    required,
    status,
    message,
    icon,
    isLabelInline,
    children,
    className,
    style,
    statusMessage,
    inputId,
    labelId,
    ...rest
  } = props;

  return (
    <Box
      className={cx('iui-input-grid', className)}
      data-iui-status={status}
      data-iui-label-placement={isLabelInline ? 'inline' : undefined}
      style={style}
      ref={forwardedRef}
      {...rest}
    >
      {label && (
        <Label
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          as={inputId && props.as !== 'label' ? 'label' : 'div'}
          required={required}
          disabled={disabled}
          htmlFor={inputId}
          id={labelId}
        >
          {label}
        </Label>
      )}
      {children}
      {statusMessage
        ? statusMessage
        : message && (
            <StatusMessage startIcon={icon} status={status}>
              {message}
            </StatusMessage>
          )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', InputContainerProps>;
