// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import '@bentley/itwinui/css/modal.css';
import { useTheme } from '../utils/hooks/useTheme';

/**
 * Container for Buttons in modal.
 */
export const ModalButtonBar: React.FC = ({ children }) => {
  useTheme();
  return <div className='iui-modal-button-bar'>{children}</div>;
};
