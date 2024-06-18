/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useState } from 'react';
import { Button, Code, Dialog } from '@itwin/itwinui-react';

export default {
  title: 'Dialog',
};

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const onClose = () => {
    console.log('onClose');
    closeDialog();
  };

  const primaryButtonHandle = () => {
    console.log('Primary button');
    closeDialog();
  };

  const secondaryButtonHandle = () => {
    console.log('Secondary button');
    closeDialog();
  };

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsOpen(true)}>
        Open Dialog
      </Button>
      <Dialog isOpen={isOpen} onClose={onClose} closeOnEsc isDismissible>
        <Dialog.Main>
          <Dialog.TitleBar titleText='Best dialog ever' />
          <Dialog.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const onClose = () => {
    console.log('onClose');
    closeDialog();
  };

  const primaryButtonHandle = () => {
    console.log('Primary button');
    closeDialog();
  };

  const secondaryButtonHandle = () => {
    console.log('Secondary button');
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
        <Dialog.Backdrop onKeyDown={() => console.log('onKeyDown')} />
        <Dialog.Main>
          <Dialog.TitleBar titleText='Best dialog ever' />
          <Dialog.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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

export const DraggableAndResizable = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const onClose = () => {
    console.log('onClose');
    closeDialog();
  };

  const primaryButtonHandle = () => {
    console.log('Primary button');
    closeDialog();
  };

  const secondaryButtonHandle = () => {
    console.log('Secondary button');
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
        isDismissible
        isDraggable
        isResizable
      >
        <Dialog.Main>
          <Dialog.TitleBar titleText='Best dialog ever' />
          <Dialog.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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

export const DraggableRelativeToContainer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const onClose = () => {
    console.log('onClose');
    closeDialog();
  };

  const primaryButtonHandle = () => {
    console.log('Primary button');
    closeDialog();
  };

  const secondaryButtonHandle = () => {
    console.log('Secondary button');
    closeDialog();
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '70vw',
        height: '70vh',
        border: '1px solid red',
        padding: 12,
      }}
    >
      <Button styleType='high-visibility' onClick={() => setIsDialogOpen(true)}>
        Open Dialog
      </Button>
      <div style={{ marginTop: 12 }}>
        When <Code>Dialog</Code> prop is <Code>{"relativeTo='container'"}</Code>{' '}
        then container element must have <Code>{"position: 'relative'"}</Code>{' '}
        set.
      </div>
      <Dialog
        isOpen={isDialogOpen}
        onClose={onClose}
        closeOnEsc
        isDismissible
        isDraggable
        isResizable
        relativeTo='container'
      >
        <Dialog.Main>
          <Dialog.TitleBar titleText='Best dialog ever' />
          <Dialog.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Dialog.Content>
          <Dialog.ButtonBar>
            <Button styleType='high-visibility' onClick={primaryButtonHandle}>
              Primary
            </Button>
            <Button onClick={secondaryButtonHandle}>Secondary</Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
    </div>
  );
};

export const Placement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const onClose = () => {
    console.log('onClose');
    closeDialog();
  };

  const primaryButtonHandle = () => {
    console.log('Primary button');
    closeDialog();
  };

  const secondaryButtonHandle = () => {
    console.log('Secondary button');
    closeDialog();
  };

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsOpen(true)}>
        Open Dialog
      </Button>
      <Dialog
        isOpen={isOpen}
        placement={'top-left'}
        onClose={onClose}
        closeOnEsc
        isDismissible
      >
        <Dialog.Main>
          <Dialog.TitleBar titleText='Best dialog ever' />
          <Dialog.Content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
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
