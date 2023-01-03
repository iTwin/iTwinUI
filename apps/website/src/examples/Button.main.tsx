/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, SplitButton, MenuItem, IconButton, IdeasButton } from '@itwin/itwinui-react';
import { SvgPlaceholder } from '@itwin/itwinui-icons-react';

export default () => {
  const menuItems = (close: () => void) => [
    <MenuItem key={1} onClick={close}>
      Item #1
    </MenuItem>,
    <MenuItem key={2} onClick={close}>
      Item #2
    </MenuItem>,
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '12px' }}>
        <Button>Default</Button>
        <Button styleType='cta'>Call-to-action</Button>
        <Button styleType='high-visibility'>High Visibility</Button>
        <Button styleType='borderless'>Borderless</Button>
      </div>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', margin: '12px' }}>
        <SplitButton onClick={() => {}} menuItems={menuItems} styleType='high-visibility'>
          Split button
        </SplitButton>
        <IconButton styleType='borderless'>!</IconButton>
      </div>
    </div>
  );
};
