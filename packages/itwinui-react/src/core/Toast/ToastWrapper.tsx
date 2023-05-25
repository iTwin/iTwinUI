/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import '@itwin/itwinui-css/css/toast.css';
import * as React from 'react';
import cx from 'classnames';
import Toast from './Toast.js';
import type { ToastProps } from './Toast.js';
import type { ToasterSettings } from './Toaster.js';
import { Box } from '../utils/index.js';

type ToastPlacement = NonNullable<ToasterSettings['placement']>;

export type ToastWrapperHandle = {
  setToasts: (toasts: ToastProps[]) => void;
  setPlacement: (placement: ToastPlacement) => void;
};

export const ToastWrapper = React.forwardRef<ToastWrapperHandle>((_, ref) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);
  const [placement, setPlacement] = React.useState<ToastPlacement>('top');
  const placementPosition = placement.startsWith('top') ? 'top' : 'bottom';

  React.useImperativeHandle(
    ref,
    () => ({
      setToasts,
      setPlacement,
    }),
    [],
  );

  return (
    <Box className={cx(`iui-toast-wrapper`, `iui-placement-${placement}`)}>
      {toasts.map((toastProps) => {
        return (
          <Toast
            key={toastProps.id}
            placementPosition={placementPosition}
            {...toastProps}
          />
        );
      })}
    </Box>
  );
});
