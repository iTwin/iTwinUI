import { Button, Select, LabeledSelect } from '@itwin/itwinui-react';
import React from 'react';

const App = () => {
  const [value, setValue] = React.useState<string | undefined>('1');

  return (
    <>
      {/* <Button onClick={() => setValue(null)}>Hello world</Button> */}
      {/* <Select
        native
        // styleType='borderless'
        placeholder='Choose an option'
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      /> */}
      <Select
        value={value}
        native
        status='positive'
        // label='foobar'
        styleType='borderless'
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
