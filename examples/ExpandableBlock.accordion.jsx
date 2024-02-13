/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';
import './ExpandableBlock.accordion.css';

export default () => {
  return (
    <div className='accordion-expandable-block-container'>
      <ExpandableBlock.Wrapper>
        <ExpandableBlock.Trigger label='Block #1' />
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
      <ExpandableBlock.Wrapper>
        <ExpandableBlock.Trigger label='Block #2' />
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
      <ExpandableBlock.Wrapper>
        <ExpandableBlock.Trigger label='Block #3' />
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
    </div>
  );
};
