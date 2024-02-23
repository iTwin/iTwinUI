import * as React from 'react';
import {
  Checkbox,
  Divider,
  InputGroup,
  LabeledSelect,
  Radio,
  StatusMessage,
} from '@itwin/itwinui-react';
import { SvgCheckmark, SvgStar } from '@itwin/itwinui-icons-react';

export default function App() {
  const CustomDivider = () => (
    <Divider
      style={{
        margin: '10px',
      }}
    />
  );

  return (
    <>
      {/* ✅ LabeledSelect */}
      <LabeledSelect
        label='Select Label'
        options={[
          { value: 1, label: 'Item #1' },
          { value: 2, label: 'Item #2' },
          { value: 3, label: 'Item #3' },
        ]}
        status='positive'
        svgIcon={<SvgStar />}
        message={'Help message'}
      />

      <LabeledSelect
        label='Select Label'
        options={[
          { value: 1, label: 'Item #1' },
          { value: 2, label: 'Item #2' },
          { value: 3, label: 'Item #3' },
        ]}
        status='positive'
        message={
          <StatusMessage status='positive' startIcon={<SvgStar />}>
            Help message
          </StatusMessage>
        }
      />

      <CustomDivider />

      {/* ❌ InputGroup */}
      <InputGroup
        label='Checkbox group'
        svgIcon={<SvgStar />}
        status='positive'
        message='Help message'
      >
        <Checkbox label='Select all' />
        <Checkbox label='Football' />
        <Checkbox label='Hockey' />
      </InputGroup>

      {/* ❌ Passing <StatusMessage startIcon={…} /> to the message of <InputGroup status="…" /> shows duplicate status icons */}
      <InputGroup
        label='Checkbox group'
        status='positive'
        svgIcon={<SvgCheckmark />}
        message='Help message'
        // message={
        //   <StatusMessage startIcon={<SvgStar />} status='positive'>
        //     Help message
        //   </StatusMessage>
        // }
      >
        <Checkbox label='Select all' />
        <Checkbox label='Football' />
        <Checkbox label='Hockey' />
      </InputGroup>

      <InputGroup
        label='some label'
        message={
          <StatusMessage>
            <div className='my-message'>Message</div>
          </StatusMessage>
        }
      >
        <Radio />
        <Radio />
        <Radio />
      </InputGroup>
    </>
  );
}
