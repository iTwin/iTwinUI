import * as React from 'react';
import { Select } from '@itwin/itwinui-react';
import { useSearchParams } from '@remix-run/react';

export default function SelectTest() {
  const [searchParams] = useSearchParams();

  const options = [
    ...Array(9)
      .fill(null)
      .map((_, index) => {
        return {
          label: `option ${index}`,
          value: index,
        };
      }),
    {
      label: 'Very long option',
      value: 9,
    },
  ];

  /**
   * `value`/`defaultValue` can be a:
   * - `"all"`
   * - a single value (when multiple=false)
   * - an array of values (when multiple=false)
   */
  const searchParamValue = searchParams.get('value') as
    | ('all' & string & {})
    | null;
  const [value, setValue] = React.useState(() => {
    if (searchParamValue == null) {
      return undefined;
    }

    if (searchParamValue === 'all') {
      return options.map((option) => option.value);
    }
    return JSON.parse(searchParamValue) as number | number[];
  });
  const multiple = searchParams.get('multiple') === 'true';
  const controlled = searchParams.get('controlled') === 'true';

  const onChange = (val: any, event: 'added' | 'removed') =>
    multiple
      ? setValue((prev: any) =>
          event === 'removed'
            ? prev.filter((value: any) => val !== value)
            : [...prev, val],
        )
      : setValue(val);

  return (
    <>
      <div id='container'>
        <Select
          options={options}
          value={value as any}
          onChange={controlled ? (onChange as any) : undefined}
          multiple={multiple}
        />
      </div>
    </>
  );
}
