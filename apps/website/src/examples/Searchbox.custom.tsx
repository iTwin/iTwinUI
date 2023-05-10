/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox, Text, Divider, Flex } from '@itwin/itwinui-react';
import { SvgCaretUpSmall, SvgCaretDownSmall, SvgCloseSmall } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Flex style={{ width: '70%' }} justifyContent='center' flexDirection='column'>
      <SearchBox expandable>
        <SearchBox.CollapsedState />
        <SearchBox.ExpandedState>
          <SearchBox.Input placeholder='Expandable search with custom interactions' />
          <SearchBox.Button label='Previous result'>
            <SvgCaretUpSmall />
          </SearchBox.Button>
          <SearchBox.Button label='Next result'>
            <SvgCaretDownSmall />
          </SearchBox.Button>
          <Divider orientation='vertical' />
          <SearchBox.CollapseButton label='Close search' />
        </SearchBox.ExpandedState>
      </SearchBox>
      <SearchBox>
        <SearchBox.Input placeholder='Basic search with custom interactions' />
        <Text
          isMuted
          variant='body'
          as='p'
          style={{ paddingRight: 'var(--iui-size-s)', alignSelf: 'center' }}
        >
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
