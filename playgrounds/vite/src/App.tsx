import { Button, LabeledSelect, Select } from '@itwin/itwinui-react';

const App = () => {
  const isNative: boolean = false;

  return (
    <>
      <Button>Hello world</Button>

      {[false, true].flatMap((multiple) => {
        return [false, true].flatMap((native) => {
          return ['default', 'borderless'].flatMap((styleType) => {
            return (
              <SelectTest
                multiple={multiple}
                native={native}
                styleType={styleType as 'default' | 'borderless'}
              />
            );
          });
        });
      })}

      <Select
        // multiple={undefined}
        native={isNative}
        // styleType={'default'}
        // defaultValue='3'
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />

      <Select
        // multiple={undefined}
        native={isNative}
        // styleType={styleType}
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

const SelectTest = (
  // {
  //   // multiple: multipleProp,
  //   // native: nativeProp,
  //   // styleType: styleTypeProp,
  //   multiple,
  //   native,
  //   styleType,
  // }
  props: {
    multiple: boolean;
    native: boolean;
    styleType: 'default' | 'borderless';
  },
) => {
  const {
    // multiple: multipleProp,
    // native: nativeProp,
    // styleType: styleTypeProp,
    multiple,
    native,
    styleType,
  } = props;

  // const invalid = native && multiple;

  // let multiple = multipleProp;
  // let native = nativeProp;
  // let styleType = styleTypeProp;

  // // No multiple for native select
  // if (nativeProp) {
  //   multiple = undefined;
  // }

  const myNumber: number = 1;
  const myBoolean = myNumber === 1;

  return (
    <div
      style={{
        marginTop: '20px',
        border: '1px solid grey',
        padding: '5px',
      }}
    >
      {/* <b>
        {JSON.stringify({
          multiple: multipleProp,
          native: nativeProp,
          styleType: styleTypeProp,
        })}
      </b> */}

      <Select
        // multiple={undefined}
        // native={native}
        // native={nativeProp}
        // styleType='borderless'
        // native={false}
        multiple={multiple}
        styleType={'default'}
        // defaultValue={['3']}
        // defaultValue='3'
        // placeholder='Choose an option'
        // styleType={styleType}
        options={[
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
        ]}
      />
    </div>
  );
};
