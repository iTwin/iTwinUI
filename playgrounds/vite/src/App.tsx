import { LabeledSelect, Select } from '@itwin/itwinui-react';

const App = () => {
  const myNumber = 1;
  const myBoolean: boolean = myNumber !== 1;

  return (
    <>
      {/* ---------------------------------------------------------------------------- */}
      {/* Possible issues: */}

      {/* Type error when using boolean variables, even though both `true` and `false` don't give any type errors. */}
      <Select
        native={myBoolean}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      <Select
        native={true}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      <Select
        native={false}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      {/* The error is usually fixable by passing non-variable values for some of the other props */}
      <Select
        native={myBoolean}
        styleType='default'
        multiple={undefined}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />

      {/* Type error when using boolean variables, even though both `true` and `false` don't give any type errors. */}
      <Select
        multiple={myBoolean}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      <Select
        multiple={true}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      <Select
        multiple={false}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      {/* The error is usually fixable by passing non-variable values for some of the other props */}
      <Select
        multiple={myBoolean}
        styleType='default'
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />

      {/* The onChange's value param loses its type when using Omit<{…}, "styleType"> in LabeledSelect.tsx */}
      {/* Not sure how to solve this. If it is hard to solve, not sure if this is acceptable. */}
      <LabeledSelect
        onChange={(value) => {
          const returnValue: string = value;
          return returnValue;
        }}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />

      {/* ---------------------------------------------------------------------------- */}

      {/* Expected/Observations/Notes: */}

      {/* Expected error: */}
      {/* borderless but missing defaultValue (custom select) */}
      <Select
        styleType='borderless'
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      <Select
        styleType='borderless'
        defaultValue={'1'}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />

      {/* Observation: */}
      {/* borderless but missing defaultValue (native select) */}
      {/* No error since defaultValue is not required in borderless native select */}
      <Select
        native
        styleType='borderless'
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      <Select
        native
        styleType='borderless'
        defaultValue={'1'}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />

      {/* Expected error: */}
      {/* (borderless + defaultValue) with placeholder (both selects) */}
      {/* Error since placeholder should not be passed to borderless */}
      <Select
        styleType='borderless'
        defaultValue={'1'}
        placeholder={'Choose an option'}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      <Select
        native
        styleType='borderless'
        defaultValue={'1'}
        placeholder={'Choose an option'}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      <Select
        styleType='borderless'
        defaultValue={'1'}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
      <Select
        native
        styleType='borderless'
        defaultValue={'1'}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />

      {/* Expected error: */}
      {/* LabeledSelect does not take styleType */}
      <LabeledSelect
        styleType='borderless'
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
    </>
  );
};

export default App;
