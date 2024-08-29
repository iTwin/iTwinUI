import {
  ColorPicker,
  ColorInputPanel,
  ColorPalette,
  ColorBuilder,
} from '@itwin/itwinui-react';

const App = () => {
  const colors = [
    'hsla(210, 11%, 65%, 1.00)',
    'hsla(95, 73%, 16%, 1.00)',
    'hsla(203, 100%, 6%, 1.00)',
    'hsla(203, 100%, 13%, 1.00)',
  ];
  return (
    <>
      <ColorPicker showAlpha>
        <ColorBuilder
          colorFieldProps={{
            className: 'test-builder',
            style: { borderRadius: '10px' },
          }}
        ></ColorBuilder>
        <ColorPalette
          colors={colors}
          label='Saved colors'
          labelProps={{ className: 'test-label' }}
          paletteProps={{ className: 'test-palette', style: { gap: '20px' } }}
        ></ColorPalette>
        <ColorInputPanel
          style={{ width: '500px' }}
          defaultColorFormat='hex'
          panelLabelProps={{ className: 'test-input-label' }}
          inputFieldProps={{
            className: 'test-input',
          }}
        />
      </ColorPicker>
    </>
  );
};

export default App;
