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
  const value =
    searchParamValue != null
      ? searchParamValue === 'all'
        ? options.map((option) => option.value)
        : (JSON.parse(searchParamValue) as number | number[])
      : undefined;

  const multiple = searchParams.get('multiple') === 'true';

  return (
    <>
      <div id='container'>
        <Select options={options} value={value as any} multiple={multiple} />
      </div>
    </>
  );
}
