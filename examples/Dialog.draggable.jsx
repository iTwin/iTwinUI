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
  const dialogRef = React.useRef(null);

  return (
    <>
      <Button
        styleType='high-visibility'
        onClick={() => dialogRef.current?.show()}
      >
        Open draggable dialog
      </Button>

      <Dialog ref={dialogRef} isDraggable isResizable portal>
        <Dialog.Main>
          <Dialog.TitleBar titleText='New message' />
          <Dialog.Content>
            <LabeledInput label='Subject' />
            <LabeledTextarea label='Message' />
          </Dialog.Content>
          <Dialog.ButtonBar>
            <Button
              styleType='high-visibility'
              onClick={() => dialogRef.current?.close()}
            >
              Submit
            </Button>
            <Button onClick={() => dialogRef.current?.close()}>
              Save draft
            </Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
    </>
  );
};
