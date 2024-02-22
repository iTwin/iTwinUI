/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';
import { SvgSmileyHappy } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div className='demo-container'>
      <ExpandableBlock.Wrapper status='positive'>
        <ExpandableBlock.Trigger>
          <ExpandableBlock.ExpandIcon />
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>Positive block</ExpandableBlock.Title>
          </ExpandableBlock.LabelArea>
          <ExpandableBlock.EndIcon />
        </ExpandableBlock.Trigger>
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
      <ExpandableBlock.Wrapper status='negative'>
        <ExpandableBlock.Trigger>
          <ExpandableBlock.ExpandIcon />
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>Negative block</ExpandableBlock.Title>
          </ExpandableBlock.LabelArea>
          <ExpandableBlock.EndIcon />
        </ExpandableBlock.Trigger>
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
      <ExpandableBlock.Wrapper status='warning'>
        <ExpandableBlock.Trigger>
          <ExpandableBlock.ExpandIcon />
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>Warning block</ExpandableBlock.Title>
          </ExpandableBlock.LabelArea>
          <ExpandableBlock.EndIcon />
        </ExpandableBlock.Trigger>
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
      <ExpandableBlock.Wrapper status='informational'>
        <ExpandableBlock.Trigger>
          <ExpandableBlock.ExpandIcon />
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>Informational block</ExpandableBlock.Title>
          </ExpandableBlock.LabelArea>
          <ExpandableBlock.EndIcon />
        </ExpandableBlock.Trigger>
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
      <ExpandableBlock.Wrapper>
        <ExpandableBlock.Trigger>
          <ExpandableBlock.ExpandIcon />
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>Happy block</ExpandableBlock.Title>
          </ExpandableBlock.LabelArea>
          <ExpandableBlock.EndIcon>
            <SvgSmileyHappy />
          </ExpandableBlock.EndIcon>
        </ExpandableBlock.Trigger>
        <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
    </div>
  );
};
