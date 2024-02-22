/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <ExpandableBlock.Wrapper disabled>
        <ExpandableBlock.Trigger label='Disabled expandable block' />
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
    </div>
  );
};
