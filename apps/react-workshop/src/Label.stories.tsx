/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Input, Label, Text, InputGrid } from '@itwin/itwinui-react';
import type { StoryDefault } from '@ladle/react';

export default {
  title: 'Label',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 'clamp(300px, 50%, 100%)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies StoryDefault;

export const Basic = () => {
  return (
    <>
      <Label htmlFor='text-input'>Name</Label>
      <Input id='text-input' placeholder='Enter name' />
    </>
  );
};

export const Inline = () => {
  return (
    <InputGrid labelPlacement='inline'>
      <Label displayStyle='inline' required>
        Name
      </Label>
      <Input defaultValue='James Bond' required />
    </InputGrid>
  );
};

export const Polymorphic = () => {
  return (
    <InputGrid labelPlacement='inline'>
      <Label displayStyle='inline' as='div'>
        <Text isMuted>Name:</Text>
      </Label>
      <Text>James Bond</Text>
    </InputGrid>
  );
};
