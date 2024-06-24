/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IconButton } from '@itwin/itwinui-react';
import { SvgAdd } from '@itwin/itwinui-icons-react';

export default {
  title: 'IconButton',
};

export const Add = () => {
  return (
    <IconButton label='Add' onClick={() => console.log('clicked')}>
      <SvgAdd />
    </IconButton>
  );
};

export const SmallActiveAdd = () => {
  return (
    <IconButton
      label='Add'
      onClick={() => console.log('clicked')}
      isActive
      size='small'
    >
      <SvgAdd />
    </IconButton>
  );
};

export const HighVisibilityAdd = () => {
  return (
    <IconButton
      label='Add'
      onClick={() => console.log('clicked')}
      styleType='high-visibility'
    >
      <SvgAdd />
    </IconButton>
  );
};

export const Borderless = () => {
  return (
    <IconButton
      label='Add'
      styleType='borderless'
      onClick={() => console.log('clicked')}
    >
      <SvgAdd />
    </IconButton>
  );
};
