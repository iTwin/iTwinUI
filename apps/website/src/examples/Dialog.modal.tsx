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
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button styleType='high-visibility' onClick={() => setIsModalOpen(true)}>
          Open modal
        </Button>
        <Button styleType='high-visibility' onClick={() => setIsDialogOpen(true)}>
          Open dialog
        </Button>
      </div>

      <Modal isOpen={isModalOpen} title={'Modal'} onClose={() => closeModal()} setFocus={false}>
        <ModalContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
          <Dialog.TitleBar titleText='Dialog' />
          <Dialog.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
