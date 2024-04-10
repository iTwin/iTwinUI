import * as React from 'react';
import { Dialog } from '@itwin/itwinui-react';

export default function DialogTest() {
  const dialog = Dialog.useInstance();

  React.useEffect(() => {
    dialog.show();
  }, [dialog]);

  return (
    <Dialog setFocus instance={dialog}>
      <Dialog.Main>Hello</Dialog.Main>
    </Dialog>
  );
}
