import * as React from 'react';
import { ComboBox } from '@itwin/itwinui-react';

export default () => {
  return (
    <>
      <ComboBox
        options={[
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Cantaloupe', value: 'cantaloupe' },
          { label: 'Grapefruit', value: 'grapefruit', disabled: true },
          { label: 'Lychee', value: 'lychee' },
          { label: 'Kiwi', value: 'kiwi' },
          { label: 'Orange', value: 'orange', disabled: true },
          { label: 'Strawberry', value: 'strawberry' },
          { label: 'Watermelon', value: 'watermelon' },
        ]}
      />
    </>
  );
};
