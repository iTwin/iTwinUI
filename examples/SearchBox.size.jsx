/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox, Flex } from '@itwin/itwinui-react';
import './SearchBox.size.css';

export default () => {
  return (
    <Flex className='size-search-box-flex' flexDirection='column'>
      <SearchBox size='small' inputProps={{ placeholder: 'Small search...' }} />
      <SearchBox inputProps={{ placeholder: 'Default search...' }} />
      <SearchBox size='large' inputProps={{ placeholder: 'Large search...' }} />
    </Flex>
  );
};
