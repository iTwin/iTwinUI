import { Select } from '@itwin/itwinui-react';
import { useSearchParams } from '@remix-run/react';
import React from 'react';

export default function BreadcrumbsTest() {
  const [searchParams] = useSearchParams();

  const options = [
    ...Array(9)
      .fill(null)
      .map((_, index) => {
        return {
          label: `option ${index}`,
          value: `index`,
        };
      }),
    {
      label: 'Very long option',
      value: 9,
    },
  ];

  const valueSearchParam = searchParams.get('value');
  const value =
    valueSearchParam != null
      ? JSON.parse(valueSearchParam)
      : options.map((option) => option.value);

  return (
    <>
      <div id='container' style={{ overflow: 'hidden' }}>
        <Select
          options={options}
          value={value}
          defaultValue={options.map((option) => `${option.value}`)}
          multiple
        />
      </div>
    </>
  );
}
