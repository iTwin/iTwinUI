/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';
import { getContainer } from '../utils/common';
import { ToastCategory, ToastProps } from './Toast';
import { ToastWrapper } from './ToastWrapper';

const TOASTS_CONTAINER_ID = 'iui-toasts-container';

export type ToastOptions = Omit<
  ToastProps,
  'category' | 'isVisible' | 'id' | 'content'
>;

export default class Toaster {
  private toasts: ToastProps[] = [];
  private lastId = 0;

  public positive(content: React.ReactNode, settings?: ToastOptions): void {
    this.createToast(content, 'positive', settings);
  }

  public informational(
    content: React.ReactNode,
    settings?: ToastOptions,
  ): void {
    this.createToast(content, 'informational', settings);
  }

  public negative(content: React.ReactNode, settings?: ToastOptions): void {
    this.createToast(content, 'negative', settings);
  }

  private createToast(
    content: React.ReactNode,
    category: ToastCategory,
    settings?: ToastOptions,
  ) {
    ++this.lastId;
    const currentId = this.lastId;
    this.toasts = [
      {
        ...settings,
        content,
        category,
        onRemove: () => {
          this.removeToast(currentId);
          settings?.onRemove?.();
        },
        id: currentId,
        isVisible: true,
      },
      ...this.toasts,
    ];

    this.updateView();
  }

  private removeToast(id: number) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.updateView();
  }

  private updateView() {
    const container = getContainer(TOASTS_CONTAINER_ID);
    if (!container) {
      return;
    }

    ReactDOM.render(<ToastWrapper toasts={this.toasts} />, container);
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
