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
      <Button styleType='high-visibility' onClick={dialog.show}>
        Open non-dismissible dialog
      </Button>
      <Dialog instance={dialog} setFocus={false} isDismissible={false} portal>
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar titleText='Empty trash' />
          <Dialog.Content>
            Are you sure you want to permanently erase the items in the trash?
            You can't undo this action.
          </Dialog.Content>
          <Dialog.ButtonBar>
            <Button styleType='high-visibility' onClick={() => dialog.close()}>
              Empty trash
            </Button>
            <Button onClick={() => dialog.close()}>Cancel</Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
    </>
  );
};
