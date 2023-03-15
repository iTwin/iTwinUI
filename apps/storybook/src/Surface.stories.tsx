/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  Surface,
  SurfaceProps,
  Code,
  Text,
  Divider,
  Button,
  Anchor,
  Flex,
  IconButton,
} from '@itwin/itwinui-react';
import { SvgActivity, SvgSettings } from '@itwin/itwinui-icons-react';

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

export const Custom: Story<SurfaceProps> = (args) => {
  const { elevation, hasLayout, isPadded } = args;
  return (
    <Surface elevation={elevation} hasLayout={hasLayout} {...args}>
      <Surface.Header>
        <Flex justifyContent={'space-between'} style={{ flexGrow: '1' }}>
          <Text variant='subheading' as='h2'>
            Custom surface
          </Text>
          <IconButton styleType='borderless'>
            <SvgSettings />
          </IconButton>
        </Flex>
      </Surface.Header>
      <Surface.Body isPadded={isPadded}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Surface.Body>
    </Surface>
  );
};

Custom.args = { elevation: 1, hasLayout: true, isPadded: true };

export const Overflow: Story<SurfaceProps> = (args) => {
  const { elevation, hasLayout, isPadded } = args;
  const cardStyle = {
    maxHeight: '300px',
  };
  return (
    <Surface elevation={elevation} style={cardStyle} hasLayout={hasLayout}>
      <Surface.Header>
        <Text variant='subheading' as='h2'>
          Surface with overflow & button footer
        </Text>
      </Surface.Header>
      <Surface.Body isPadded={isPadded}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
      </Surface.Body>
      <Divider />
      <Button styleType='borderless'>View All</Button>
    </Surface>
  );
};

Overflow.args = { elevation: 1, hasLayout: true, isPadded: true };

export const NoPadding: Story<SurfaceProps> = (args) => {
  const { elevation, hasLayout, isPadded } = args;

  const cardStyle = {
    maxHeight: '300px',
  };
  return (
    <Surface elevation={elevation} style={cardStyle} hasLayout={hasLayout}>
      <style>
        {`ul { all: unset; display: flex; flex-direction: column; flex: 1; list-style-type: none; }`}
        {`ul li { padding: var(--iui-size-s); position: relative; }`}
        {`ul li:not(:first-of-type) { border-top: 1px solid var(--iui-surface-border-color); }`}
        {`ul li a::after {content: ''; position: absolute; inset: 0; }`}
      </style>
      <Surface.Header>
        <Text variant='subheading' as='h2'>
          Surface with overflow & no body padding
        </Text>
      </Surface.Header>
      <Surface.Body isPadded={isPadded}>
        <ul>
          <li>
            <Anchor>Daily log</Anchor>
          </li>
          <li>
            <Anchor>Inspections</Anchor>
          </li>
          <li>
            <Anchor>Issues</Anchor>
          </li>
          <li>
            <Anchor>Observations</Anchor>
          </li>
          <li>
            <Anchor>RFIs</Anchor>
          </li>
          <li>
            <Anchor>Weather delay notices</Anchor>
          </li>
        </ul>
      </Surface.Body>
    </Surface>
  );
};

NoPadding.args = { elevation: 1, hasLayout: true, isPadded: false };

export const EmptyState: Story<SurfaceProps> = (args) => {
  const { elevation, hasLayout, isPadded } = args;

  const cardStyle = {
    height: '300px',
  };

  return (
    <Surface elevation={elevation} style={cardStyle} hasLayout={hasLayout}>
      <Surface.Header>
        <Text variant='subheading' as='h2'>
          Surface with empty state
        </Text>
      </Surface.Header>
      <Surface.Body style={{ display: 'flex' }} isPadded={isPadded}>
        <Flex
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'column'}
          style={{ flexGrow: '1', textAlign: 'center' }}
        >
          <SvgActivity />
          <Text variant='body' isMuted={true}>
            No new activity
          </Text>
        </Flex>
      </Surface.Body>
    </Surface>
  );
};

EmptyState.args = { elevation: 1, hasLayout: true, isPadded: true };
