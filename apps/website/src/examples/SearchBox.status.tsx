/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex style={{ width: '70%' }} flexDirection='column'>
      <SearchBox status='positive' inputProps={{ placeholder: 'Positive search...' }} />
      <SearchBox status='warning' inputProps={{ placeholder: 'Warning search...' }} />
      <SearchBox status='negative' inputProps={{ placeholder: 'Negative search...' }} />
    </Flex>
  );
};
