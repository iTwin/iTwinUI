import { Button, Select } from '@itwin/itwinui-react';

const App = () => {
  return (
    <>
      <Button>Hello world</Button>
      <Select
        // placeholder={<div>q</div>}
        // placeholder={9}
        // placeholder={false}
        styleType='borderless'
        native={false}
        options={[{ label: 'Option 1', value: '1' }]}
      />
    </>
  );
};

export default App;
