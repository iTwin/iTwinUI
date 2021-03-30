/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import ReactDOM from 'react-dom';
import { ToastCategory, ToastProps } from './Toast';
import { ToastSettings, ToastMaster } from './ToastMaster';

export type ToastOptions = Omit<
  ToastProps,
  'category' | 'isVisible' | 'id' | 'content'
>;

export default class Toaster {
  private addToast: (settings: ToastSettings) => void;
  private closeAllHandler: () => void;

  constructor() {
    this._addHandler = this._addHandler.bind(this);
    this._closeAllHandler = this._closeAllHandler.bind(this);

    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(
      <ToastMaster
        addToastHandler={this._addHandler}
        closeAllHandler={this._closeAllHandler}
      />,
      container,
    );
  }

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
    this.addToast({
      ...settings,
      content,
      category,
    });
  }

  public closeAll(): void {
    this.closeAllHandler();
  }

  private _addHandler(addHandler: (settings: ToastSettings) => void) {
    this.addToast = addHandler;
  }

  private _closeAllHandler(closeAll: () => void) {
    this.closeAllHandler = closeAll;
  }
}
