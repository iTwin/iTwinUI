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
} from '@itwin/itwinui-react';

export default () => {
  const modalRef = React.useRef(null);

  return (
    <>
      <div className='demo-container'>
        <Button
          styleType='high-visibility'
          onClick={() => modalRef.current?.show()}
        >
          Open modal dialog
        </Button>
      </div>

      <Modal ref={modalRef} title={'Modal'}>
        <ModalContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </ModalContent>
        <ModalButtonBar>
          <Button
            styleType='high-visibility'
            onClick={() => modalRef.current?.close()}
          >
            Primary
          </Button>
          <Button onClick={() => modalRef.current?.close()}>Secondary</Button>
        </ModalButtonBar>
      </Modal>
    </>
  );
};
