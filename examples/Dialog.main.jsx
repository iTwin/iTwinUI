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
      >
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar titleText='Dialog' />
          <Dialog.Content>
            A dialog informs users about a task and can contain critical
            information, require decisions, or involve multiple tasks. Dialogs
            appear in front of app content to provide critical information or
            ask for a decision.
          </Dialog.Content>
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
