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
  const modalRef = React.useRef(null);

  return (
    <>
      <Button
        styleType='high-visibility'
        onClick={() => modalRef.current?.show()}
      >
        Open full page dialog
      </Button>
      <Modal ref={modalRef} title={'New message'} styleType='fullPage'>
        <ModalContent>
          <LabeledInput label='Subject' />
          <LabeledTextarea label='Message' />
        </ModalContent>
        <ModalButtonBar>
          <Button
            styleType='high-visibility'
            onClick={() => modalRef.current?.close()}
          >
            Submit
          </Button>
          <Button onClick={() => modalRef.current?.close()}>Save draft</Button>
        </ModalButtonBar>
      </Modal>
    </>
  );
};
