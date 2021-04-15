/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { ButtonGroup, ButtonGroupProps, IconButton } from '../../../src/core';
import SvgAdd from '@itwin/itwinui-icons-react/cjs/icons/Add';
import SvgDelete from '@itwin/itwinui-icons-react/cjs/icons/Delete';
import SvgEdit from '@itwin/itwinui-icons-react/cjs/icons/Edit';
import SvgUndo from '@itwin/itwinui-icons-react/cjs/icons/Undo';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Buttons/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
} as Meta<ButtonGroupProps>;

export const WithIcons: Story<ButtonGroupProps> = () => {
  return (
    <ButtonGroup>
      <IconButton onClick={action('Clicked add!')}>
        <SvgAdd />
      </IconButton>
      <IconButton onClick={action('Clicked edit!')} isActive>
        <SvgEdit />
      </IconButton>
      <IconButton disabled onClick={action('Clicked delete!')}>
        <SvgDelete />
      </IconButton>
      <IconButton onClick={action('Clicked undo!')}>
        <SvgUndo />
      </IconButton>
    </ButtonGroup>
  );
};
