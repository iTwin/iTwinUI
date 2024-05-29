import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button } from '@itwin/itwinui-react';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      <Button
        loading={isLoading}
        onClick={async () => {
          ReactDOM.flushSync(() => setIsLoading(true));

          // simulate async operation
          await new Promise((resolve) => setTimeout(resolve, 3000));

          setIsLoading(false);
        }}
      >
        Click me
      </Button>
    </>
  );
}
