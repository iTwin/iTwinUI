/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { SearchBox, SearchBoxProps, IconButton } from '@itwin/itwinui-react';
import { SvgCaretDownSmall, SvgCaretUpSmall } from '@itwin/itwinui-icons-react';

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
    <>
      <SearchBox expandable {...args}>
        <input type='search' placeholder='Search...' />
        <IconButton styleType='borderless'>
          <SvgCaretUpSmall />
        </IconButton>
        <IconButton styleType='borderless'>
          <SvgCaretDownSmall />
        </IconButton>
      </SearchBox>
      <SearchBox expandable animateTo='left' {...args}>
        <input type='search' placeholder='Search...' />
      </SearchBox>
    </>
  );
};

export const Small: Story<SearchBoxProps> = (args) => {
  return (
    <SearchBox {...args} size='small'>
      <input type='search' placeholder='Search...' />
    </SearchBox>
  );
};
