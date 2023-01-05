/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { IconButton, SearchBox, SearchBoxProps } from '@itwin/itwinui-react';
import { SvgAirplane, SvgSearch } from '@itwin/itwinui-icons-react';

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
      placeholder='search...'
      size='small'
      startAdornment={<SvgAirplane className='iui-input-icon' />}
      endAdornment={
        <>
          <IconButton styleType='borderless'>
            <SvgSearch />
          </IconButton>
          <IconButton styleType='borderless'>
            <SvgSearch />
          </IconButton>
        </>
      }
    />
  );
};
