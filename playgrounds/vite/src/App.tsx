import { ComboBox, Flex, Select } from '@itwin/itwinui-react';

const options = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];

export default function App() {
  return (
    <Flex flexDirection='row' style={{ border: 'red solid 1px' }}>
      <ComboBox
        options={options}
        defaultValue={1}
        inputProps={{ size: 'small' }}
      />
      <Select options={options} placeholder='Select something' size='small' />
    </Flex>
  );
}
