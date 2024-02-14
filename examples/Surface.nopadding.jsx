/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Surface, Text, Flex, Anchor, Divider } from '@itwin/itwinui-react';

export default () => {
  return (
    <Surface elevation={3} className='demo-card'>
      <Surface.Header>
        <Text id='surface-header' variant='subheading' as='h2'>
          Surface with overflow & no body padding
        </Text>
      </Surface.Header>
      <Surface.Body
        tabIndex={0}
        role='group'
        aria-labelledby='surface-header'
        isPadded={false}
      >
        <Flex flexDirection='column' className='demo-container'>
          <div className='demo-list'>
            <div className='demo-list-item'>
              <Anchor>Daily log</Anchor>
            </div>
            <Divider />
            <div className='demo-list-item'>
              <Anchor>Inspections</Anchor>
            </div>
            <Divider />
            <div className='demo-list-item'>
              <Anchor>Issues</Anchor>
            </div>
            <Divider />
            <div className='demo-list-item'>
              <Anchor>Observations</Anchor>
            </div>
            <Divider />
            <div className='demo-list-item'>
              <Anchor>RFIs</Anchor>
            </div>
            <Divider />
            <div className='demo-list-item'>
              <Anchor>Weather delay notices</Anchor>
            </div>
          </div>
        </Flex>
      </Surface.Body>
    </Surface>
  );
};
