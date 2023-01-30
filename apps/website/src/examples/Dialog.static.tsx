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
      <Dialog.Main
        isOpen={isDialogOpen}
        onClose={() => closeDialog()}
        style={{
          position: 'static',
          transform: 'none',
          maxWidth: '400px',
          minWidth: 0,
        }}
        trapFocus={false}
        setFocus={false}
      >
        <Dialog.TitleBar titleText='Dialog' />
        <Dialog.Content>
          A dialog informs users about a task and can contain critical information, require
          decisions, or involve multiple tasks. Dialogs appear in front of app content to provide
          critical information or ask for a decision.
        </Dialog.Content>
        <Dialog.ButtonBar>
          <Button styleType='high-visibility' onClick={() => closeDialog()}>
            Primary
          </Button>
          <Button onClick={() => closeDialog()}>Secondary</Button>
        </Dialog.ButtonBar>
      </Dialog.Main>
    </>
  );
};
