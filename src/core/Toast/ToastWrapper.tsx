/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import '@itwin/itwinui-css/css/toast-notification.css';
import React from 'react';
import Toast, { ToastProps } from './Toast';

type ToastWrapperProps = {
  toasts: ToastProps[];
};

export const ToastWrapper = (props: ToastWrapperProps) => {
  const { toasts } = props;

  return (
    <span className='iui-toast-wrapper'>
      {toasts.map((toastProps) => {
        return <Toast key={toastProps.id} {...toastProps} />;
      })}
    </span>
  );
};
