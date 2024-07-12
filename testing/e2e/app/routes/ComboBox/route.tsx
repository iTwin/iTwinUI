import { ComboBox } from '@itwin/itwinui-react';
import { useSearchParams } from '@remix-run/react';

export default function ComboBoxTest() {
  const [searchParams] = useSearchParams();

  const virtualization = searchParams.get('virtualization') === 'true';

  return (
    <ComboBox
      options={[
        { label: 'Item 0', value: 0 },
        { label: 'Item 1', value: 1, subLabel: 'sub label' },
        { label: 'Item 2', value: 2 },
        { label: 'Item 3', value: 3 },
        { label: 'Item 4', value: 4 },
        { label: 'Item 10', value: 10 },
        { label: 'Item 11', value: 11 },
      ]}
      id='test-component'
      enableVirtualization={virtualization}
    />
  );
}
