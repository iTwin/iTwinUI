import { Select } from '@itwin/itwinui-react';

export default () => {
  return (
    <Select<number>
      options={[...new Array(3)].map((_, index) => ({
        label: `Test${index}`,
        value: index,
      }))}
      triggerProps={{
        className: 'SelectButton',
      }}
    />
  );
};
