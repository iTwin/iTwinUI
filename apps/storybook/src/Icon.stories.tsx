/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Icon, Slider, Flex } from '@itwin/itwinui-react';
import {
  SvgInfoCircular,
  SvgPlaceholder,
  SvgStatusError,
  SvgStatusSuccess,
  SvgStatusWarning,
} from '@itwin/itwinui-icons-react';

export default {
  title: 'Utilities/Icon',
};

export const Default = () => {
  return (
    <Icon>
      <SvgPlaceholder />
    </Icon>
  );
};

export const Padded = () => {
  return (
    <Flex
      style={{
        border: '1px solid red',
        width: 'fit-content',
      }}
    >
      <Icon padded>
        <SvgPlaceholder />
      </Icon>
    </Flex>
  );
};

export const Statuses = () => {
  return (
    <>
      <Icon fill='informational'>
        <SvgInfoCircular />
      </Icon>
      <Icon fill='negative'>
        <SvgStatusError />
      </Icon>
      <Icon fill='positive'>
        <SvgStatusSuccess />
      </Icon>
      <Icon fill='warning'>
        <SvgStatusWarning />
      </Icon>
    </>
  );
};
Statuses.decorators = [
  (Story) => (
    <div style={{ display: 'flex', gap: 4 }}>
      <Story />
    </div>
  ),
];

export const Sizes = () => {
  return (
    <>
      <Icon size='small'>
        <SvgPlaceholder />
      </Icon>
      <Icon size='medium'>
        <SvgPlaceholder />
      </Icon>
      <Icon size='large'>
        <SvgPlaceholder />
      </Icon>
    </>
  );
};
Sizes.decorators = Statuses.decorators;

export const Autoscale = () => {
  return (
    <Icon>
      <SvgPlaceholder />
    </Icon>
  );
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
