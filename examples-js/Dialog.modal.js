/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Modal,
  Button,
  ModalContent,
  ModalButtonBar,
} from '@itwin/itwinui-react';
export default () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { style: { display: 'flex', gap: '0.5rem' } },
      React.createElement(
        Button,
        { styleType: 'high-visibility', onClick: () => setIsOpen(true) },
        'Open modal dialog',
      ),
    ),
    React.createElement(
      Modal,
      { isOpen: isOpen, title: 'Modal', onClose: () => setIsOpen(false) },
      React.createElement(
        ModalContent,
        null,
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      ),
      React.createElement(
        ModalButtonBar,
        null,
        React.createElement(
          Button,
          { styleType: 'high-visibility', onClick: () => setIsOpen(false) },
          'Primary',
        ),
        React.createElement(
          Button,
          { onClick: () => setIsOpen(false) },
          'Secondary',
        ),
      ),
    ),
  );
};
