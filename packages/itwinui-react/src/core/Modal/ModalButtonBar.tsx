/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { CommonProps } from '../utils/index.js';
import { DialogButtonBar } from '../Dialog/DialogButtonBar.js';

export type ModalButtonBarProps = {
  /**
   * Buttons in the modal bar.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * Container for Buttons in modal.
 */
export const ModalButtonBar = (props: ModalButtonBarProps) => (
  <DialogButtonBar {...props} />
);

export default ModalButtonBar;
