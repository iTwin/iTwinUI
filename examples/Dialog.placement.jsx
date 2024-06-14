/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Dialog, Button } from '@itwin/itwinui-react';

export default () => {
  const dialog = Dialog.useInstance();

  return (
    <>
      <Button styleType='high-visibility' onClick={() => dialog.show()}>
        Open dialog
      </Button>
      <Dialog
        instance={dialog}
        closeOnExternalClick
        preventDocumentScroll
        trapFocus
        setFocus
        portal
        placement='top-left'
      >
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar titleText='Dialog' />
          <Dialog.Content></Dialog.Content>
          <Dialog.ButtonBar>
            <Button styleType='high-visibility' onClick={() => dialog.close()}>
              Primary
            </Button>
            <Button onClick={() => dialog.close()}>Secondary</Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
    </>
  );
};
