/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box, useSafeContext } from '../../utils/index.js';
import { Toast } from './Toast.js';
import type { ToastCategory, ToastProps } from './Toast.js';

export type ToasterSettings = {
  /**
   * Order of toasts.
   * When set to 'descending', most recent toasts are on top. When set to 'ascending', most recent toasts are on bottom.
   *
   * When set to `auto`, it will behave like 'descending' when `placement` is set to a top value, otherwise 'ascending'.
   *
   * @default 'auto'
   */
  order: 'descending' | 'ascending' | 'auto';
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
  'category' | 'isVisible' | 'id' | 'content'
>;

// ----------------------------------------------------------------------------

export const useToaster = () => {
  const dispatch = useSafeContext(ToasterDispatchContext);

  return React.useMemo(() => {
    const showToast =
      (category: ToastCategory) =>
      (content: React.ReactNode, options?: ToastOptions) => {
        const id = nextId();

        dispatch({
          type: 'add',
          toast: { ...options, id, content, category },
        });

        return { close: () => dispatch({ type: 'remove', id }) };
      };

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
  }, [dispatch]);
};

// ----------------------------------------------------------------------------

export const Toaster = () => {
  const { toasts, settings } = useSafeContext(ToasterStateContext);

  return (
    <Box
      className={cx(`iui-toast-wrapper`, `iui-placement-${settings.placement}`)}
    >
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
    settings: {
      order: 'auto',
      placement: 'top',
    },
  });

  return (
    <ToasterDispatchContext.Provider value={dispatch}>
      <ToasterStateContext.Provider value={toasterState}>
        {children}
      </ToasterStateContext.Provider>
    </ToasterDispatchContext.Provider>
  );
};

const toastReducer = (state: ToasterState, action: ToasterAction) => {
  if (action.type === 'add') {
    let order = state.settings.order;
    if (order === 'auto') {
      order = state.settings.placement.startsWith('top')
        ? 'descending'
        : 'ascending';
    }

    return {
      ...state,
      toasts: [
        ...(order === 'ascending' ? state.toasts : []),
        action.toast,
        ...(order === 'descending' ? state.toasts : []),
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
    return { ...state, settings: { ...state.settings, ...action.settings } };
  }

  return state;
};

// ----------------------------------------------------------------------------

export const ToasterStateContext = React.createContext<
  ToasterState | undefined
>(undefined);
ToasterStateContext.displayName = 'ToasterStateContext';

type ToasterState = { toasts: ToastProps[]; settings: ToasterSettings };

// ----------------------------------------------------------------------------

const ToasterDispatchContext = React.createContext<
  React.Dispatch<ToasterAction> | undefined
>(undefined);
ToasterDispatchContext.displayName = 'ToasterDispatchContext';

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
