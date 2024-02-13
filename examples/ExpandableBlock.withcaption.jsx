/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';
import './ExpandableBlock.withcaption.css';

export default () => {
  return (
    <div className='caption-expandable-block-container'>
      <ExpandableBlock.Wrapper size='small'>
        <ExpandableBlock.Trigger>
          <ExpandableBlock.ExpandIcon />
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>Expandable Block</ExpandableBlock.Title>
            <ExpandableBlock.Caption>With caption!</ExpandableBlock.Caption>
          </ExpandableBlock.LabelArea>
        </ExpandableBlock.Trigger>
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
    </div>
  );
};
