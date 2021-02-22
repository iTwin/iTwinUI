// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { ButtonGroup, ButtonGroupProps, IconButton } from '../../../src/core';
import {
  SvgAdd,
  SvgDelete,
  SvgEdit,
  SvgUndo,
} from '@bentley/icons-generic-react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Buttons/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    docs: {
      description: { component: 'Group buttons together for common actions' },
    },
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
