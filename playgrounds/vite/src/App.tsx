import { ComboBox, Label } from '@itwin/itwinui-react';
import { useState } from 'react';

const App = () => {
  const [fruit, setFruit] = useState<string[]>([]);

  return (
    <>
      <Label htmlFor='mycombo'>Which fruit?</Label>
      <ComboBox
        message='A fruit looks like this: 🍎, 🍌'
        value={fruit}
        multiple
        onChange={(f) => setFruit(f)}
        inputProps={{
          id: 'mycombo',
          placeholder: 'e.g. Apple',
        }}
        options={[
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Grapefruit', value: 'grapefruit' },
          { label: 'Lychee', value: 'lychee' },
          { label: 'Kiwi', value: 'kiwi' },
          { label: 'Orange', value: 'orange' },
        ]}
      />
    </>
  );
};

export default App;
