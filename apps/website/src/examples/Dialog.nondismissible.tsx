/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Dialog, Button } from '@itwin/itwinui-react';

export default () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const isClient = useIsClient();

  return (
    <>
      <Button styleType='high-visibility' onClick={() => setIsOpen(true)}>
        Open non-dismissible dialog
      </Button>
      {isClient &&
        ReactDOM.createPortal(
          <Dialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            setFocus={false}
            isDismissible={false}
          >
            <Dialog.Backdrop />
            <Dialog.Main>
              <Dialog.TitleBar titleText='Empty trash' />
              <Dialog.Content>
                Are you sure you want to permanently erase the items in the trash? You can't undo
                this action.
              </Dialog.Content>
              <Dialog.ButtonBar>
                <Button styleType='high-visibility' onClick={() => setIsOpen(false)}>
                  Empty trash
                </Button>
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              </Dialog.ButtonBar>
            </Dialog.Main>
          </Dialog>,
          document.body
        )}
    </>
  );
};

const useIsClient = () => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};
