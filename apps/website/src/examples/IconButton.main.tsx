/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { IconButton, Flex } from '@itwin/itwinui-react';
import { SvgAdd, SvgClose } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Flex>
      <IconButton>
        <SvgAdd />
      </IconButton>
      <IconButton styleType='borderless'>
        <SvgClose />
      </IconButton>
    </Flex>
  );
};
