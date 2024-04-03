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
        Open dialog
      </Button>
      <Dialog
        ref={dialogRef}
        closeOnExternalClick
        preventDocumentScroll
        trapFocus
        setFocus
        portal
        placement='top-left'
      >
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar titleText='Dialog' />
          <Dialog.Content></Dialog.Content>
          <Dialog.ButtonBar>
            <Button
              styleType='high-visibility'
              onClick={() => dialogRef.current?.close()}
            >
              Primary
            </Button>
            <Button onClick={() => dialogRef.current?.close()}>
              Secondary
            </Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
    </>
  );
};
