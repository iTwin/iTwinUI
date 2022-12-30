/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, ModalContent, ModalButtonBar, Dialog } from '@itwin/itwinui-react';

export default () => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Dialog.Main
        isOpen={isModalOpen}
        onClose={() => closeModal()}
        style={{
          position: 'static',
          transform: 'none',
          maxWidth: '400px',
          minWidth: 0,
        }}
        trapFocus={false}
      >
        <Dialog.TitleBar isDismissible>Dialog</Dialog.TitleBar>
        <ModalContent>
          A dialog informs users about a task and can contain critical information, require
          decisions, or involve multiple tasks. Dialogs appear in front of app content to provide
          critical information or ask for a decision.
        </ModalContent>
        <ModalButtonBar>
          <Button styleType='high-visibility' onClick={() => closeModal()}>
            Primary
          </Button>
          <Button onClick={() => closeModal()}>Secondary</Button>
        </ModalButtonBar>
      </Dialog.Main>
    </>
  );
};
