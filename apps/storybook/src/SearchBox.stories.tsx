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
import { SvgSearch } from '@itwin/itwinui-icons-react';

export default {
  component: SearchBox,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
  title: 'Input/SearchBox',
} as Meta<SearchBoxProps>;

export const Basic: Story<SearchBoxProps> = (args) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <SearchBox expandable={true} isExpanded={isExpanded} {...args}>
      <IconButton
        styleType='borderless'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <SvgSearch />
      </IconButton>
      <input type='search' placeholder='Search...' />
    </SearchBox>
  );
};

export const Small: Story<SearchBoxProps> = (args) => {
  return (
    <SearchBox {...args} size='small'>
      <Icon>
        <SvgSearch />
      </Icon>
      <input type='search' placeholder='Search...' />
    </SearchBox>
  );
};
