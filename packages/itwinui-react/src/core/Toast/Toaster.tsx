/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import * as ReactDOM from 'react-dom';
import { getContainer, getDocument } from '../utils';
import { ToastCategory, ToastProps } from './Toast';
import { ToastWrapper, ToastWrapperHandle } from './ToastWrapper';

const TOASTS_CONTAINER_ID = 'iui-toasts-container';

export type ToasterSettings = {
  /**
   * Order of toasts.
   * When set to 'descending', most recent toasts are on top. When set to 'ascending', most recent toasts are on bottom.

   * When `placement` is set to a top value, order defaults to 'descending', otherwise 'ascending'.
   */
  order?: 'descending' | 'ascending';
  /**
   * Placement of toasts.
   * Changes placement of toasts. Start indicates left side of viewport. End - right side of viewport.
   * @default 'top'
   */
  placement?:
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

export default class Toaster {
  private toasts: ToastProps[] = [];
  private lastId = 0;
  private settings: ToasterSettings = {
    order: 'descending',
    placement: 'top',
  };
  private toastsRef = React.createRef<ToastWrapperHandle>();
  private isInitialized = false;

  // Create container on demand.
  // Cannot do it in constructor, because SSG/SSR apps would fail.
  private asyncInit = async () => {
    if (this.isInitialized) {
      return;
    }

    const container = getContainer(TOASTS_CONTAINER_ID) ?? getDocument()?.body;
    if (!container) {
      return;
    }
    this.isInitialized = true;

    const toastWrapper = <ToastWrapper ref={this.toastsRef} />;

    const _ReactDOM = ReactDOM as any; // eslint-disable-line @typescript-eslint/no-explicit-any

    // v18 mode
    if (_ReactDOM.createRoot) {
      const _ReactDOMInternals =
        _ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

      // suppress warning about importing createRoot from react-dom/client
      if (_ReactDOMInternals) {
        _ReactDOMInternals.usingClientEntryPoint = true;
      }

      const root = _ReactDOM.createRoot(container);
      root.render(toastWrapper);
      // revert suppression, not to influence users app
      if (_ReactDOMInternals) {
        _ReactDOMInternals.usingClientEntryPoint = false;
      }
    } else {
      // v17 and before
      ReactDOM.render(toastWrapper, container);
    }
  };

  /**
   * Set global Toaster settings for toasts order and placement.
   * Settings will be applied to new toasts on the page.
   */
  public setSettings(newSettings: ToasterSettings) {
    newSettings.placement ??= this.settings.placement;
    newSettings.order ??= newSettings.placement?.startsWith('bottom')
      ? 'ascending'
      : 'descending';
    this.settings = newSettings;
    this.asyncInit().then(() => {
      this.toastsRef.current?.setPlacement(this.settings.placement ?? 'top');
    });
  }

  public positive(content: React.ReactNode, options?: ToastOptions) {
    return this.createToast(content, 'positive', options);
  }

  public informational(content: React.ReactNode, options?: ToastOptions) {
    return this.createToast(content, 'informational', options);
  }

  public negative(content: React.ReactNode, options?: ToastOptions) {
    return this.createToast(content, 'negative', options);
  }

  public warning(content: React.ReactNode, options?: ToastOptions) {
    return this.createToast(content, 'warning', options);
  }

  private createToast(
    content: React.ReactNode,
    category: ToastCategory,
    options?: ToastOptions,
  ) {
    ++this.lastId;
    const currentId = this.lastId;
    this.toasts = [
      ...(this.settings.order === 'ascending' ? this.toasts : []),
      {
        ...options,
        content,
        category,
        onRemove: () => {
          this.removeToast(currentId);
          options?.onRemove?.();
        },
        id: currentId,
        isVisible: true,
      },
      ...(this.settings.order === 'descending' ? this.toasts : []),
    ];
    this.updateView();
    return { close: () => this.closeToast(currentId) };
  }

  private removeToast(id: number) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.updateView();
  }

  private updateView() {
    this.asyncInit().then(() => {
      this.toastsRef.current?.setToasts(this.toasts);
    });
  }

  private closeToast(toastId: number): void {
    this.toasts = this.toasts.map((toast) => {
      return {
        ...toast,
        isVisible: toast.id !== toastId,
      };
    });
    this.updateView();
  }

  public closeAll(): void {
    this.toasts = this.toasts.map((toast) => {
      return {
        ...toast,
        isVisible: false,
      };
    });
    this.updateView();
  }
}
