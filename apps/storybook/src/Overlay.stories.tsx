/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import * as React from 'react';
import { Overlay, ProgressLinear, ProgressRadial } from '@itwin/itwinui-react';

type OverlayProps = React.ComponentProps<typeof Overlay>;

export default {
  component: Overlay,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
  title: 'Core/Overlay',
} as Meta<OverlayProps>;

export const Linear: Story<OverlayProps> = () => {
  const wrapperStyle = {
    border: '1px solid var(--iui-color-border)',
    position: 'relative',
    marginBottom: '12px',
  } as React.CSSProperties;

  // main div -> <Overlay>
  // div with text -> <Overlay.HiddenContent> (no class name. needs inert HTML prop) <div inert>{children}</div>
  // current Overlay -> <Overlay.Message> (add iui-progress-indicator-overlay classname to the div)

  return (
    <Overlay style={wrapperStyle}>
      <Overlay.HiddenContent style={{ padding: '12px' }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Overlay.HiddenContent>
      <Overlay.Message>
        <ProgressLinear indeterminate={true} />
      </Overlay.Message>
    </Overlay>
  );
};

export const Radial: Story<OverlayProps> = () => {
  const wrapperStyle = {
    border: '1px solid var(--iui-color-border)',
    position: 'relative',
    marginBottom: '12px',
  } as React.CSSProperties;

  return (
    <Overlay style={wrapperStyle}>
      <Overlay.HiddenContent style={{ padding: '12px' }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Overlay.HiddenContent>
      <Overlay.Message>
        <ProgressRadial indeterminate={true} />
      </Overlay.Message>
    </Overlay>
  );
};
Linear.args = {};
Radial.args = {};
