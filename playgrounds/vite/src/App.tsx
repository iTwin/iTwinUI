import { Button, Flex, Select } from '@itwin/itwinui-react';

const App = () => {
  return (
    <>
      <Flex flexDirection='column' alignItems='flex-start'>
        <Demo native={false} />
        <Demo native={true} />
      </Flex>
    </>
  );
};

export default App;

const Demo = ({ native = false }: { native: boolean }) => {
  const options = [
    { value: '1', label: 'Item #1' },
    { value: '2', label: 'Item #2', disabled: true },
    { value: '3', label: 'Item #3' },
  ];

  return (
    <>
      <Select
        options={options}
        placeholder='Placeholder text'
        styleType='borderless'
        native={native}
      />
      <Select
        options={options}
        placeholder='Placeholder text'
        styleType='borderless'
        disabled
        native={native}
      />
      <Select
        options={options}
        placeholder='Placeholder text'
        styleType='borderless'
        status='positive'
        native={native}
      />
      <Select
        options={options}
        placeholder='Placeholder text'
        styleType='borderless'
        status='positive'
        disabled
        native={native}
      />
    </>
  );
};
