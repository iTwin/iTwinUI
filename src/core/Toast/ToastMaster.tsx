/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import '@bentley/itwinui/css/toast-notification.css';
import React from 'react';
import Toast, { ToastProps } from './Toast';

export type ToastSettings = Omit<ToastProps, 'isVisible' | 'id'>;

type ToastMasterProps = {
  addToastHandler: (addToast: (settings: ToastSettings) => void) => void;
  closeAllHandler: (closeAll: () => void) => void;
};

export const ToastMaster = ({
  addToastHandler,
  closeAllHandler,
}: ToastMasterProps) => {
  const idCounter = React.useRef<number>(0);
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = (settings: ToastSettings) => {
    const instance = createToastInstance(settings);

    setToasts([instance, ...toasts]);
    return instance;
  };

  const createToastInstance = (settings: ToastSettings) => {
    const uid = ++idCounter.current;

    return {
      ...settings,
      id: uid,
      isVisible: true,
    };
  };

  const removeToast = (id: number) => {
    setToasts(toasts.filter((toast) => toast.id !== id));
  };

  const closeAll = () => {
    setToasts(
      toasts.map((toast) => {
        return {
          ...toast,
          isVisible: false,
        };
      }),
    );
  };

  React.useEffect(() => {
    addToastHandler(addToast);
    closeAllHandler(closeAll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toasts]);

  return (
    <span className='iui-toast-wrapper'>
      {toasts.map((toastProps) => {
        return (
          <Toast
            key={toastProps.id}
            onRemove={() => {
              removeToast(toastProps.id);
              toastProps.onRemove && toastProps.onRemove();
            }}
            {...toastProps}
          />
        );
      })}
    </span>
  );
};
