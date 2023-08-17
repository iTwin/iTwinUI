/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Surface, Text, Flex, Anchor, Divider } from '@itwin/itwinui-react';

export default () => {
  const listStyle = {
    padding: 'var(--iui-size-s)',
    position: 'relative',
  } as React.CSSProperties;
  const cardStyle = {
    maxBlockSize: '300px',
  };
  return (
    <Surface elevation={3} style={cardStyle}>
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
              margin: 0,
              padding: 0,
            }}
          >
            <li style={listStyle} tabIndex={0}>
              <Anchor>Daily log</Anchor>
            </li>
            <Divider as='li' />
            <li style={listStyle} tabIndex={0}>
              <Anchor>Inspections</Anchor>
            </li>
            <Divider as='li' />
            <li style={listStyle} tabIndex={0}>
              <Anchor>Issues</Anchor>
            </li>
            <Divider as='li' />
            <li style={listStyle} tabIndex={0}>
              <Anchor>Observations</Anchor>
            </li>
            <Divider as='li' />
            <li style={listStyle} tabIndex={0}>
              <Anchor>RFIs</Anchor>
            </li>
            <Divider as='li' />
            <li style={listStyle} tabIndex={0}>
              <Anchor>Weather delay notices</Anchor>
            </li>
          </ul>
        </Flex>
      </Surface.Body>
    </Surface>
  );
};
