/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox, Flex } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex className='basic-search-box-flex'>
      <SearchBox
        aria-label='Search input'
        inputProps={{
          placeholder: 'Search...',
        }}
      />
    </Flex>
  );
};
