/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button } from '@itwin/itwinui-react';

export default () => {
  return (
    <div>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '12px' }}>
        <Button size='small'>Default</Button>
        <Button size='small' styleType='cta'>
          Call-to-action
        </Button>
        <Button size='small' styleType='high-visibility'>
          High Visibility
        </Button>
        <Button size='small' styleType='borderless'>
          Borderless
        </Button>
      </div>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '12px' }}>
        <Button>Default</Button>
        <Button styleType='cta'>Call-to-action</Button>
        <Button styleType='high-visibility'>High Visibility</Button>
        <Button styleType='borderless'>Borderless</Button>
      </div>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '12px' }}>
        <Button size='large'>Default</Button>
        <Button size='large' styleType='cta'>
          Call-to-action
        </Button>
        <Button size='large' styleType='high-visibility'>
          High Visibility
        </Button>
        <Button size='large' styleType='borderless'>
          Borderless
        </Button>
      </div>
    </div>
  );
};
