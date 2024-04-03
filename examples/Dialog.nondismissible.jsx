/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Dialog, Button } from '@itwin/itwinui-react';

export default () => {
  const dialogRef = React.useRef(null);

  return (
    <>
      <Button
        styleType='high-visibility'
        onClick={() => dialogRef.current?.show()}
      >
        Open non-dismissible dialog
      </Button>
      <Dialog ref={dialogRef} setFocus={false} isDismissible={false} portal>
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar titleText='Empty trash' />
          <Dialog.Content>
            Are you sure you want to permanently erase the items in the trash?
            You can't undo this action.
          </Dialog.Content>
          <Dialog.ButtonBar>
            <Button
              styleType='high-visibility'
              onClick={() => dialogRef.current?.close()}
            >
              Empty trash
            </Button>
            <Button onClick={() => dialogRef.current?.close()}>Cancel</Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
    </>
  );
};
