import { Button, ComboBox } from '@itwin/itwinui-react';
import { useSearchParams } from '@remix-run/react';
import * as React from 'react';

export default function ComboBoxTest() {
  const [searchParams] = useSearchParams();

  const virtualization = searchParams.get('virtualization') === 'true';
  const multiple = searchParams.get('multiple') === 'true';
  const showChangeValueButton =
    searchParams.get('showChangeValueButton') === 'true';

  const options = [
    { label: 'Item 0', value: 0 },
    { label: 'Item 1', value: 1, subLabel: 'sub label' },
    { label: 'Item 2', value: 2 },
    { label: 'Item 3', value: 3 },
    { label: 'Item 4', value: 4 },
    { label: 'Item 10', value: 10 },
    { label: 'Item 11', value: 11 },
  ];

  const initialValueSearchParam = searchParams.get('initialValue') as
    | ('all' & string & {})
    | null;
  const initialValue =
    initialValueSearchParam != null
      ? initialValueSearchParam === 'all'
        ? options.map((option) => option.value)
        : (JSON.parse(initialValueSearchParam) as number | number[])
      : undefined;

  const [value, setValue] = React.useState(initialValue);

  return (
    <div data-testid='container'>
      {showChangeValueButton && (
        <Button
          data-testid='change-value-to-first-option-button'
          onClick={() => setValue(multiple ? [0] : 0)}
        >
          Change value to just the first option
        </Button>
      )}

      <ComboBox
        options={options}
        id='test-component'
        value={value as any}
        multiple={multiple}
        enableVirtualization={virtualization}
      />
    </div>
  );
}
