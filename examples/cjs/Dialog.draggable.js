/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Dialog,
  Button,
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
      'Open draggable dialog',
    ),
    React.createElement(
      Dialog,
      {
        isOpen: isOpen,
        onClose: () => setIsOpen(false),
        setFocus: false,
        closeOnEsc: true,
        isDismissible: true,
        isDraggable: true,
        isResizable: true,
        portal: true,
      },
      React.createElement(
        Dialog.Main,
        null,
        React.createElement(Dialog.TitleBar, { titleText: 'New message' }),
        React.createElement(
          Dialog.Content,
          null,
          React.createElement(LabeledInput, { label: 'Subject' }),
          React.createElement(LabeledTextarea, { label: 'Message' }),
        ),
        React.createElement(
          Dialog.ButtonBar,
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
    ),
  );
};
