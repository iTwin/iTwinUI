/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';

export default () => {
  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <ExpandableBlock size='small'>
        <ExpandableBlock.Header>
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>Expandable Block</ExpandableBlock.Title>
            <ExpandableBlock.Caption>With caption!</ExpandableBlock.Caption>
          </ExpandableBlock.LabelArea>
        </ExpandableBlock.Header>
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock>
    </div>
  );
};
