// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/modal.css';

/**
 * Container for Buttons in modal.
 */
export const ModalButtonBar: React.FC = ({ children }) => {
  useTheme();
  return <div className='iui-modal-button-bar'>{children}</div>;
};
