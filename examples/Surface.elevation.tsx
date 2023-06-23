/*---------------------------------------------------------------------------------------------

* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Surface, Flex } from '@itwin/itwinui-react';

export default () => {
  const cardStyle = {
    display: 'flex',
    width: '100px',
    padding: '12px',
    justifyContent: 'center',
    textAlign: 'center',
    flex: '1',
  };
  return (
    <>
      <Flex gap={'2xl'}>
        <Surface elevation={0} style={cardStyle}>
          <p>Elevation 0 (0dp)</p>
        </Surface>
        <Surface elevation={1} style={cardStyle}>
          <p>Elevation 1 (2dp)</p>
        </Surface>
        <Surface elevation={2} style={cardStyle}>
          <p>Elevation 2 (4dp)</p>
        </Surface>
      </Flex>
      <Flex gap={'2xl'}>
        <Surface elevation={3} style={cardStyle}>
          <p>Elevation 3 (8dp)</p>
        </Surface>
        <Surface elevation={4} style={cardStyle}>
          <p>Elevation 4 (16dp)</p>
        </Surface>
        <Surface elevation={5} style={cardStyle}>
          <p>Elevation 5 (24dp)</p>
        </Surface>
      </Flex>
    </>
  );
};
