// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/modal.css';

export type ModalButtonBarProps = {
  /**
   * Buttons in the modal bar.
   */
  children: React.ReactNode;
};

/**
 * Container for Buttons in modal.
 */
export const ModalButtonBar = ({ children }: ModalButtonBarProps) => {
  useTheme();
  return <div className='iui-modal-button-bar'>{children}</div>;
};

export default ModalButtonBar;
