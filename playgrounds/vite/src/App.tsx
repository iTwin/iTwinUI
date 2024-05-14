import * as React from 'react';
import { ComboBox, Select } from '@itwin/itwinui-react';

const countriesList = [
  { label: 'AAA', value: 'A' },
  { label: 'BBB', value: 'B' },
  { label: 'CCC', value: 'C' },
];

// Steps to reproduce:
// * Select any other item in the ComboBox.
// * Even though `value="C"`, the ComboBox value changes.
// * This doesn't happen in Select.
export default function App() {
  const options = React.useMemo(() => countriesList, []);

  const [value, setValue] = React.useState('C');

  // // Every 3 seconds, cycle the value
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setValue((prev) => {
  //       const index = options.findIndex((o) => o.value === prev);
  //       return options[(index + 1) % options.length].value;
  //     });
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [options]);

  return (
    <>
      <ComboBox
        options={options}
        value={value}
        onChange={(v) => {
          console.log('v', v);

          // // Set value after 2 seconds
          // setTimeout(() => {
          //   setValue(v);
          // }, 2000);

          // setValue(v);
        }}
      />
      <ComboBox
        options={options}
        multiple
        onChange={(value, event) => console.log(value, event)}
      />
      {/* <Select options={options} value='C' /> */}
    </>
  );
}
