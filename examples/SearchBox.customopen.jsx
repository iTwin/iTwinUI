/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox, Divider, Flex, Text } from '@itwin/itwinui-react';
import {
  SvgCaretUpSmall,
  SvgCaretDownSmall,
  SvgCloseSmall,
} from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Flex className='demo-container' justifyContent='center'>
      <SearchBox>
        <SearchBox.Input placeholder='Basic search with custom interactions' />
        <Text isMuted variant='body' as='p' className='demo-text'>
          0/3
        </Text>
        <Divider orientation='vertical' />
        <SearchBox.Button label='Previous result'>
          <SvgCaretUpSmall />
        </SearchBox.Button>
        <SearchBox.Button label='Next result'>
          <SvgCaretDownSmall />
        </SearchBox.Button>
        <SearchBox.Button label='Clear search'>
          <SvgCloseSmall />
        </SearchBox.Button>
      </SearchBox>
    </Flex>
  );
};
