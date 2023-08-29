import { Button, Tooltip } from '@itwin/itwinui-react';

const App = () => {
  return (
    <>
      <Tooltip
        content='or not'
        portal={{ to: () => document.querySelector('main') }}
      >
        <Button>Hello world</Button>
      </Tooltip>
    </>
  );
};

export default App;
