import { ComboBox } from '@itwin/itwinui-react';

const App = () => {
  return (
    <>
      <ComboBox
        options={[
          { label: 'Afghanistan', value: 'AF' },
          { label: 'Åland', sublabel: 'AX', value: 'AX' },
          { label: 'Albania', value: 'AL' },
          { label: 'Algeria', value: 'DZ' },
        ]}
        enableVirtualization={true}
      />
    </>
  );
};

export default App;
