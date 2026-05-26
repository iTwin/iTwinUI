/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Surface,
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
  title: 'Surface',
};

export const Basic = () => {
  const cardStyle = {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px',
  };
  return (
    <Surface elevation={1} style={cardStyle}>
      <Text>
        The Surface container allows content to appear elevated through the use
        of a drop shadow. Change the <Code>elevation</Code> property of the
        component to adjust the shadow level.
      </Text>
    </Surface>
  );
};

export const Custom = () => {
  return (
    <Surface elevation={1}>
      <Surface.Header>
        <Flex justifyContent={'space-between'} style={{ flexGrow: '1' }}>
          <Text variant='subheading' as='h2'>
            Custom surface
          </Text>
          <IconButton styleType='borderless' aria-label='Settings'>
            <SvgSettings />
          </IconButton>
        </Flex>
      </Surface.Header>
      <Surface.Body isPadded>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </Surface.Body>
    </Surface>
  );
};

export const OverflowWithButtonFooter = () => {
  const cardStyle = {
    maxHeight: '300px',
  };
  return (
    <Surface elevation={1} style={cardStyle}>
      <Surface.Header>
        <Text variant='subheading' as='h2'>
          Surface with overflow & button footer
        </Text>
      </Surface.Header>
      <Surface.Body isPadded>
        <Text>
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
        </Text>
      </Surface.Body>
      <Divider />
      <Button styleType='borderless'>View All</Button>
    </Surface>
  );
};

export const NoPadding = () => {
  const listStyle = {
    padding: 'var(--iui-size-s)',
    position: 'relative',
  } as React.CSSProperties;
  const cardStyle = {
    maxHeight: '300px',
  };
  return (
    <Surface elevation={1} style={cardStyle}>
      <Surface.Header>
        <Text variant='subheading' as='h2'>
          Surface with overflow & no body padding
        </Text>
      </Surface.Header>
      <Surface.Body isPadded={false}>
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

export const EmptyState = () => {
  const cardStyle = {
    height: '300px',
  };

  return (
    <Surface elevation={1} style={cardStyle}>
      <Surface.Header>
        <Text variant='subheading' as='h2'>
          Surface with empty state
        </Text>
      </Surface.Header>
      <Surface.Body style={{ display: 'flex' }} isPadded>
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

export const Elevations = () => {
  const containerStyle = {
    display: 'flex',
    gap: 'var(--iui-size-2xl)',
    width: 'auto',
    flexWrap: 'wrap',
  } satisfies React.CSSProperties;
  const cardStyle = {
    height: '100px',
    width: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } satisfies React.CSSProperties;

  return (
    <div style={containerStyle}>
      {([undefined, 0, 1, 2, 3, 4, 5] as const).map((elevation) => (
        <Surface
          key={elevation}
          elevation={elevation}
          style={cardStyle}
          data-iui-elevation={elevation}
        >
          {`${elevation}`}
        </Surface>
      ))}
    </div>
  );
};
