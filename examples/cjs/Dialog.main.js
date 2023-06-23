/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { Dialog, Button } from '@itwin/itwinui-react';
export default () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Button,
      { styleType: 'high-visibility', onClick: () => setIsOpen(true) },
      'Open dialog',
    ),
    React.createElement(
      Dialog,
      {
        isOpen: isOpen,
        onClose: () => setIsOpen(false),
        closeOnEsc: true,
        closeOnExternalClick: true,
        preventDocumentScroll: true,
        trapFocus: true,
        setFocus: true,
        isDismissible: true,
        portal: true,
      },
      React.createElement(Dialog.Backdrop, null),
      React.createElement(
        Dialog.Main,
        null,
        React.createElement(Dialog.TitleBar, { titleText: 'Dialog' }),
        React.createElement(
          Dialog.Content,
          null,
          'A dialog informs users about a task and can contain critical information, require decisions, or involve multiple tasks. Dialogs appear in front of app content to provide critical information or ask for a decision.',
        ),
        React.createElement(
          Dialog.ButtonBar,
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
    ),
  );
};
