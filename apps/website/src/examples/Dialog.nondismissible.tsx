/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Dialog, Button } from '@itwin/itwinui-react';

export default () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsDialogOpen(true)}>
        Open non-dismissible dialog
      </Button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => closeDialog()}
        setFocus={false}
        isDismissible={false}
      >
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar titleText='Empty trash' />
          <Dialog.Content>
            Are you sure you want to permanently erase the items in the trash? You can't undo this
            action.
          </Dialog.Content>
          <Dialog.ButtonBar>
            <Button styleType='high-visibility' onClick={() => closeDialog()}>
              Empty trash
            </Button>
            <Button onClick={() => closeDialog()}>Cancel</Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
    </>
  );
};
