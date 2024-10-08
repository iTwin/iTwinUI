/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ButtonGroup, IconButton, Input, Button } from '@itwin/itwinui-react';
import { SvgSearch } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div className='demo-container'>
      <ButtonGroup>
        <Button>Button 1</Button>
        <Input aria-label='Search bar' />
        <IconButton label='Search'>
          <SvgSearch />
        </IconButton>
      </ButtonGroup>
      <ButtonGroup>
        <Input
          aria-label='URL'
          value='https://itwinui.bentley.com/docs/buttongroup'
          readOnly
        />
        <Button styleType='high-visibility'>Copy</Button>
      </ButtonGroup>
    </div>
  );
};
