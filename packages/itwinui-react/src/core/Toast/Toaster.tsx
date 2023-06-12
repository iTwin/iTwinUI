/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box, useSafeContext } from '../utils/index.js';
import { Toast } from './Toast.js';
import type { ToastCategory, ToastProps } from './Toast.js';

export type ToasterSettings = {
  /**
   * Order of toasts.
   * When set to 'descending', most recent toasts are on top. When set to 'ascending', most recent toasts are on bottom.

   * When `placement` is set to a top value, order defaults to 'descending', otherwise 'ascending'.
   */
  order: 'descending' | 'ascending';
  /**
   * Placement of toasts.
   * Changes placement of toasts. Start indicates left side of viewport. End - right side of viewport.
   * @default 'top'
   */
  placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end';
};

export type ToastOptions = Omit<
  ToastProps,
  'category' | 'isVisible' | 'id' | 'content' | 'placementPosition'
>;

// ----------------------------------------------------------------------------

export const useToaster = () => {
  const dispatch = useSafeContext(ToastDispatchContext);

  const showToast = React.useCallback(
    (category: ToastCategory) =>
      (content: React.ReactNode, options?: ToastOptions) => {
        const id = nextId();

        dispatch({
          type: 'add',
          toast: { ...options, id, content, category },
        });

        return { close: () => dispatch({ type: 'remove', id }) };
      },
    [dispatch],
  );

  return {
    positive: showToast('positive'),
    informational: showToast('informational'),
    negative: showToast('negative'),
    warning: showToast('warning'),
    closeAll: () => {
      dispatch({ type: 'close-all' });
    },
    setSettings: (settings: Partial<ToasterSettings>) => {
      dispatch({ type: 'settings', settings });
    },
  };
};

// ----------------------------------------------------------------------------

export const Toaster = () => {
  const { toasts, placement } = useSafeContext(ToastStateContext);

  return (
    <Box className={cx(`iui-toast-wrapper`, `iui-placement-${placement}`)}>
      {toasts.map((toastProps) => {
        return <Toast key={toastProps.id} {...toastProps} />;
      })}
    </Box>
  );
};

// ----------------------------------------------------------------------------

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasterState, dispatch] = React.useReducer(toastReducer, {
    toasts: [],
    placement: 'top',
    settings: {
      order: 'descending',
      placement: 'top',
    },
  });

  return (
    <ToastDispatchContext.Provider value={dispatch}>
      <ToastStateContext.Provider value={toasterState}>
        {children}
      </ToastStateContext.Provider>
    </ToastDispatchContext.Provider>
  );
};

const toastReducer = (state: ToasterState, action: ToasterAction) => {
  if (action.type === 'add') {
    return {
      ...state,
      toasts: [
        ...(state.settings.order === 'ascending' ? state.toasts : []),
        action.toast,
        ...(state.settings.order === 'descending' ? state.toasts : []),
      ],
    };
  }

  if (action.type === 'remove') {
    return {
      ...state,
      toasts: state.toasts.filter((toast) => toast.id !== action.id),
    };
  }

  if (action.type === 'close-all') {
    return {
      ...state,
      toasts: state.toasts.map((toast) => ({ ...toast, isVisible: false })),
    };
  }

  if (action.type === 'settings') {
    return {
      ...state,
      settings: { ...state.settings, ...action.settings },
      placement: action.settings.placement ?? state.placement,
    };
  }

  return state;
};

// ----------------------------------------------------------------------------

export const ToastStateContext = React.createContext<ToasterState | undefined>(
  undefined,
);
ToastStateContext.displayName = 'ToastStateContext';

type ToasterState = {
  toasts: ToastProps[];
  placement: ToasterSettings['placement'];
  settings: ToasterSettings;
};

// ----------------------------------------------------------------------------

const ToastDispatchContext = React.createContext<
  React.Dispatch<ToasterAction> | undefined
>(undefined);
ToastDispatchContext.displayName = 'ToastDispatchContext';

type ToasterAction =
  | { type: 'add'; toast: ToastProps }
  | { type: 'remove'; id: number }
  | { type: 'close-all' }
  | { type: 'settings'; settings: Partial<ToasterSettings> };

// ----------------------------------------------------------------------------

const nextId = (() => {
  let count = 0;
  return () => ++count;
})();
