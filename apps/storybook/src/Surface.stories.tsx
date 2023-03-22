/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  Surface,
  SurfaceProps,
  SurfaceBodyProps,
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

export const Custom: Story<SurfaceProps & SurfaceBodyProps> = (args) => {
  const { elevation, isPadded } = args;
  return (
    <Surface elevation={elevation} {...args}>
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

Custom.args = { elevation: 1, isPadded: true };

export const OverflowWithButtonFooter: Story<
  SurfaceProps & SurfaceBodyProps
> = (args) => {
  const { elevation, isPadded } = args;
  const cardStyle = {
    maxHeight: '300px',
  };
  return (
    <Surface elevation={elevation} style={cardStyle}>
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

OverflowWithButtonFooter.args = {
  elevation: 1,
  isPadded: true,
};

export const NoPadding: Story<SurfaceProps & SurfaceBodyProps> = (args) => {
  const { elevation, isPadded } = args;

  const listStyle = {
    padding: 'var(--iui-size-s)',
    position: 'relative',
  } as React.CSSProperties;
  const cardStyle = {
    maxHeight: '300px',
  };
  return (
    <Surface elevation={elevation} style={cardStyle}>
      <Surface.Header>
        <Text variant='subheading' as='h2'>
          Surface with overflow & no body padding
        </Text>
      </Surface.Header>
      <Surface.Body isPadded={isPadded}>
        <Flex flexDirection='column' style={{ flex: '1' }}>
          <ul
            style={{
              width: '100%',
              listStyle: 'none',
              margin: '0',
              padding: '0',
            }}
          >
            <li style={listStyle}>
              <Anchor>Daily log</Anchor>
            </li>
            <Divider />
            <li style={listStyle}>
              <Anchor>Inspections</Anchor>
            </li>
            <Divider />
            <li style={listStyle}>
              <Anchor>Issues</Anchor>
            </li>
            <Divider />
            <li style={listStyle}>
              <Anchor>Observations</Anchor>
            </li>
            <Divider />
            <li style={listStyle}>
              <Anchor>RFIs</Anchor>
            </li>
            <Divider />
            <li style={listStyle}>
              <Anchor>Weather delay notices</Anchor>
            </li>
          </ul>
        </Flex>
      </Surface.Body>
    </Surface>
  );
};

NoPadding.args = { elevation: 1, isPadded: false };

export const EmptyState: Story<SurfaceProps & SurfaceBodyProps> = (args) => {
  const { elevation, isPadded } = args;

  const cardStyle = {
    height: '300px',
  };

  return (
    <Surface elevation={elevation} style={cardStyle}>
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

EmptyState.args = { elevation: 1, isPadded: true };
