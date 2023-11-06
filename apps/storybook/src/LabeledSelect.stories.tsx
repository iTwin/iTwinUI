/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { LabeledSelect } from '@itwin/itwinui-react';
import SvgCamera from '@itwin/itwinui-icons-react/cjs/icons/Camera';

export default {
  title: 'Input/LabeledSelect',
  component: LabeledSelect,
  decorators: [
    (Story) => (
      // Body height is the same as Select component height therefore clicking outside would not close dropdown.
      <div style={{ minHeight: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export const Basic = () => {
  const [value, setValue] = React.useState<number | undefined>(undefined);
  return (
    <LabeledSelect<number>
      label='This is a label'
      options={[
        { value: 1, label: 'Item #1' },
        { value: 2, label: 'Item #2' },
        { value: 3, label: 'Item #3' },
      ]}
      message='This is a message'
      placeholder='Placeholder text'
      value={value}
      onChange={(value) => setValue(value)}
    />
  );
};

export const Positive = () => {
  const [value, setValue] = React.useState<number | undefined>(undefined);
  return (
    <LabeledSelect<number>
      label='This is a label'
      options={[
        { value: 1, label: 'Item #1' },
        { value: 2, label: 'Item #2' },
        { value: 3, label: 'Item #3' },
      ]}
      message='This is a message'
      placeholder='Placeholder text'
      value={value}
      onChange={(value) => setValue(value)}
      status='positive'
    />
  );
};

export const Warning = () => {
  const [value, setValue] = React.useState<number | undefined>(undefined);
  return (
    <LabeledSelect<number>
      label='This is a label'
      options={[
        { value: 1, label: 'Item #1' },
        { value: 2, label: 'Item #2' },
        { value: 3, label: 'Item #3' },
      ]}
      message='This is a message'
      placeholder='Placeholder text'
      value={value}
      onChange={(value) => setValue(value)}
      status='warning'
    />
  );
};

export const Negative = () => {
  const [value, setValue] = React.useState<number | undefined>(undefined);
  return (
    <LabeledSelect<number>
      label='This is a label'
      options={[
        { value: 1, label: 'Item #1' },
        { value: 2, label: 'Item #2' },
        { value: 3, label: 'Item #3' },
      ]}
      message='This is a message'
      placeholder='Placeholder text'
      value={value}
      onChange={(value) => setValue(value)}
      status='negative'
    />
  );
};

export const WithCustomIcon = () => {
  const [value, setValue] = React.useState<number | undefined>(undefined);
  return (
    <LabeledSelect<number>
      label='This is a label'
      options={[
        { value: 1, label: 'Item #1' },
        { value: 2, label: 'Item #2' },
        { value: 3, label: 'Item #3' },
      ]}
      message='This is a message'
      placeholder='Placeholder text'
      value={value}
      onChange={(value) => setValue(value)}
      svgIcon={<SvgCamera />}
    />
  );
};
