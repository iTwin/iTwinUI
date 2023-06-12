import * as React from 'react';
import { Button, useToaster } from '@itwin/itwinui-react';

const App = () => {
  const toaster = useToaster();

  React.useEffect(() => {
    toaster.setSettings({ placement: 'bottom-start' });
  }, []);

  return (
    <>
      <Button
        onClick={() =>
          toaster.positive('hello!', {
            hasCloseButton: true,
            link: {
              title: 'ur mum',
              onClick: () => console.log('hi'),
            },
          })
        }
      >
        Hello world
      </Button>
      <Button onClick={() => toaster.closeAll()}>Close all</Button>
    </>
  );
};

export default App;
