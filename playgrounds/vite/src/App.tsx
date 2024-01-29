import React from 'react';
import { Button, ButtonGroup } from '@itwin/itwinui-react';

function App() {
  console.log('HERE');

  window.onerror = function (message, source, lineno, colno, error) {
    console.error('Myerror', message, source, lineno, colno, error);
  };

  // setTimeout(() => {
  //   throw new Error('Dummy error');
  // }, 4000);

  return (
    <>
      {/* below div is only a visual helper for the 20% width */}
      <div
        style={{
          position: 'absolute',
          width: '20%',
          height: '100%',
          borderRight: '1px solid green',
        }}
      ></div>
      <ButtonGroup
        style={{ width: '20%' }}
        overflowButton={() => (
          <Button size='small' styleType='borderless'>
            More
          </Button>
        )}
      >
        <Button>Long enough button 1</Button>
        <Button>Long enough button 2</Button>
        <Button>Long enough button 3</Button>
      </ButtonGroup>
      <br />
      Resize window so the button is more or less than 20% of the window (green
      line).
    </>
  );
}

export default App;
