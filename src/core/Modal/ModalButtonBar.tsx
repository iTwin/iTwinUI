/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useTheme } from '../utils';
import '@itwin/itwinui-css/css/modal.css';

export type ModalButtonBarProps = {
  /**
   * Buttons in the modal bar.
   */
  children: React.ReactNode;
};

/**
 * Container for Buttons in modal.
 */
export const ModalButtonBar = (props: ModalButtonBarProps) => {
  const { children, ...rest } = props;

  useTheme();
  return (
    <div className='iui-button-bar' {...rest}>
      {children}
    </div>
  );
};

export default ModalButtonBar;
