import {
  Button,
  Modal,
  ModalContent,
  InputGroup,
  LabeledInput,
  ModalButtonBar,
} from '@itwin/itwinui-react';
import React from 'react';

export default function ModalTest() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>

      <Modal
        isOpen={isModalOpen}
        title={'Modal title'}
        onClose={() => setIsModalOpen(false)}
        closeOnEsc
        closeOnExternalClick
      >
        <ModalContent>
          <InputGroup>
            <LabeledInput
              label='Input label'
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </InputGroup>
        </ModalContent>
        <ModalButtonBar>
          <Button styleType='high-visibility' onClick={async () => {}}>
            Create
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </ModalButtonBar>
      </Modal>
    </>
  );
}
