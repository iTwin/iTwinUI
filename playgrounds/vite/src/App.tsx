import { ComboBox } from '@itwin/itwinui-react';

export default function App() {
  const data: { label: string; value: number }[] = [];
  for (let i = 0; i < 15; i++) {
    data.push({ label: `option ${i}`, value: i });
  }
  const widths = [];
  for (let i = 0; i < 20; i++) {
    widths.push(790 + i * 3);
  }

  return (
    <>
      {widths.slice(5, 6).map((width) => (
        <ComboBox
          key={width}
          style={{ width: `${width}px`, maxWidth: '80vw' }}
          enableVirtualization={false}
          multiple={true}
          options={data}
          value={data.map((x) => x.value)}
          onChange={() => {}}
          inputProps={{
            placeholder: 'Placeholder',
          }}
        />
      ))}
    </>
  );
}
