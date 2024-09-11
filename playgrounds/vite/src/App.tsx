import { ColorBuilder, ColorPicker } from '@itwin/itwinui-react';

const App = () => {
  return (
    <>
      <ColorPicker showAlpha>
        <ColorBuilder
          hueSliderProps={{
            values: [0],
            onChange: (value) => {
              console.log(value);
            },
          }}
        />
      </ColorPicker>
    </>
  );
};

export default App;
