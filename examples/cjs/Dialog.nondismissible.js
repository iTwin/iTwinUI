/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Dialog, Button } from '@itwin/itwinui-react';
export default () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Button,
      { styleType: 'high-visibility', onClick: () => setIsOpen(true) },
      'Open non-dismissible dialog',
    ),
    React.createElement(
      Dialog,
      {
        isOpen: isOpen,
        onClose: () => setIsOpen(false),
        setFocus: false,
        isDismissible: false,
        portal: true,
      },
      React.createElement(Dialog.Backdrop, null),
      React.createElement(
        Dialog.Main,
        null,
        React.createElement(Dialog.TitleBar, { titleText: 'Empty trash' }),
        React.createElement(
          Dialog.Content,
          null,
          "Are you sure you want to permanently erase the items in the trash? You can't undo this action.",
        ),
        React.createElement(
          Dialog.ButtonBar,
          null,
          React.createElement(
            Button,
            { styleType: 'high-visibility', onClick: () => setIsOpen(false) },
            'Empty trash',
          ),
          React.createElement(
            Button,
            { onClick: () => setIsOpen(false) },
            'Cancel',
          ),
        ),
      ),
    ),
  );
};
