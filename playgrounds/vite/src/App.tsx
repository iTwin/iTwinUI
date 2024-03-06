import { Button, Select } from '@itwin/itwinui-react';

const App = () => {
  return (
    <>
      <Button>Hello world</Button>
      <Select
        // placeholder={<div>q</div>}
        // placeholder={9}
        // placeholder={false}
        // placeholder={'Select an option'}
        styleType='borderless'
        defaultValue='10'
        // native={true}
        native={false}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
    </>
  );
};

export default App;
