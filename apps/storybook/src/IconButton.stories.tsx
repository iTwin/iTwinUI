/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { action } from '@storybook/addon-actions';
import { IconButton } from '@itwin/itwinui-react';
import { SvgAdd } from '@itwin/itwinui-icons-react';

export default {
  title: 'Buttons/IconButton',
  component: IconButton,
};

export const Add = () => {
  return (
    <IconButton label='Add' onClick={action('clicked')}>
      <SvgAdd />
    </IconButton>
  );
};

export const SmallActiveAdd = () => {
  return (
    <IconButton label='Add' onClick={action('clicked')} isActive size='small'>
      <SvgAdd />
    </IconButton>
  );
};

export const HighVisibilityAdd = () => {
  return (
    <IconButton
      label='Add'
      onClick={action('clicked')}
      styleType='high-visibility'
    >
      <SvgAdd />
    </IconButton>
  );
};

export const Borderless = () => {
  return (
    <IconButton label='Add' styleType='borderless' onClick={action('clicked')}>
      <SvgAdd />
    </IconButton>
  );
};
