import { Button, LabeledInput } from '@itwin/itwinui-react';

const App = () => {
  return (
    <>
      <LabeledInput
        label='Label'
        placeholder='Placeholder'
        message='Hint message'
      />
      <Button>Click me</Button>
    </>
  );
};

export default App;
