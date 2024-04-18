import { Button, ToggleSwitch } from '@itwin/itwinui-react';

export default function App() {
  return (
    <>
      <ToggleSwitch
        label='label'
        labelProps={{ className: 'test-classNAME', style: { backgroundColor: 'red' } }}
      ></ToggleSwitch>
      <Button>Hello ld</Button>
    </>
  );
}
