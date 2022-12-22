/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React, { useCallback } from 'react';
import { Story, Meta } from '@storybook/react';
import {
  MenuItem,
  Select,
  MiddleTextTruncation,
  SelectProps,
} from '@itwin/itwinui-react';
import { useState } from '@storybook/addons';
import SvgSmileyHappy from '@itwin/itwinui-icons-react/cjs/icons/SmileyHappy';
import SvgSmileyNeutral from '@itwin/itwinui-icons-react/cjs/icons/SmileyNeutral';
import SvgSmileySad from '@itwin/itwinui-icons-react/cjs/icons/SmileySad';

export default {
  title: 'Input/Select',
  component: Select,
  argTypes: {
    style: { control: { disable: true } },
    className: { control: { disable: true } },
    id: { control: { disable: true } },
    menuStyle: { control: { disable: true } },
    menuClassName: { control: { disable: true } },
  },
  decorators: [
    (Story, context) =>
      context.story.includes('Truncate Middle Text') ? (
        <div style={{ minHeight: 365, width: 300 }}>
          <Story />
        </div>
      ) : (
        <div style={{ minHeight: 365 }}>
          <Story />
        </div>
      ),
  ],
} as Meta<SelectProps<unknown>>;

export const Basic: Story<SelectProps<number>> = (args) => {
  const {
    options = [
      { value: 1, label: 'Item #1' },
      { value: 2, label: 'Item #2', disabled: true },
      { value: 3, label: 'Item #3' },
    ],
    placeholder = 'Placeholder text',
    ...rest
  } = args;
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <Select<number>
      {...rest}
      options={options}
      value={value}
      onChange={setValue}
      placeholder={placeholder}
    />
  );
};

Basic.args = {
  placeholder: 'Placeholder text',
  options: [
    { value: 1, label: 'Item #1' },
    { value: 2, label: 'Item #2', disabled: true },
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
    <Select<string>
      {...rest}
      options={options}
      value={value}
      onChange={setValue}
      placeholder={placeholder}
    />
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
    <Select<number>
      options={options}
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      popoverProps={{ visible: true }}
      {...rest}
    />
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
  popoverProps: { visible: true },
};

export const Disabled: Story<SelectProps<number>> = (args) => {
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
        disabled
        {...rest}
        options={options}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
      />
    </div>
  );
};

Disabled.args = {
  disabled: true,
  options: [
    { value: 1, label: 'Item #1' },
    { value: 2, label: 'Item #2' },
    { value: 3, label: 'Item #3' },
  ],
};

export const DisabledWithSelectedValue: Story<SelectProps<number>> = (args) => {
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
        popoverProps={{ visible: true }}
        disabled
        {...rest}
      />
    </div>
  );
};

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
    <Select<number>
      {...rest}
      options={
        options ||
        [...Array(20).fill(null)].map((_, index) => ({
          label: `Item #${index}`,
          value: index,
        }))
      }
      value={value}
      onChange={setValue}
      placeholder={placeholder}
    />
  );
};

ManyItems.args = {
  placeholder: 'Placeholder text',
};

ManyItems.argTypes = {
  options: { control: { disable: true } },
};

export const Sublabels: Story<SelectProps<number>> = (args) => {
  const {
    options = [
      { value: 1, label: 'Item #1', sublabel: 'Sublabel #1' },
      { value: 2, label: 'Item #2', sublabel: 'Sublabel #2' },
      { value: 3, label: 'Item #3', sublabel: 'Sublabel #3' },
    ],
    placeholder = 'Placeholder text',
    size = 'large',
    ...rest
  } = args;
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <Select<number>
      {...rest}
      options={options}
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      size={size}
    />
  );
};

Sublabels.args = {
  placeholder: 'Placeholder text',
  size: 'large',
  options: [
    { value: 1, label: 'Item #1', sublabel: 'Sublabel #1' },
    { value: 2, label: 'Item #2', sublabel: 'Sublabel #2' },
    { value: 3, label: 'Item #3', sublabel: 'Sublabel #3' },
  ],
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
    <Select<string>
      {...rest}
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
    />
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

export const TruncateMiddleText: Story<SelectProps<string>> = (args) => {
  const {
    options = [
      {
        value:
          'MyFileWithAReallyLongNameThatWillBeTruncatedBecauseItIsReallyThatLongSoHardToBelieve_FinalVersion_V2.html',
        label:
          'MyFileWithAReallyLongNameThatWillBeTruncatedBecauseItIsReallyThatLongSoHardToBelieve_FinalVersion_V2.html',
      },
      { value: 'ShortNameFile.jpg', label: 'ShortNameFile.jpg' },
      { value: 'SomeOtherFile.dgn', label: 'SomeOtherFile.dgn' },
    ],
    placeholder = 'Placeholder text',
    ...rest
  } = args;
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    options[0].value,
  );

  const textRenderer = useCallback(
    (truncatedText: string, originalText: string) => (
      <span title={truncatedText !== originalText ? originalText : undefined}>
        {truncatedText}
      </span>
    ),
    [],
  );

  return (
    <Select<string>
      {...rest}
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder={placeholder}
      itemRenderer={(option) => (
        <MenuItem>
          <MiddleTextTruncation
            text={option.label}
            textRenderer={textRenderer}
          />
        </MenuItem>
      )}
      selectedItemRenderer={(option) => (
        <MiddleTextTruncation text={option.label} textRenderer={textRenderer} />
      )}
    />
  );
};

export const Multi: Story<SelectProps<number>> = (args) => {
  const { placeholder = 'Placeholder text', ...rest } = args;
  const [value, setValue] = useState<number[]>([]);
  return (
    <div style={{ minHeight: 350 }}>
      <Select<number>
        {...rest}
        options={[...Array(20).fill(null)].map((_, index) => ({
          label: `Item #${index}`,
          value: index,
        }))}
        value={value}
        onChange={(val, event) =>
          setValue((prev) =>
            event === 'removed'
              ? prev.filter((value) => val !== value)
              : [...prev, val],
          )
        }
        placeholder={placeholder}
        multiple
      />
    </div>
  );
};

Multi.args = {
  placeholder: 'Placeholder text',
};

Multi.argTypes = {
  options: { control: { disable: true } },
};

export const MultiCustomRenderer: Story<SelectProps<number>> = (args) => {
  const { placeholder = 'Placeholder text', ...rest } = args;
  const [value, setValue] = useState<number[]>([]);

  return (
    <div style={{ minHeight: 350 }}>
      <Select<number>
        {...rest}
        options={[...Array(20).fill(null)].map((_, index) => ({
          label: `Item #${index}`,
          value: index,
        }))}
        value={value}
        onChange={(val, event) =>
          setValue((prev) =>
            event === 'removed'
              ? prev.filter((value) => val !== value)
              : [...(prev ?? []), val],
          )
        }
        placeholder={placeholder}
        multiple
        selectedItemRenderer={(options) => (
          <>{options.map((option) => option.label).join(', ')}</>
        )}
      />
    </div>
  );
};

MultiCustomRenderer.args = {
  placeholder: 'Placeholder text',
};

MultiCustomRenderer.argTypes = {
  options: { control: { disable: true } },
};
