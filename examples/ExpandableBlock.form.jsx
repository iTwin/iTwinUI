/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  ExpandableBlock,
  Label,
  Input,
  InputGroup,
  Radio,
  InputGrid,
} from '@itwin/itwinui-react';

export default () => {
  const nameSection = (
    <>
      <InputGrid>
        <Label htmlFor='name' required>
          Name
        </Label>
        <Input id='name' key='name' placeholder='Enter name' />
      </InputGrid>
      <InputGrid>
        <Label htmlFor='occupation'>Occupation</Label>
        <Input
          id='occupation'
          key='occupation'
          placeholder='Enter occupation'
        />
      </InputGrid>
    </>
  );

  const colorSection = (
    <InputGroup key='color' label='Choose your favorite color' required>
      <Radio name='color' value='Red' label='Red' />
      <Radio name='color' value='Orange' label='Orange' />
      <Radio name='color' value='Yellow' label='Yellow' />
      <Radio name='color' value='Green' label='Green' />
      <Radio name='color' value='Blue' label='Blue' />
      <Radio name='color' value='Purple' label='Purple' />
    </InputGroup>
  );

  const reasonSection = (
    <>
      <Label htmlFor='explanation' required>
        Why is this your favorite color
      </Label>
      <Input
        id='explanation'
        key='explanation'
        placeholder='Enter text here...'
      />
    </>
  );

  return (
    <div className='form-expandable-block-container'>
      <ExpandableBlock.Wrapper>
        <ExpandableBlock.Trigger label='Name' />
        <ExpandableBlock.Content>{nameSection}</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
      <ExpandableBlock.Wrapper>
        <ExpandableBlock.Trigger label='Favorite Color' />
        <ExpandableBlock.Content>{colorSection}</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
      <ExpandableBlock.Wrapper>
        <ExpandableBlock.Trigger label='Reasoning' />
        <ExpandableBlock.Content>{reasonSection}</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
    </div>
  );
};
