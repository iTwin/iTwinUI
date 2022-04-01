/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { MenuItem, Select, MiddleTextTruncation } from '../../src/core';
import { SelectProps } from '../../src/core/Select/Select';
import { useState } from '@storybook/addons';
import SvgSmileyHappy from '@itwin/itwinui-icons-react/cjs/icons/SmileyHappy';
import SvgSmileyNeutral from '@itwin/itwinui-icons-react/cjs/icons/SmileyNeutral';
import SvgSmileySad from '@itwin/itwinui-icons-react/cjs/icons/SmileySad';
import { CreeveyMeta, CreeveyStory } from 'creevey';

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
  parameters: {
    creevey: {
      skip: {
        stories: ['Disabled With Selected Value', 'With Selected Value'],
      },
      tests: {
        async open() {
          const button = await this.browser.findElement({
            className: 'iui-select-button',
          });
          const closed = await this.takeScreenshot();

          await button.sendKeys(' ');
          const opened = await this.takeScreenshot();

          const menuItem = await this.browser.findElement({
            css: '.iui-menu li:last-child',
          });
          await menuItem.click();
          const selected = await this.takeScreenshot();

          await button.sendKeys(' ');
          const openedWithValue = await this.takeScreenshot();

          await this.expect({
            closed,
            opened,
            selected,
            openedWithValue,
          }).to.matchImages();
        },
      },
    },
  },
} as Meta<SelectProps<unknown>> & CreeveyMeta;

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
    <div style={{ minHeight: 350 }}>
      <Select<number>
        {...rest}
        options={options}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
      />
    </div>
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
    <div style={{ minHeight: 350 }}>
      <Select<string>
        {...rest}
        options={options}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
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
        popoverProps={{ visible: true }}
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
  popoverProps: { visible: true },
};

export const Disabled: Story<SelectProps<number>> & CreeveyStory = (args) => {
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

Disabled.parameters = {
  creevey: {
    tests: {
      async open() {
        await this.expect(await this.takeScreenshot()).to.matchImage('open');
      },
    },
  },
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
    <div style={{ minHeight: 350 }}>
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
    </div>
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
    <div style={{ minHeight: 350 }}>
      <Select<number>
        {...rest}
        options={options}
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        size={size}
      />
    </div>
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
    <div style={{ minHeight: 350 }}>
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
  return (
    <div style={{ minHeight: 350, width: 300 }}>
      <Select<string>
        {...rest}
        options={options}
        value={selectedValue}
        onChange={setSelectedValue}
        placeholder={placeholder}
        itemRenderer={(option) => (
          <MenuItem>
            <MiddleTextTruncation text={option.label} />
          </MenuItem>
        )}
        selectedItemRenderer={(option) => (
          <MiddleTextTruncation text={option.label} />
        )}
      />
    </div>
  );
};
