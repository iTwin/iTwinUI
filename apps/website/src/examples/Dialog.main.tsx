/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Modal, Button, ModalContent, ModalButtonBar } from '@itwin/itwinui-react';

export default () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Modal isOpen={isModalOpen} title={'Dialog'} onClose={() => closeModal()}>
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
    </>
  );
};
