/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import '@itwin/itwinui-css/css/toast-notification.css';
import React from 'react';
import cx from 'classnames';
import Toast, { ToastProps } from './Toast';
import { ToasterSettings } from './Toaster';

type ToastWrapperProps = {
  toasts: ToastProps[];
} & Pick<ToasterSettings, 'placement'>;

export const ToastWrapper = (props: ToastWrapperProps) => {
  const { toasts, placement = 'top' } = props;
  const placementPosition = placement.startsWith('top') ? 'top' : 'bottom';

  return (
    <span className={cx(`iui-toast-wrapper`, `iui-placement-${placement}`)}>
      {toasts.map((toastProps) => {
        return (
          <Toast
            key={toastProps.id}
            placementPosition={placementPosition}
            {...toastProps}
          />
        );
      })}
    </span>
  );
};
