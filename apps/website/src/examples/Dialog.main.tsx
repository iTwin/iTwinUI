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
        Open Dialog
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
          <Dialog.TitleBar titleText='Best dialog ever' />
          <Dialog.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
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
