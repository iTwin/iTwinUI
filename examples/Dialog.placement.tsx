/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { Dialog, Button } from '@itwin/itwinui-react';

export default () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsOpen(true)}>
        Open dialog
      </Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnEsc
        closeOnExternalClick
        preventDocumentScroll
        trapFocus
        setFocus
        isDismissible
        portal
        placement='top-left'
      >
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar titleText='Dialog' />
          <Dialog.Content></Dialog.Content>
          <Dialog.ButtonBar>
            <Button
              styleType='high-visibility'
              onClick={() => setIsOpen(false)}
            >
              Primary
            </Button>
            <Button onClick={() => setIsOpen(false)}>Secondary</Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
    </>
  );
};
