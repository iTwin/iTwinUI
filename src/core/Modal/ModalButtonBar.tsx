import React from 'react';
import '@bentley/itwinui/css/modal.css';

/**
 * Container for Buttons in modal.
 */
export const ModalButtonBar: React.FC = ({ children }) => {
  return <div className='iui-modal-button-bar'>{children}</div>;
};
