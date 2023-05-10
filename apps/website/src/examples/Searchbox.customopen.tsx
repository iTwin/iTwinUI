/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox, Divider, Flex } from '@itwin/itwinui-react';
import { SvgCaretUpSmall, SvgCaretDownSmall, SvgAirplane } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Flex style={{ width: '70%' }} justifyContent='center' flexDirection='column'>
      <SearchBox
        expandable
        collapsedState={
          <SearchBox.ExpandButton>
            <SvgAirplane />
          </SearchBox.ExpandButton>
        }
      >
        <SearchBox.Input placeholder='Expandable search with custom open icon' />
        <SearchBox.Button label='Previous result'>
          <SvgCaretUpSmall />
        </SearchBox.Button>
        <SearchBox.Button label='Next result'>
          <SvgCaretDownSmall />
        </SearchBox.Button>
        <Divider orientation='vertical' />
        <SearchBox.CollapseButton label='Close search' />
      </SearchBox>
    </Flex>
  );
};
