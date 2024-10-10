/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Dialog,
  Button,
  LabeledInput,
  LabeledTextarea,
} from '@itwin/itwinui-react';

export default () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsOpen(true)}>
        Open draggable dialog
      </Button>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setFocus={false}
        closeOnEsc
        isDismissible
        isDraggable
        isResizable
        portal
      >
        <Dialog.Main>
          <Dialog.TitleBar titleText='New message' />
          <Dialog.Content>
            <LabeledInput label='Subject' />
            <LabeledTextarea label='Message' />
          </Dialog.Content>
          <Dialog.ButtonBar>
            <Button
              styleType='high-visibility'
              onClick={() => setIsOpen(false)}
            >
              Submit
            </Button>
            <Button onClick={() => setIsOpen(false)}>Save draft</Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
    </>
  );
};
