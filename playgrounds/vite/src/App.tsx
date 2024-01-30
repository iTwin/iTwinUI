import { Button, ButtonGroup, Divider, Tabs } from '@itwin/itwinui-react';

function App() {
  const stableLabels = ['A', 'B'];

  window.onerror = function (message, source, lineno, colno, error) {
    console.error('My error', message, source, lineno, colno, error);
  };

  const CustomDivider = () => (
    <Divider
      style={{
        margin: '20px',
      }}
    />
  );

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
      <p>
        Resize window so the button is more or less than 20% of the window
        (green line).
      </p>
      <CustomDivider />
      <Tabs labels={stableLabels} />
      <br />
      Switch between tabs, notice the overlay error.
    </>
  );
}

export default App;
