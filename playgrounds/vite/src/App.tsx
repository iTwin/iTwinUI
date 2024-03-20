import { SvgMore } from '@itwin/itwinui-icons-react';
import {
  Button,
  ComboBox,
  IconButton,
  ProgressRadial,
} from '@itwin/itwinui-react';

const App = () => {
  return (
    <>
      <ProgressRadial indeterminate value={30} />
      {/* <ComboBox
        options={[0, 1, 2].map((value) => ({ value, label: `Item ${value}` }))}
        multiple
        value={[0]}
      /> */}
      {/* <IconButton onClick={() => {}} label='More options 123'>
        <SvgMore />
      </IconButton> */}
    </>
  );
};

export default App;
