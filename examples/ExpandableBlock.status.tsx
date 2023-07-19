/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';
import { SvgSmileyHappy } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <ExpandableBlock status='positive'>
        <ExpandableBlock.Header>
          <ExpandableBlock.ExpandIcon />
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>Positive block</ExpandableBlock.Title>
          </ExpandableBlock.LabelArea>
          <ExpandableBlock.EndIcon />
        </ExpandableBlock.Header>
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock>
      <ExpandableBlock status='negative'>
        <ExpandableBlock.Header>
          <ExpandableBlock.ExpandIcon />
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>Negative block</ExpandableBlock.Title>
          </ExpandableBlock.LabelArea>
          <ExpandableBlock.EndIcon />
        </ExpandableBlock.Header>
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock>
      <ExpandableBlock status='warning'>
        <ExpandableBlock.Header>
          <ExpandableBlock.ExpandIcon />
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>Warning block</ExpandableBlock.Title>
          </ExpandableBlock.LabelArea>
          <ExpandableBlock.EndIcon />
        </ExpandableBlock.Header>
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock>
      <ExpandableBlock status='informational'>
        <ExpandableBlock.Header>
          <ExpandableBlock.ExpandIcon />
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>Informational block</ExpandableBlock.Title>
          </ExpandableBlock.LabelArea>
          <ExpandableBlock.EndIcon />
        </ExpandableBlock.Header>
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock>
      <ExpandableBlock>
        <ExpandableBlock.Header>
          <ExpandableBlock.ExpandIcon />
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>Happy block</ExpandableBlock.Title>
          </ExpandableBlock.LabelArea>
          <ExpandableBlock.EndIcon>
            <SvgSmileyHappy />
          </ExpandableBlock.EndIcon>
        </ExpandableBlock.Header>
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock>
    </div>
  );
};
