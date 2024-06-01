import * as React from 'react';
import {
  Button,
  ComboBox,
  Divider,
  Fieldset,
  Flex,
  InputGrid,
  Label,
  LabeledSelect,
  Text,
} from '@itwin/itwinui-react';

const countriesList = [
  { label: 'AAA', value: 'A' },
  { label: 'ABB', value: 'A1' },
  { label: 'ACC', value: 'A2' },
  { label: 'BBB', value: 'B' },
  { label: 'CCC', value: 'C' },
];

const countriesList2 = [
  { label: 'AAA', value: 'A' },
  { label: 'BBB', value: 'B' },
  { label: 'CCC', value: 'C' },
  { label: 'DDD', value: 'D' },
  { label: 'EEE', value: 'E' },
  { label: 'FFF', value: 'F' },
  { label: 'GGG', value: 'G' },
  { label: 'HHH', value: 'H' },
  { label: 'III', value: 'I' },
  { label: 'JJJ', value: 'J' },
];

export default function App() {
  const [options, setOptions] = React.useState(countriesList);

  const [value, setValue] = React.useState('Does not exist');
  const [valueMultiple, setValueMultiple] = React.useState(['Does not exist']);

  const optionsMultipleControlled = [0, 1, 2, 3, 4, 5, 6, 7].map((value) => ({
    value: `${value}`,
    label: `Item ${value}`,
  }));
  const valueMultipleControlledInitial = ['1'];
  const [valueMultipleControlled, setValueMultipleControlled] = React.useState<
    string[] | null | undefined
  >(valueMultipleControlledInitial);

  // // Every 5 seconds, cycle the value
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setValue((prev) => {
  //       const index = options.findIndex((o) => o.value === prev);
  //       return options[(index + 1) % options.length].value;
  //     });
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [options]);

  // Every 5 seconds, cycle the options
  React.useEffect(() => {
    const interval = setInterval(() => {
      // options = options === countriesList ? countriesList2 : countriesList;
      setOptions((prev) =>
        prev === countriesList ? countriesList2 : countriesList,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [options]);

  const optionsUnitTest = [0, 1, 2].map((value) => ({
    value,
    label: `Item ${value}`,
  }));
  const valueUnitTestInitial = 1;
  const [valueUnitTest, setValueUnitTest] = React.useState<
    number | null | undefined
  >(1);

  // // Set valueUnitTest after 2 seconds
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setValueUnitTest(null);
  //   }, 2000);
  // }, []);

  const optionsVirtualized = Array.from({ length: 1000 }, (_, i) => ({
    label: `Item ${i}`,
    value: `${i}`,
  }));

  return (
    <Flex flexDirection='column' alignItems='stretch'>
      {/* <InputGrid>
        <Label>Controlled state (no onChange passed)</Label>
        <ComboBox options={options} value={value} />
      </InputGrid> */}
      <InputGrid>
        <Label>Controlled state (onChange passed)</Label>
        <ComboBox
          options={options}
          value={value}
          onChange={(v) => {
            console.log('v', v);
            setValue(v);
          }}
        />
      </InputGrid>

      <CustomDivider />

      {/* <InputGrid>
        <Label>Controlled state (no onChange passed) + Multiselect</Label>
        <ComboBox options={options} multiple value={valueMultiple} />
      </InputGrid>
      <InputGrid>
        <Label>Controlled state (onChange passed) + Multiselect</Label>
        <ComboBox
          options={options}
          multiple
          value={valueMultiple}
          onChange={(value, event) => {
            setValueMultiple(value);
            console.log(value, event);
          }}
        />
      </InputGrid>

      <CustomDivider />

      <InputGrid>
        <Label>Uncontrolled state</Label>
        <ComboBox
          options={options}
          onChange={(value) => console.log('onChange', value)}
        />
      </InputGrid>
      <InputGrid>
        <Label>Uncontrolled state + Multiselect</Label>
        <ComboBox
          multiple
          options={options}
          onChange={(value) => console.log('onChange', value)}
        />
      </InputGrid>

      <CustomDivider />

      <InputGrid>
        <Label>Using defaultValue</Label>
        <ComboBox
          options={optionsUnitTest}
          onChange={(val) => {
            console.log('onChange unit test called', val);
          }}
          defaultValue={2}
        />
        <ComboBox
          options={optionsUnitTest}
          multiple
          onChange={(val) => {
            console.log('onChange unit test called', val);
          }}
          defaultValue={[1, 2]}
        />
      </InputGrid>

      <CustomDivider />

      <Text variant='leading'>Reset state</Text>
      <Flex flexDirection='column' alignItems='flex-start'>
        <Fieldset legend='Single'>
          <Text>value = {`${valueUnitTest}`}</Text>
          <Flex>
            <Button onClick={() => setValueUnitTest(null)}>
              Set value=null
            </Button>
            <Button onClick={() => setValueUnitTest(undefined)}>
              Set value=undefined
            </Button>
            <Button onClick={() => setValueUnitTest(valueUnitTestInitial)}>
              Set value=initialValue
            </Button>
          </Flex>
          <InputGrid>
            <Label>ComboBox</Label>
            <ComboBox options={optionsUnitTest} value={valueUnitTest} />
          </InputGrid>
          <LabeledSelect
            label='Select'
            options={optionsUnitTest}
            value={valueUnitTest}
          />
        </Fieldset>
        <Fieldset legend='Multiple'>
          <Text>value = {`${valueMultipleControlled}`}</Text>
          <Flex>
            <Button onClick={() => setValueMultipleControlled(null)}>
              Set value=null
            </Button>
            <Button onClick={() => setValueMultipleControlled(undefined)}>
              Set value=undefined
            </Button>
            <Button
              onClick={() =>
                setValueMultipleControlled(valueMultipleControlledInitial)
              }
            >
              Set value=initialValue
            </Button>
          </Flex>
          <InputGrid>
            <Label>ComboBox</Label>
            <ComboBox
              options={optionsMultipleControlled}
              value={valueMultipleControlled}
              multiple
            />
          </InputGrid>
        </Fieldset>
      </Flex>

      <CustomDivider />

      <InputGrid>
        <Label>Controlled state (no onChange passed) + Virtualized</Label>
        <ComboBox
          value={value}
          defaultValue={`2`}
          options={optionsVirtualized}
        />
      </InputGrid>
      <InputGrid>
        <Label>Controlled state (onChange passed) + Virtualized</Label>
        <ComboBox
          value={value}
          defaultValue={`2`}
          options={optionsVirtualized}
          onChange={(val) => {
            console.log('onChange virtualized called', val);
            setValue(val);
          }}
        />
      </InputGrid> */}
    </Flex>
  );
}

// ----------------------------------------------------------------------------

const CustomDivider = () => <Divider style={{ margin: '16px 0' }} />;
