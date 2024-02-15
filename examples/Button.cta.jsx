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
      <Button styleType='cta'>Default</Button>
      <Button styleType='cta' disabled>
        Disabled
      </Button>
      <Button styleType='cta' startIcon={<SvgAdd />}>
        With startIcon
      </Button>
      <Button styleType='cta' endIcon={<SvgCheckmarkSmall />}>
        With endIcon
      </Button>
    </div>
  );
};
