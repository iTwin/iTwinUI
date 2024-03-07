import { Button, LabeledSelect, Select } from '@itwin/itwinui-react';

const App = () => {
  return (
    <>
      <Button>Hello world</Button>

      {/* {[false, true].flatMap((multiple) => {
        return [false, true].flatMap((native) => {
          return ['default', 'borderless'].flatMap((styleType) => {
            return (
              <SelectTest
                multiple={multiple}
                native={native}
                styleType={styleType}
              />
            );
          });
        });
      })} */}

      <Select
        multiple={undefined}
        native={true}
        styleType={'default'}
        defaultValue='3'
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />

      <LabeledSelect
        // placeholder={<div>q</div>}
        // placeholder={9}
        // placeholder={false}
        // placeholder={'Select an option'}
        // styleType='borderless'
        label='Select Label'
        message='Positive Message'
        defaultValue='3'
        // native={true}
        native={false}
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

// ----------------------------------------------------------------------------

const SelectTest = ({
  multiple,
  native,
  styleType,
}: {
  multiple: any;
  native: any;
  styleType: any;
}) => {
  const invalid = native && multiple;

  return (
    <div
      style={{
        marginTop: '20px',
        border: '1px solid grey',
        padding: '5px',
      }}
    >
      <b>
        {JSON.stringify({
          multiple: multiple,
          native: native,
          styleType: styleType,
        })}
      </b>

      {!invalid && (
        <Select
          multiple={multiple}
          native={native}
          styleType={styleType}
          options={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
            { label: 'Option 3', value: '3' },
          ]}
        />
      )}
    </div>
  );
};
