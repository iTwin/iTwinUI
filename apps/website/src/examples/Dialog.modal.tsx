/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Modal, Button, ModalContent, ModalButtonBar, Dialog } from '@itwin/itwinui-react';

export default () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const closeModal = () => setIsModalOpen(false);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsModalOpen(true)}>
        Open modal
      </Button>
      <Button styleType='high-visibility' onClick={() => setIsDialogOpen(true)}>
        Open dialog
      </Button>

      <Modal isOpen={isModalOpen} title={'Modal'} onClose={() => closeModal()} setFocus={false}>
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
      </Modal>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => closeDialog()}
        setFocus={false}
        closeOnEsc
        closeOnExternalClick
        preventDocumentScroll
        trapFocus
        isDismissible
      >
        <Dialog.Main>
          <Dialog.TitleBar titleText='Best dialog ever' />
          <Dialog.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </Dialog.Content>
          <Dialog.ButtonBar>
            <Button styleType='high-visibility' onClick={closeDialog}>
              Primary
            </Button>
            <Button onClick={closeDialog}>Secondary</Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
    </>
  );
};
