/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgCheckmark from '@itwin/itwinui-icons-react/cjs/icons/Checkmark';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { ToggleSwitch } from '../../src/core';
import { ToggleSwitchProps } from '../../src/core/ToggleSwitch/ToggleSwitch';

export default {
  title: 'Input/ToggleSwitch',
  component: ToggleSwitch,
} as Meta<ToggleSwitchProps>;

export const Basic: Story<ToggleSwitchProps> = (args) => {
  return <ToggleSwitch defaultChecked {...args} />;
};

export const DisabledChecked: Story<ToggleSwitchProps> = (args) => {
  const { disabled = true, ...rest } = args;
  return <ToggleSwitch defaultChecked disabled={disabled} {...rest} />;
};

DisabledChecked.args = {
  disabled: true,
};

export const DisabledUnchecked: Story<ToggleSwitchProps> = (args) => {
  const { disabled = true, ...rest } = args;
  return <ToggleSwitch disabled={disabled} {...rest} />;
};

DisabledUnchecked.args = {
  disabled: true,
};

export const LabelRight: Story<ToggleSwitchProps> = (args) => {
  const {
    label = 'This is a right label',
    labelPosition = 'right',
    ...rest
  } = args;
  return (
    <ToggleSwitch
      defaultChecked
      label={label}
      labelPosition={labelPosition}
      {...rest}
    />
  );
};

LabelRight.args = {
  label: 'This is a right label',
  labelPosition: 'right',
};

export const LabelLeft: Story<ToggleSwitchProps> = (args) => {
  const {
    label = 'This is a left label',
    labelPosition = 'left',
    ...rest
  } = args;
  return <ToggleSwitch label={label} labelPosition={labelPosition} {...rest} />;
};

LabelLeft.args = {
  label: 'This is a left label',
  labelPosition: 'left',
};

export const WithIcon: Story<ToggleSwitchProps> = (args) => {
  const { icon = <SvgCheckmark />, ...rest } = args;
  return <ToggleSwitch defaultChecked icon={icon} {...rest} />;
};

WithIcon.args = {
  icon: <SvgCheckmark />,
};
