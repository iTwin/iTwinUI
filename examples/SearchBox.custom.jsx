/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox, Divider } from '@itwin/itwinui-react';
import {
  SvgCaretUpSmall,
  SvgCaretDownSmall,
  SvgAirplane,
} from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div className='demo-container'>
      <SearchBox expandable>
        <SearchBox.CollapsedState>
          <SearchBox.ExpandButton>
            <SvgAirplane />
          </SearchBox.ExpandButton>
        </SearchBox.CollapsedState>
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
    </div>
  );
};
