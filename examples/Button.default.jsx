/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button } from '@itwin/itwinui-react';
import { SvgAdd, SvgCheckmarkSmall } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <div className='demo-container'>
      <Button>Default</Button>
      <Button disabled>Disabled</Button>
      <Button startIcon={<SvgAdd />}>With startIcon</Button>
      <Button endIcon={<SvgCheckmarkSmall />}>With endIcon</Button>
    </div>
  );
};
