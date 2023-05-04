/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { CommonProps } from '../utils/index.js';
import { DialogContent } from '../Dialog/DialogContent.js';

export type ModalContentProps = {
  /**
   * Main content in the `Modal`.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * Container for content in `Modal`.
 */
export const ModalContent = (props: ModalContentProps) => (
  <DialogContent {...props} />
);

export default ModalContent;
