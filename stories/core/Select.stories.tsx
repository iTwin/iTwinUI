// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MenuItem, Select } from '../../src/core';
import { SelectProps } from '../../src/core/Select/Select';
import { useState } from '@storybook/addons';
import SvgSmileyHappy from '@bentley/icons-generic-react/cjs/icons/SmileyHappy';
import SvgSmileyNeutral from '@bentley/icons-generic-react/cjs/icons/SmileyNeutral';
import SvgSmileySad from '@bentley/icons-generic-react/cjs/icons/SmileySad';

export default {
  title: 'Input/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'Select component to select value from options.',
      },
    },
  },
  argTypes: {
    style: { table: { disable: true } },
    className: { table: { disable: true } },
    menuStyle: { table: { disable: true } },
    menuClassName: { table: { disable: true } },
  },
} as Meta<SelectProps<unknown>>;

export const Basic: Story<SelectProps<number>> = (args) => {
  const {
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
    <div style={{ minHeight: 350 }}>
      <Select<number>
        options={options}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

Basic.args = {
  placeholder: 'Placeholder text',
  options: [
    { value: 1, label: 'Item #1' },
    { value: 2, label: 'Item #2' },
    { value: 3, label: 'Item #3' },
  ],
};

export const WithIcons: Story<SelectProps<string>> = (args) => {
  const {
    options = [
      { value: 'happy', label: 'Happy', icon: <SvgSmileyHappy /> },
      { value: 'neutral', label: 'Neutral', icon: <SvgSmileyNeutral /> },
      { value: 'sad', label: 'Sad', icon: <SvgSmileySad /> },
    ],
    placeholder = 'How are you today?',
    ...rest
  } = args;
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <div style={{ minHeight: 350 }}>
      <Select<string>
        options={options}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

WithIcons.args = {
  placeholder: 'How are you today?',
  options: [
    { value: 'happy', label: 'Happy', icon: <SvgSmileyHappy /> },
    { value: 'neutral', label: 'Neutral', icon: <SvgSmileyNeutral /> },
    { value: 'sad', label: 'Sad', icon: <SvgSmileySad /> },
  ],
};

export const WithSelectedValue: Story<SelectProps<number>> = (args) => {
  const {
    options = [
      { value: 1, label: 'Item #1' },
      { value: 2, label: 'Item #2' },
      { value: 3, label: 'Item #3' },
    ],
    placeholder = 'Placeholder text',
    ...rest
  } = args;
  const [value, setValue] = useState<number>(2);
  return (
    <div style={{ minHeight: 350 }}>
      <Select<number>
        options={options}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

WithSelectedValue.args = {
  placeholder: 'Placeholder text',
  options: [
    { value: 1, label: 'Item #1' },
    { value: 2, label: 'Item #2' },
    { value: 3, label: 'Item #3' },
  ],
  value: 2,
};

export const Disabled: Story<SelectProps<number>> = Basic.bind({});

Disabled.args = {
  disabled: true,
  options: [
    { value: 1, label: 'Item #1' },
    { value: 2, label: 'Item #2' },
    { value: 3, label: 'Item #3' },
  ],
};

export const DisabledWithSelectedValue: Story<
  SelectProps<number>
> = WithSelectedValue.bind({});

DisabledWithSelectedValue.args = {
  disabled: true,
  options: [
    { value: 1, label: 'Item #1' },
    { value: 2, label: 'Item #2' },
    { value: 3, label: 'Item #3' },
  ],
};

export const ManyItems: Story<SelectProps<number>> = (args) => {
  const { placeholder = 'Placeholder text', options, ...rest } = args;
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <div style={{ minHeight: 350 }}>
      <Select<number>
        options={
          options ||
          [...new Array(20)].map((_, index) => ({
            label: `Item #${index}`,
            value: index,
          }))
        }
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

ManyItems.args = {
  placeholder: 'Placeholder text',
};

ManyItems.argTypes = {
  options: { table: { disable: true } },
};

export const Custom: Story<SelectProps<string>> = (args) => {
  const {
    options = [
      { value: 'yellow', label: 'Yellow' },
      { value: 'green', label: 'Green' },
      { value: 'red', label: 'Red' },
    ],
    placeholder = 'Placeholder text',
    ...rest
  } = args;
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined,
  );
  return (
    <div style={{ minHeight: 350 }}>
      <Select<string>
        options={options}
        value={selectedValue}
        onChange={setSelectedValue}
        placeholder={placeholder}
        itemRenderer={(option) => (
          <MenuItem style={{ color: option.value }}>{option.label}</MenuItem>
        )}
        selectedItemRenderer={(option) => (
          <span style={{ backgroundColor: option.value }}>{option.label}</span>
        )}
        {...rest}
      />
    </div>
  );
};

Custom.args = {
  placeholder: 'Placeholder text',
  options: [
    { value: 'yellow', label: 'Yellow' },
    { value: 'green', label: 'Green' },
    { value: 'red', label: 'Red' },
  ],
};
