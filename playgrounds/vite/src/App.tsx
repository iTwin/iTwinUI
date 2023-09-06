import {
  ComboBox,
  DropdownButton,
  Flex,
  MenuItem,
  Select,
  SplitButton,
} from '@itwin/itwinui-react';
import React from 'react';

const options = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];

const App = () => {
  const [value, setValue] = React.useState<number[]>([]);

  return (
    <Flex gap='s' flexDirection='column' alignItems='stretch'>
      <button>prev</button>
      <ComboBox
        options={options}
        multiple
        value={value}
        onChange={(val, event) => {
          setValue(value);
        }}
      />
      <Select options={options} />
      <Select
        multiple
        options={options}
        value={value}
        onChange={(val, event) =>
          setValue((prev) =>
            event === 'removed'
              ? prev.filter((value) => val !== value)
              : [...prev, val],
          )
        }
      />
      <SplitButton
        menuItems={() => [<MenuItem>1</MenuItem>, <MenuItem>2</MenuItem>]}
      >
        butt
      </SplitButton>
      <DropdownButton
        menuItems={() => [<MenuItem>1</MenuItem>, <MenuItem>2</MenuItem>]}
      >
        butt
      </DropdownButton>
      <button>next</button>
    </Flex>
  );
};

export default App;
