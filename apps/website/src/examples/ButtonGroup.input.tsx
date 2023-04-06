/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ButtonGroup, IconButton, Input, Flex, Button } from '@itwin/itwinui-react';
import { SvgSearch, SvgAdd } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Flex flexDirection='column' gap='m'>
      <ButtonGroup>
        <Button>Button 1</Button>
        <Input />
        <IconButton>
          <SvgSearch />
        </IconButton>
      </ButtonGroup>
      <ButtonGroup>
        <Input value='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ' />
        <Button styleType='high-visibility'>Copy</Button>
      </ButtonGroup>
    </Flex>
  );
};
