// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import {
  SvgCheckmark,
  SvgSmileyHappy,
  SvgSmileySad,
} from '@bentley/icons-generic-react';
import {
  SvgRevit,
  SvgDgnDb,
} from '@bentley/icons-generic-react/lib/icons/file-types';
import { action } from '@storybook/addon-actions';
import { useEffect, useState } from '@storybook/addons';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Checkbox, Radio, ToggleSwitch } from '../../src/core';
import { InputGroup } from '../../src/core/InputGroup';
import { InputGroupProps } from '../../src/core/InputGroup/InputGroup';

export default {
  title: 'Input/InputGroup',
  component: InputGroup,
  parameters: {
    docs: { description: { component: 'Group checkboxes or radios together' } },
  },
  argTypes: {
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    svgIcon: { table: { disable: true } },
  },
} as Meta<InputGroupProps>;

export const RadioGroup: Story<InputGroupProps> = (args) => {
  const option1Label = (
    <div style={{ display: 'flex' }}>
      <SvgSmileyHappy style={{ width: 16, height: 16 }} />
    </div>
  );
  const option2Label = (
    <div style={{ display: 'flex' }}>
      <SvgSmileySad style={{ width: 16, height: 16 }} />
    </div>
  );
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
        />
        <Radio
          name='choice'
          value='option2'
          onChange={action('Clicked option 2!')}
          label={option2Label}
          setFocus={true}
          disabled={args.disabled}
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
  const option1Label = (
    <div style={{ display: 'flex' }}>
      <SvgRevit style={{ width: 16, height: 16 }} />
    </div>
  );
  const option2Label = (
    <div style={{ display: 'flex' }}>
      <SvgDgnDb style={{ width: 16, height: 16 }} />
    </div>
  );
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
      label='Checkbox group'
      message='Choose some file types'
      {...args}
    >
      <Checkbox
        onChange={(event) => onAllChange(event.target.checked)}
        indeterminate={isIndeterminate}
        checked={allOptions}
        disabled={args.disabled}
      />
      <Checkbox
        onChange={(event) => setOption1(event.target.checked)}
        label={option1Label}
        checked={option1}
        disabled={args.disabled}
      />
      <Checkbox
        onChange={(event) => setOption2(event.target.checked)}
        label={option2Label}
        checked={option2}
        disabled={args.disabled}
      />
    </InputGroup>
  );
};

CheckboxGroup.args = {
  label: 'Checkbox group',
  message: 'Choose some file types',
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
