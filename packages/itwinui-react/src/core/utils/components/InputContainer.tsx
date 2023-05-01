/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import '@itwin/itwinui-css/css/utils.css';

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
} & React.ComponentPropsWithoutRef<T>;

/**
 * Input container to wrap inputs with label, and add optional message and icon.
 * @private
 */
export const InputContainer = <T extends React.ElementType = 'div'>(
  props: InputContainerProps<T>,
) => {
  const {
    as: Element = 'div',
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
    ...rest
  } = props;

  const LabelElement = inputId && Element !== 'label' ? 'label' : 'div';

  return (
    <Element
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
        <LabelElement
          className={cx('iui-label', {
            'iui-required': required,
          })}
          htmlFor={inputId}
        >
          {label}
        </LabelElement>
      )}
      {children}
      {statusMessage ? (
        statusMessage
      ) : (
        <>
          {icon &&
            React.cloneElement(icon, {
              className: cx('iui-input-icon', icon.props?.className),
            })}
          {message && !isLabelInline && (
            <div className='iui-message'>{message}</div>
          )}
        </>
      )}
    </Element>
  );
};
