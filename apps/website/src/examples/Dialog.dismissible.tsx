/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Dialog, Button, LabeledInput, LabeledTextarea } from '@itwin/itwinui-react';

export default () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsDialogOpen(true)}>
        Open dismissible dialog
      </Button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => closeDialog()}
        setFocus={false}
        closeOnEsc
        closeOnExternalClick
        isDismissible
      >
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar titleText='New message' />
          <Dialog.Content>
            <LabeledInput label='Subject' />
            <LabeledTextarea label='Message' />
          </Dialog.Content>
          <Dialog.ButtonBar>
            <Button styleType='high-visibility' onClick={() => closeDialog()}>
              Submit
            </Button>
            <Button onClick={() => closeDialog()}>Save draft</Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
    </>
  );
};
