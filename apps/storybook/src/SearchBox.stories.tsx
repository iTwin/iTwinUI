/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  IconButton,
  SearchBox,
  SearchBoxProps,
  Icon,
} from '@itwin/itwinui-react';
import {
  SvgCaretDownSmall,
  SvgCaretUpSmall,
  SvgClose,
  SvgSearch,
} from '@itwin/itwinui-icons-react';

export default {
  component: SearchBox,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
  title: 'Input/SearchBox',
} as Meta<SearchBoxProps>;

export const Basic: Story<SearchBoxProps> = (args) => {
  return (
    <SearchBox
      {...args}
      placeholder='Search...'
      startAdornment={
        <Icon>
          <SvgSearch />
        </Icon>
      }
      endAdornment={
        <IconButton styleType='borderless'>
          <SvgClose />
        </IconButton>
      }
    />
  );
};

export const Small: Story<SearchBoxProps> = (args) => {
  return (
    <SearchBox
      {...args}
      placeholder='Search...'
      size='small'
      startAdornment={
        <Icon size='small'>
          <SvgSearch />
        </Icon>
      }
      endAdornment={
        <>
          <IconButton size='small' styleType='borderless'>
            <SvgCaretUpSmall />
          </IconButton>
          <IconButton size='small' styleType='borderless'>
            <SvgCaretDownSmall />
          </IconButton>
        </>
      }
    />
  );
};
