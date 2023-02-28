/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Modal, Button, ModalContent, ModalButtonBar } from '@itwin/itwinui-react';

export default () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Button styleType='high-visibility' onClick={() => setIsOpen(true)}>
          Open modal dialog
        </Button>
      </div>

      <Modal isOpen={isOpen} title={'Modal'} onClose={() => setIsOpen(false)}>
        <ModalContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </ModalContent>
        <ModalButtonBar>
          <Button styleType='high-visibility' onClick={() => setIsOpen(false)}>
            Primary
          </Button>
          <Button onClick={() => setIsOpen(false)}>Secondary</Button>
        </ModalButtonBar>
      </Modal>
    </>
  );
};
