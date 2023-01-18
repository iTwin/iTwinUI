/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Modal,
  Button,
  ModalContent,
  ModalButtonBar,
  LabeledInput,
  LabeledTextarea,
} from '@itwin/itwinui-react';

export default () => {
  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsModalOpen(true)}>
        Open dismissible dialog
      </Button>
      <Modal
        isOpen={isModalOpen}
        title={'New message'}
        onClose={() => closeModal()}
        setFocus={false}
      >
        <ModalContent>
          <LabeledInput label='Subject' />
          <LabeledTextarea label='Message' />
        </ModalContent>
        <ModalButtonBar>
          <Button styleType='high-visibility' onClick={() => closeModal()}>
            Submit
          </Button>
          <Button onClick={() => closeModal()}>Save draft</Button>
        </ModalButtonBar>
      </Modal>
    </>
  );
};
