/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Modal, Button, ModalContent, ModalButtonBar } from '@itwin/itwinui-react';

export default () => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsModalOpen(true)}>
        Open non-dismissible dialog
      </Button>
      <Modal
        isOpen={isModalOpen}
        title={'Empty trash'}
        isDismissible={false}
        onClose={() => closeModal()}
      >
        <ModalContent>
          Are you sure you want to permanently erase the items in the trash? You can't undo this
          action.
        </ModalContent>
        <ModalButtonBar>
          <Button styleType='high-visibility' onClick={() => closeModal()}>
            Empty trash
          </Button>
          <Button onClick={() => closeModal()}>Cancel</Button>
        </ModalButtonBar>
      </Modal>
    </>
  );
};
