/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Dialog, Button } from '@itwin/itwinui-react';

export default () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const closeDialog = () => {
    setIsOpen(false);
  };
  const onClose = (event: React.SyntheticEvent<Element, Event>) => {
    closeDialog();
  };
  const primaryButtonHandle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    closeDialog();
  };
  const secondaryButtonHandle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    closeDialog();
  };

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsOpen(true)}>
        Open dialog
      </Button>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc
        closeOnExternalClick
        preventDocumentScroll
        trapFocus
        setFocus
        isDismissible
      >
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar titleText='Dialog' />
          <Dialog.Content>
            A dialog informs users about a task and can contain critical information, require
            decisions, or involve multiple tasks. Dialogs appear in front of app content to provide
            critical information or ask for a decision.
          </Dialog.Content>
          <Dialog.ButtonBar>
            <Button styleType='high-visibility' onClick={primaryButtonHandle}>
              Primary
            </Button>
            <Button onClick={secondaryButtonHandle}>Secondary</Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
    </>
  );
};
