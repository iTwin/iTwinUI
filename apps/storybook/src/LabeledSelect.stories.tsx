/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Meta, Story } from '@storybook/react';
import { LabeledSelect, LabeledSelectProps } from '@itwin/itwinui-react';
import SvgCamera from '@itwin/itwinui-icons-react/cjs/icons/Camera';
import { useState } from '@storybook/addons';

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
  args: {
    label: 'This is a label',
    message: 'This is a message',
    placeholder: 'Placeholder text',
    displayStyle: 'default',
    options: [
      { value: 1, label: 'Item #1' },
      { value: 2, label: 'Item #2' },
      { value: 3, label: 'Item #3' },
    ],
  },
  argTypes: {
    style: { control: { disable: true } },
    className: { control: { disable: true } },
    selectStyle: { control: { disable: true } },
    selectClassName: { control: { disable: true } },
    menuStyle: { control: { disable: true } },
    menuClassName: { control: { disable: true } },
    svgIcon: { control: { disable: true } },
  },
} as Meta<LabeledSelectProps<unknown>>;

export const Basic: Story<LabeledSelectProps<number>> = (args) => {
  const {
    label = 'This is a label',
    message = 'This is a message',
    options = [
      { value: 1, label: 'Item #1' },
      { value: 2, label: 'Item #2' },
      { value: 3, label: 'Item #3' },
    ],
    placeholder = 'Placeholder text',
    ...rest
  } = args;
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <LabeledSelect<number>
      label={label}
      options={options}
      message={message}
      placeholder={placeholder}
      value={value}
      onChange={(value) => setValue(value)}
      {...rest}
    />
  );
};

export const Positive: Story<LabeledSelectProps<number>> = (args) => {
  const {
    label = 'This is a label',
    message = 'This is a message',
    options = [
      { value: 1, label: 'Item #1' },
      { value: 2, label: 'Item #2' },
      { value: 3, label: 'Item #3' },
    ],
    placeholder = 'Placeholder text',
    ...rest
  } = args;
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <LabeledSelect<number>
      label={label}
      options={options}
      message={message}
      placeholder={placeholder}
      value={value}
      onChange={(value) => setValue(value)}
      status='positive'
      {...rest}
    />
  );
};

Positive.args = {
  status: 'positive',
};

export const Warning: Story<LabeledSelectProps<number>> = (args) => {
  const {
    label = 'This is a label',
    message = 'This is a message',
    options = [
      { value: 1, label: 'Item #1' },
      { value: 2, label: 'Item #2' },
      { value: 3, label: 'Item #3' },
    ],
    placeholder = 'Placeholder text',
    ...rest
  } = args;
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <LabeledSelect<number>
      label={label}
      options={options}
      message={message}
      placeholder={placeholder}
      value={value}
      onChange={(value) => setValue(value)}
      status='warning'
      {...rest}
    />
  );
};

Warning.args = {
  status: 'warning',
};

export const Negative: Story<LabeledSelectProps<number>> = (args) => {
  const {
    label = 'This is a label',
    message = 'This is a message',
    options = [
      { value: 1, label: 'Item #1' },
      { value: 2, label: 'Item #2' },
      { value: 3, label: 'Item #3' },
    ],
    placeholder = 'Placeholder text',
    ...rest
  } = args;
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <LabeledSelect<number>
      label={label}
      options={options}
      message={message}
      placeholder={placeholder}
      value={value}
      onChange={(value) => setValue(value)}
      status='negative'
      {...rest}
    />
  );
};

Negative.args = {
  status: 'negative',
};

export const WithCustomIcon: Story<LabeledSelectProps<number>> = (args) => {
  const {
    label = 'This is a label',
    message = 'This is a message',
    options = [
      { value: 1, label: 'Item #1' },
      { value: 2, label: 'Item #2' },
      { value: 3, label: 'Item #3' },
    ],
    placeholder = 'Placeholder text',
    svgIcon = <SvgCamera />,
    ...rest
  } = args;
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <LabeledSelect<number>
      label={label}
      options={options}
      message={message}
      placeholder={placeholder}
      value={value}
      onChange={(value) => setValue(value)}
      svgIcon={svgIcon}
      {...rest}
    />
  );
};

WithCustomIcon.args = {
  svgIcon: <SvgCamera />,
};
