import { Button, Dialog } from '@itwin/itwinui-react';
import React from 'react';

const App = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsOpen(true)}>
        Open dialog
      </Button>
      {isOpen && (
        <Dialog
          isOpen={true}
          onClose={() => setIsOpen(false)}
          closeOnEsc
          closeOnExternalClick
          preventDocumentScroll
          trapFocus
          setFocus
          isDismissible
          portal
        >
          <Dialog.Backdrop />
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
                onClick={() => setIsOpen(false)}
              >
                Primary
              </Button>
              <Button onClick={() => setIsOpen(false)}>Secondary</Button>
            </Dialog.ButtonBar>
          </Dialog.Main>
        </Dialog>
      )}
    </>
  );
};

export default App;
