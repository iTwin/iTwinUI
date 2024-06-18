/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ExpandableBlock } from '@itwin/itwinui-react';

export default {
  title: 'ExpandableBlock',
};

export const Basic = () => {
  return (
    <ExpandableBlock title='Basic Block'>Content in block!</ExpandableBlock>
  );
};

export const WithCaption = () => {
  return (
    <ExpandableBlock.Wrapper>
      <ExpandableBlock.Trigger>
        <ExpandableBlock.ExpandIcon />
        <ExpandableBlock.LabelArea>
          <ExpandableBlock.Title>Basic Block</ExpandableBlock.Title>
          <ExpandableBlock.Caption>basic caption</ExpandableBlock.Caption>
        </ExpandableBlock.LabelArea>
      </ExpandableBlock.Trigger>
      <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>
  );
};

export const Accordion = () => {
  return (
    <>
      {[...Array(3).fill(null)].map((_, index) => (
        <ExpandableBlock.Wrapper key={index}>
          <ExpandableBlock.Trigger label={`Basic Block #${index + 1}`} />
          <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
        </ExpandableBlock.Wrapper>
      ))}
    </>
  );
};

export const StatusIcon = () => {
  return (
    <ExpandableBlock.Wrapper status='positive'>
      <ExpandableBlock.Trigger>
        <ExpandableBlock.ExpandIcon />
        <ExpandableBlock.LabelArea>
          <ExpandableBlock.Title>Basic Block With Status</ExpandableBlock.Title>
        </ExpandableBlock.LabelArea>
        <ExpandableBlock.EndIcon />
      </ExpandableBlock.Trigger>
      <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>
  );
};

export const Small = () => {
  return (
    <ExpandableBlock.Wrapper size='small'>
      <ExpandableBlock.Trigger label='Basic Block' />
      <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>
  );
};

export const Borderless = () => {
  return (
    <ExpandableBlock.Wrapper styleType='borderless'>
      <ExpandableBlock.Trigger label='Basic Block' />
      <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>
  );
};

export const Disabled = () => {
  return (
    <ExpandableBlock.Wrapper disabled>
      <ExpandableBlock.Trigger label='Disabled Block' />
      <ExpandableBlock.Content>Content in block!</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>
  );
};
