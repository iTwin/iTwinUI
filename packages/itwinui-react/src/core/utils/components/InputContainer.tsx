/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import '@itwin/itwinui-css/css/utils.css';
import { Box } from './Box.js';

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
          [`iui-${status}`]: !!status,
          'iui-inline-label': isLabelInline,
          'iui-inline-icon': isIconInline,
          'iui-with-message':
            (!!message || !!icon || !!statusMessage) && !isLabelInline,
        },
        className,
      )}
      style={style}
      {...rest}
    >
      {label && (
        <Box
          as={inputId && props.as !== 'label' ? 'label' : 'div'}
          className={cx('iui-label', {
            'iui-required': required,
          })}
          htmlFor={inputId}
          id={labelId}
        >
          {label}
        </Box>
      )}
      {children}
      {statusMessage ? (
        statusMessage
      ) : (
        <>
          {icon && (
            <Box as='span' className='iui-input-icon' aria-hidden>
              {icon}
            </Box>
          )}
          {message && !isLabelInline && (
            <Box className='iui-message'>{message}</Box>
          )}
        </>
      )}
    </Box>
  );
};
