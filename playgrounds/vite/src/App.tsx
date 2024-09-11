import {
  ColorBuilder,
  ColorPicker,
  ColorInputPanel,
} from '@itwin/itwinui-react';

const App = () => {
  return (
    <>
      <ColorPicker showAlpha>
        <ColorInputPanel
          defaultColorFormat='hex'
          swapColorFormatButtonProps={{ className: 'test-swap-color-button' }}
        />
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
