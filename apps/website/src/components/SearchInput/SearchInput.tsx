import { Button, Input, Modal, ModalButtonBar, ModalContent } from '@itwin/itwinui-react';
import { action } from 'nanostores';
import React from 'react';

export const SearchInput = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div>
      <Input
        placeholder='Search'
        onClick={() => setIsModalOpen(true)}
        onChange={(e) => console.log(e.target.value)}
      />
      <Modal
        isOpen={isModalOpen}
        title={'AI Powered Search'}
        onClose={() => setIsModalOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setIsModalOpen(false);
          }
        }}
        isDismissible={false}
      >
        <ModalContent>{/* ChatGPT's conversation messages*/}</ModalContent>
        <Input placeholder='Send a message...' />
      </Modal>
    </div>
  );
};
