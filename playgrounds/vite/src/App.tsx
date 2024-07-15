import { SvgPlaceholder } from '@itwin/itwinui-icons-react';
import { ButtonGroup, ComboBox, IconButton } from '@itwin/itwinui-react';

export default function App() {
  const data: { label: string; value: number }[] = [];
  for (let i = 0; i < 15; i++) {
    data.push({
      label: `option ${i}`,
      value: i,
    });
  }
  const widths = [];
  for (let i = 0; i < 20; i++) {
    widths.push(790 + i * 3);
  }

  return (
    <>
      {/* {widths.slice(0, 1).map((width) => (
        <ComboBox
          key={width}
          style={{ width: `${width}px`, maxWidth: '80vw' }}
          enableVirtualization={false}
          multiple={true}
          options={data}
          defaultValue={data.map((x) => x.value)}
          onChange={() => {}}
          inputProps={{
            placeholder: 'Placeholder',
          }}
        />
      ))} */}
      <div
        id='container'
        style={{ resize: 'block', overflow: 'hidden', padding: '5px' }}
      >
        <ButtonGroup
          role='toolbar'
          orientation={'vertical'}
          style={{ height: '100%' }}
          overflowButton={(firstOverflowingIndex) => {
            return <IconButton>{firstOverflowingIndex}</IconButton>;
          }}
        >
          <IconButton label='Button 1'>
            <SvgPlaceholder />
          </IconButton>
          <IconButton label='Button 2' isActive>
            <SvgPlaceholder />
          </IconButton>
          <IconButton label='Button 3'>
            <SvgPlaceholder />
          </IconButton>
        </ButtonGroup>
      </div>
    </>
  );
}
