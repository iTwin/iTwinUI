/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <Button>Default</Button>
      <Button styleType='cta'>Call-to-action</Button>
      <Button styleType='high-visibility'>High Visibility</Button>
      <Button styleType='borderless'>Borderless</Button>
    </div>
  );
};
