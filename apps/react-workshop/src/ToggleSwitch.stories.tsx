/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { SvgLightbulb } from '@itwin/itwinui-icons-react';
import { ToggleSwitch } from '@itwin/itwinui-react';
import type { StoryDefault } from '@ladle/react';

export default {
  title: 'ToggleSwitch',
  decorators: [
    (Story) => (
      <div style={{ padding: '5.5px 0' }}>
        <Story />
      </div>
    ),
  ],
} satisfies StoryDefault;

export const Basic = () => {
  return <ToggleSwitch defaultChecked />;
};

export const Small = () => {
  return <ToggleSwitch defaultChecked size='small' />;
};

export const DisabledChecked = () => {
  return <ToggleSwitch defaultChecked disabled />;
};

export const DisabledUnchecked = () => {
  return <ToggleSwitch disabled />;
};

export const LabelRight = () => {
  return (
    <ToggleSwitch
      defaultChecked
      label='This is a right label'
      labelPosition='right'
    />
  );
};

export const LabelLeft = () => {
  return <ToggleSwitch label='This is a left label' labelPosition='left' />;
};

export const WithCustomIcon = () => {
  return <ToggleSwitch defaultChecked icon={<SvgLightbulb />} />;
};
