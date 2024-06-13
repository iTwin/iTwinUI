/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useState } from 'react';
import {
  Button,
  Modal,
  ModalButtonBar,
  ModalContent,
} from '@itwin/itwinui-react';

export default {
  title: 'Modal',
};

export const Basic = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClose = () => {
    console.log('onClose');
    closeModal();
  };

  const primaryButtonHandle = () => {
    console.log('Primary button');
    closeModal();
  };

  const secondaryButtonHandle = () => {
    console.log('Secondary button');
    closeModal();
  };

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Modal
        isOpen={isModalOpen}
        title='This is the title'
        onClose={onClose}
        onKeyDown={() => console.log('onKeyDown')}
      >
        <ModalContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalContent>
        <ModalButtonBar>
          <Button styleType='high-visibility' onClick={primaryButtonHandle}>
            Primary
          </Button>
          <Button onClick={secondaryButtonHandle}>Secondary</Button>
        </ModalButtonBar>
      </Modal>
    </>
  );
};

export const NonDismissibleModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClose = () => {
    console.log('onClose');
    closeModal();
  };

  const primaryButtonHandle = () => {
    console.log('Primary button');
    closeModal();
  };

  const secondaryButtonHandle = () => {
    console.log('Secondary button');
    closeModal();
  };

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Modal
        isOpen={isModalOpen}
        title='This is the title'
        onClose={onClose}
        onKeyDown={() => console.log('onKeyDown')}
        isDismissible={false}
      >
        <ModalContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalContent>
        <ModalButtonBar>
          <Button styleType='high-visibility' onClick={primaryButtonHandle}>
            Primary
          </Button>
          <Button onClick={secondaryButtonHandle}>Secondary</Button>
        </ModalButtonBar>
      </Modal>
    </>
  );
};

export const OutsideClickAndEscDoesNotClose = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClose = () => {
    console.log('onClose');
    closeModal();
  };

  const primaryButtonHandle = () => {
    console.log('Primary button');
    closeModal();
  };

  const secondaryButtonHandle = () => {
    console.log('Secondary button');
    closeModal();
  };

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Modal
        isOpen={isModalOpen}
        title='This is the title'
        onClose={onClose}
        onKeyDown={() => console.log('onKeyDown')}
        closeOnEsc={false}
        closeOnExternalClick={false}
      >
        <ModalContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalContent>
        <ModalButtonBar>
          <Button styleType='high-visibility' onClick={primaryButtonHandle}>
            Primary
          </Button>
          <Button onClick={secondaryButtonHandle}>Secondary</Button>
        </ModalButtonBar>
      </Modal>
    </>
  );
};

export const FullPageModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClose = () => {
    console.log('onClose');
    closeModal();
  };

  const primaryButtonHandle = () => {
    console.log('Primary button');
    closeModal();
  };

  const secondaryButtonHandle = () => {
    console.log('Secondary button');
    closeModal();
  };

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Modal
        isOpen={isModalOpen}
        title='This is the title'
        onClose={onClose}
        onKeyDown={() => console.log('onKeyDown')}
        styleType='fullPage'
      >
        <ModalContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalContent>
        <ModalButtonBar>
          <Button styleType='high-visibility' onClick={primaryButtonHandle}>
            Primary
          </Button>
          <Button onClick={secondaryButtonHandle}>Secondary</Button>
        </ModalButtonBar>
      </Modal>
    </>
  );
};
