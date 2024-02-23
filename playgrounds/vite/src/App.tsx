import * as React from 'react';
import {
  Dialog,
  Button,
  Modal,
  ModalButtonBar,
  ModalContent,
  Backdrop,
} from '@itwin/itwinui-react';

export default () => {
  const [isOpen1, setIsOpen1] = React.useState(false);
  const [isOpen2, setIsOpen2] = React.useState(false);

  const dialogContent = (
    <Dialog.Main>
      <Dialog.TitleBar titleText='Test title' />
      <Dialog.Content>Here is my dialog content</Dialog.Content>
      <Dialog.ButtonBar>
        <Button styleType='high-visibility'>Confirm</Button>
        <Button>Close</Button>
      </Dialog.ButtonBar>
    </Dialog.Main>
  );

  const containerViewport = (
    <Dialog relativeTo='viewport'>
      <Dialog.Backdrop />
      {dialogContent}
    </Dialog>
  );

  return (
    <>
      {/* <Button styleType='high-visibility' onClick={() => setIsOpen1(true)}>
        Open dialog
      </Button>
      <Dialog
        isOpen={isOpen1}
        onClose={() => setIsOpen1(false)}
        closeOnEsc
        closeOnExternalClick
        preventDocumentScroll
        trapFocus
        setFocus
        isDismissible
        portal
      >
        <Dialog.Main>
          <Dialog.TitleBar titleText='Dialog' />
          <Dialog.Content>
            A dialog informs users about a task and can contain critical
            information, require decisions, or involve multiple tasks. Dialogs
            appear in front of app content to provide critical information or
            ask for a decision.
          </Dialog.Content>
          <Dialog.ButtonBar>
            <Button
              styleType='high-visibility'
              onClick={() => setIsOpen1(false)}
            >
              Primary
            </Button>
            <Button onClick={() => setIsOpen1(false)}>Secondary</Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog> */}

      <Button styleType='high-visibility' onClick={() => setIsOpen2(true)}>
        Open modal
      </Button>

      {/* {isOpen2 && (
        <Backdrop
          isVisible={isOpen2}
          onClick={() => setIsOpen2(false)}
        ></Backdrop>
      )} */}

      <Modal
        isOpen={isOpen2}
        title='My modal'
        onClose={() => setIsOpen2(false)}
      >
        <ModalContent>Here is my modal content</ModalContent>
        <ModalButtonBar>
          <Button styleType='high-visibility'>Primary button</Button>
          <Button>Secondary button</Button>
        </ModalButtonBar>
      </Modal>

      {/* {containerViewport} */}
    </>
  );
};
