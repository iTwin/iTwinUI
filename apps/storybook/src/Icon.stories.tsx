/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Icon, IconProps, Slider } from '@itwin/itwinui-react';
import {
  SvgInfoCircular,
  SvgPlaceholder,
  SvgStatusError,
  SvgStatusSuccess,
  SvgStatusWarning,
} from '@itwin/itwinui-icons-react';

export default {
  component: Icon,
  title: 'Utilities/Icon',
  argTypes: {
    size: {
      control: 'radio',
      options: ['auto', 'small', 'medium', 'large'],
    },
    fill: {
      control: 'radio',
      options: ['default', 'informational', 'positive', 'warning', 'negative'],
    },
  },
} as Meta<IconProps>;

export const Default: Story<IconProps> = (args) => {
  return (
    <Icon {...args}>
      <SvgPlaceholder />
    </Icon>
  );
};
Default.args = {
  size: 'medium',
  fill: 'default',
};

export const Statuses: Story<IconProps> = (args) => {
  return (
    <>
      <Icon fill='informational' {...args}>
        <SvgInfoCircular />
      </Icon>
      <Icon fill='negative' {...args}>
        <SvgStatusError />
      </Icon>
      <Icon fill='positive' {...args}>
        <SvgStatusSuccess />
      </Icon>
      <Icon fill='warning' {...args}>
        <SvgStatusWarning />
      </Icon>
    </>
  );
};
Statuses.args = {};
Statuses.decorators = [
  (Story) => (
    <div style={{ display: 'flex', gap: 4 }}>
      <Story />
    </div>
  ),
];

export const Sizes: Story<IconProps> = (args) => {
  return (
    <>
      <Icon size='small' {...args}>
        <SvgPlaceholder />
      </Icon>
      <Icon size='medium' {...args}>
        <SvgPlaceholder />
      </Icon>
      <Icon size='large' {...args}>
        <SvgPlaceholder />
      </Icon>
    </>
  );
};
Sizes.args = {};
Sizes.decorators = Statuses.decorators;

export const Autoscale: Story<IconProps> = (args) => {
  return (
    <Icon {...args}>
      <SvgPlaceholder />
    </Icon>
  );
};
Autoscale.args = {
  size: 'auto',
  fill: 'default',
};
Autoscale.decorators = [
  (Story) => (
    <AutoScaleContraption>
      <Story />
    </AutoScaleContraption>
  ),
];

/** Helper component to demonstrate auto-scaling text using a slider to adjust font size */
const AutoScaleContraption = ({ children }: { children: React.ReactNode }) => {
  const [size, setSize] = React.useState(() => 14 / 16);

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'start' }}>
      <p
        style={{
          width: 'min(400px, 90%)',
          fontSize: `${size}rem`,
          lineHeight: 1.3,
        }}
      >
        <span style={{ marginRight: 4, verticalAlign: 'middle' }}>
          {children}
        </span>
        This icon will scale with text. Try adjusting the slider.
      </p>

      <Slider
        orientation='vertical'
        values={[size]}
        onUpdate={([newSize]) => setSize(newSize)}
        min={0.5}
        max={2.5}
        step={0.05}
        minLabel=''
        maxLabel=''
        tooltipProps={() => ({ visible: false })}
        style={{ height: 'min(150px, 90vh)' }}
        thumbProps={() => ({ 'aria-label': 'Adjust font size' })}
      />
    </div>
  );
};
