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
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsOpen(true)}>
        Open full page dialog
      </Button>
      <Modal
        isOpen={isOpen}
        title={'New message'}
        styleType='fullPage'
        onClose={() => setIsOpen(false)}
      >
        <ModalContent>
          <LabeledInput label='Subject' />
          <LabeledTextarea label='Message' />
        </ModalContent>
        <ModalButtonBar>
          <Button styleType='high-visibility' onClick={() => setIsOpen(false)}>
            Submit
          </Button>
          <Button onClick={() => setIsOpen(false)}>Save draft</Button>
        </ModalButtonBar>
      </Modal>
    </>
  );
};
