import * as React from 'react';
import { Button, Modal, ModalContent } from '@itwin/itwinui-react';

export default function Home() {
  return (
    <>
      <p>Hello</p>
      <Modal isOpen={true} title='This is the title'>
        <ModalContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalContent>
      </Modal>
    </>
  );
}
