/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <SearchBox expandable>
        <SearchBox.CollapsedState styleType='borderless'>
          <SearchBox.ExpandButton />
        </SearchBox.CollapsedState>
        <SearchBox.ExpandedState>
          <SearchBox.Icon />
          <SearchBox.Input placeholder='Expandable search with borderless SearchBox.CollapsedState' />
          <SearchBox.CollapseButton />
        </SearchBox.ExpandedState>
      </SearchBox>
    </div>
  );
};
