import { Button, InputGroup, LabeledInput, Dialog } from '@itwin/itwinui-react';
import React from 'react';

export default function ModalTest() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsDialogOpen(true)}>
        Open Dialog
      </Button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        closeOnEsc
        isDismissible
        setFocus
      >
        <Dialog.Main>
          <Dialog.TitleBar titleText='Best dialog ever' />
          <Dialog.Content>
            <InputGroup>
              <LabeledInput
                label='Input label'
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            </InputGroup>
          </Dialog.Content>
          <Dialog.ButtonBar>
            <Button styleType='high-visibility'>Primary</Button>
            <Button>Secondary</Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>
    </>
  );
}
