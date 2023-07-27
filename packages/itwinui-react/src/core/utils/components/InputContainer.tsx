/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box } from './Box.js';
import { Label } from '../../Label/index.js';
import { StatusMessage } from '../../StatusMessage/index.js';

export type InputContainerProps<T extends React.ElementType = 'div'> = {
  as?: T;
  label?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  status?: 'positive' | 'warning' | 'negative';
  message?: React.ReactNode;
  icon?: JSX.Element;
  isLabelInline?: boolean;
  isIconInline?: boolean;
  statusMessage?: React.ReactNode;
  inputId?: string;
  labelId?: string;
} & React.ComponentPropsWithoutRef<T>;

/**
 * Input container to wrap inputs with label, and add optional message and icon.
 * @private
 */
export const InputContainer = <T extends React.ElementType = 'div'>(
  props: InputContainerProps<T>,
) => {
  const {
    label,
    disabled,
    required,
    status,
    message,
    icon,
    isLabelInline,
    isIconInline,
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
      className={cx(
        'iui-input-container',
        {
          'iui-disabled': disabled,
          'iui-inline-label': isLabelInline,
          'iui-inline-icon': isIconInline,
          'iui-with-message':
            (!!message || !!icon || !!statusMessage) && !isLabelInline,
        },
        className,
      )}
      data-iui-status={status}
      style={style}
      {...rest}
    >
      {label && (
        <Label
          as={inputId && props.as !== 'label' ? 'label' : 'div'}
          required={required}
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
};
