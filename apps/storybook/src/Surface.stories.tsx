/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Surface, SurfaceProps, Code } from '@itwin/itwinui-react';

export default {
  component: Surface,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    id: { control: { disable: true } },
    elevation: {
      options: [0, 1, 2, 3, 4, 5],
    },
  },
  title: 'Core/Surface',
} as Meta<SurfaceProps>;

export const Basic: Story<SurfaceProps> = ({ elevation }) => {
  const cardStyle = {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px',
  };
  return (
    <Surface elevation={elevation} style={cardStyle}>
      <p>
        The Surface container allows content to appear elevated through the use
        of a drop shadow. Change the <Code>elevation</Code> property of the
        component to adjust the shadow level.
      </p>
    </Surface>
  );
};

Basic.args = { elevation: 1 };
