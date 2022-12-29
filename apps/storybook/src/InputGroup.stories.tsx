/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgCheckmark from '@itwin/itwinui-icons-react/cjs/icons/Checkmark';
import SvgSmileyHappy from '@itwin/itwinui-icons-react/cjs/icons/SmileyHappy';
import SvgSmileySad from '@itwin/itwinui-icons-react/cjs/icons/SmileySad';
import { action } from '@storybook/addon-actions';
import { useEffect, useState } from '@storybook/addons';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import {
  Checkbox,
  InputGroup,
  InputGroupProps,
  Radio,
  ToggleSwitch,
} from '@itwin/itwinui-react';

export default {
  title: 'Input/InputGroup',
  component: InputGroup,
  args: {
    displayStyle: 'default',
  },
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    id: { control: { disable: true } },
    svgIcon: { control: { disable: true } },
    children: { control: { disable: true } },
  },
} as Meta<InputGroupProps>;

export const RadioGroup: Story<InputGroupProps> = (args) => {
  const option1Label = <SvgSmileyHappy />;
  const option2Label = <SvgSmileySad />;
  return (
    <>
      <InputGroup
        label='Radio group'
        message='Tell me how happy you are'
        {...args}
      >
        <Radio
          name='choice'
          value='option1'
          onChange={action('Clicked option 1!')}
          label={option1Label}
          disabled={args.disabled}
          required={args.required}
        />
        <Radio
          name='choice'
          value='option2'
          onChange={action('Clicked option 2!')}
          label={option2Label}
          disabled={args.disabled}
          required={args.required}
        />
      </InputGroup>
    </>
  );
};

RadioGroup.args = {
  label: 'Radio group',
  message: 'Tell me how happy you are',
};

export const CheckboxGroup: Story<InputGroupProps> = (args) => {
  const option1Label = 'Football';
  const option2Label = 'Hockey';
  const [option1, setOption1] = useState(true);
  const [option2, setOption2] = useState(false);
  const [allOptions, setAllOptions] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(true);

  useEffect(() => {
    if (option1 && option2) {
      setAllOptions(true);
      setIsIndeterminate(false);
      return;
    }
    if (option1 || option2) {
      setAllOptions(false);
      setIsIndeterminate(true);
    } else {
      setAllOptions(false);
      setIsIndeterminate(false);
    }
  }, [option1, option2]);

  const onAllChange = (value: boolean) => {
    setAllOptions(value);
    setIsIndeterminate(false);
    setOption1(value);
    setOption2(value);
  };
  return (
    <InputGroup
      label='Select your hobbies'
      message='Choose some hobbies'
      {...args}
    >
      <Checkbox
        onChange={(event) => onAllChange(event.target.checked)}
        label='Select all'
        indeterminate={isIndeterminate}
        checked={allOptions}
        disabled={args.disabled}
        required={args.required}
      />
      <Checkbox
        onChange={(event) => setOption1(event.target.checked)}
        label={option1Label}
        checked={option1}
        disabled={args.disabled}
        required={args.required}
      />
      <Checkbox
        onChange={(event) => setOption2(event.target.checked)}
        label={option2Label}
        checked={option2}
        disabled={args.disabled}
        required={args.required}
      />
    </InputGroup>
  );
};

CheckboxGroup.args = {
  label: 'Select your hobbies',
  message: 'Choose some hobbies',
};

export const ToggleGroup: Story<InputGroupProps> = (args) => {
  const [option1, setOption1] = useState(true);
  const [option2, setOption2] = useState(false);

  return (
    <InputGroup label='Toggle group' {...args}>
      <ToggleSwitch
        onChange={(event) => setOption1(event.target.checked)}
        checked={option1}
        disabled={args.disabled}
        label='Toggle feature No.1'
        icon={<SvgCheckmark />}
      />
      <ToggleSwitch checked={true} disabled label='This you cannot change' />
      <ToggleSwitch
        onChange={(event) => setOption2(event.target.checked)}
        label='Toggle feature No.2'
        checked={option2}
        disabled={args.disabled}
      />
    </InputGroup>
  );
};

ToggleGroup.args = {
  label: 'Toggle group',
};
