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
  LabeledInput,
  LabeledTextarea,
} from '@itwin/itwinui-react';
export default () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Button,
      { styleType: 'high-visibility', onClick: () => setIsOpen(true) },
      'Open full page dialog',
    ),
    React.createElement(
      Modal,
      {
        isOpen: isOpen,
        title: 'New message',
        styleType: 'fullPage',
        onClose: () => setIsOpen(false),
      },
      React.createElement(
        ModalContent,
        null,
        React.createElement(LabeledInput, { label: 'Subject' }),
        React.createElement(LabeledTextarea, { label: 'Message' }),
      ),
      React.createElement(
        ModalButtonBar,
        null,
        React.createElement(
          Button,
          { styleType: 'high-visibility', onClick: () => setIsOpen(false) },
          'Submit',
        ),
        React.createElement(
          Button,
          { onClick: () => setIsOpen(false) },
          'Save draft',
        ),
      ),
    ),
  );
};
