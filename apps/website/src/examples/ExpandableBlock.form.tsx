/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ExpandableBlock, Label, Input, InputGroup, Radio } from '@itwin/itwinui-react';

export default () => {
  const nameSection = (
    <>
      <Label required>Name</Label>
      <Input key='name' placeholder='Enter name' />
      <Label>Occupation</Label>
      <Input key='occupation' placeholder='Enter occupation' />
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
      <Label required>Why is this your favorite color</Label>
      <Input key='explanation' placeholder='Enter text here...' />
    </>
  );

  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <ExpandableBlock title='Name'>{nameSection}</ExpandableBlock>
      <ExpandableBlock title='Favorite Color'>{colorSection}</ExpandableBlock>
      <ExpandableBlock title='Reasoning'>{reasonSection}</ExpandableBlock>
    </div>
  );
};
