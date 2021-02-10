// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';

import { Button } from '../../src/core';
import { Modal, ModalButtonBar } from '../../src/core/Modal';
import { ModalProps } from '../../src/core/Modal/Modal';
import { useEffect, useState } from '@storybook/addons';

export default {
  title: 'Modal',
  component: Modal,
  parameters: {
    docs: { description: { component: 'Modal dialog component.' } },
  },
  args: {
    title: 'This is the title',
  },
  argTypes: {
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
} as Meta<ModalProps>;

export const Basic: Story<ModalProps> = ({
  isOpen,
  title = 'This is the title',
  ...rest
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onClose = (event) => {
    action('onClose')(event);
    closeModal();
  };

  const primaryButtonHandle = (event) => {
    action('Primary button')(event);
    closeModal();
  };

  const secondaryButtonHandle = (event) => {
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
        title={title}
        onClose={onClose}
        onKeyDown={action('onKeyDown')}
        {...rest}
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
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

export const NonDismissibleModal: Story<ModalProps> = Basic.bind({});

NonDismissibleModal.args = {
  isDismissible: false,
};

export const OutsideClickAndEscDoesNotClose: Story<ModalProps> = Basic.bind({});

OutsideClickAndEscDoesNotClose.args = {
  closeOnEsc: false,
  closeOnExternalClick: false,
};
