/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, ModalContent, ModalButtonBar, ThemeProvider, Dialog } from '@itwin/itwinui-react';

export default () => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const closeModal = () => {
    setIsModalOpen(false);
    window.setTimeout(() => {
      setIsModalOpen(true); // bring it back so the user can play with it again
    }, 2500);
  };

  return (
    <ThemeProvider theme='dark' style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Dialog relativeTo='container' isOpen={isModalOpen} onClose={() => closeModal()}>
        <Dialog.Main
          trapFocus={false}
          style={{
            width: '80%',
            minWidth: '80%',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Dialog.TitleBar titleText='Listen' />
          <ModalContent>
            A dialog informs users about a task and can contain critical information, require
            decisions, or involve multiple tasks.
          </ModalContent>
          <ModalButtonBar>
            <Button styleType='high-visibility' onClick={() => closeModal()}>
              Sounds good
            </Button>
          </ModalButtonBar>
        </Dialog.Main>
      </Dialog>
    </ThemeProvider>
  );
};
