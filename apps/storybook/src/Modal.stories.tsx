/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import React from 'react';
import {
  Button,
  Modal,
  ModalButtonBar,
  ModalContent,
} from '@itwin/itwinui-react';

export default {
  title: 'Core/Modal',
  component: Modal,
};

export const Basic = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClose = (event: React.SyntheticEvent<Element, Event>) => {
    action('onClose', { depth: 1 })(event);
    closeModal();
  };

  const primaryButtonHandle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    action('Primary button')(event);
    closeModal();
  };

  const secondaryButtonHandle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    action('Secondary button')(event);
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
        onKeyDown={action('onKeyDown', { depth: 1 })}
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClose = (event: React.SyntheticEvent<Element, Event>) => {
    action('onClose', { depth: 1 })(event);
    closeModal();
  };

  const primaryButtonHandle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    action('Primary button')(event);
    closeModal();
  };

  const secondaryButtonHandle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    action('Secondary button')(event);
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
        onKeyDown={action('onKeyDown', { depth: 1 })}
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClose = (event: React.SyntheticEvent<Element, Event>) => {
    action('onClose', { depth: 1 })(event);
    closeModal();
  };

  const primaryButtonHandle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    action('Primary button')(event);
    closeModal();
  };

  const secondaryButtonHandle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    action('Secondary button')(event);
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
        onKeyDown={action('onKeyDown', { depth: 1 })}
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
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClose = (event: React.SyntheticEvent<Element, Event>) => {
    action('onClose', { depth: 1 })(event);
    closeModal();
  };

  const primaryButtonHandle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    action('Primary button')(event);
    closeModal();
  };

  const secondaryButtonHandle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    action('Secondary button')(event);
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
        onKeyDown={action('onKeyDown', { depth: 1 })}
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
