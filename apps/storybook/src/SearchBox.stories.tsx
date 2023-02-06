/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import {
  SearchBox,
  SearchBoxProps,
  IconButton,
  Icon,
} from '@itwin/itwinui-react';
import {
  SvgAirplane,
  SvgCaretDownSmall,
  SvgCaretUpSmall,
  SvgCloud,
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
    <SearchBox expandable {...args}>
      <input type='search' placeholder='Search...' />
    </SearchBox>
  );
};

export const Static: Story<SearchBoxProps> = (args) => {
  return (
    <SearchBox {...args}>
      <input type='search' placeholder='Search...' />
      <IconButton styleType='borderless'>
        <SvgCaretUpSmall />
      </IconButton>
      <IconButton styleType='borderless'>
        <SvgCaretDownSmall />
      </IconButton>
    </SearchBox>
  );
};

export const Small: Story<SearchBoxProps> = (args) => {
  return (
    <SearchBox {...args} size='small'>
      <input type='search' placeholder='Search...' />
      <IconButton size='small' styleType='borderless'>
        <SvgCaretUpSmall />
      </IconButton>
      <IconButton size='small' styleType='borderless'>
        <SvgCaretDownSmall />
      </IconButton>
    </SearchBox>
  );
};

export const WithCustomAction: Story<SearchBoxProps> = (args) => {
  return (
    <SearchBox expandable {...args}>
      <input type='search' placeholder='Search...' />
      <IconButton styleType='borderless'>
        <SvgCaretUpSmall />
      </IconButton>
      <IconButton styleType='borderless'>
        <SvgCaretDownSmall />
      </IconButton>
    </SearchBox>
  );
};

export const WithCustomIcon: Story<SearchBoxProps> = (args) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <SearchBox
      expandable
      animateTo='left'
      isExpanded={isExpanded}
      onToggle={setIsExpanded}
      searchIcon={isExpanded ? <SvgAirplane /> : <SvgCloud />}
      {...args}
    >
      <input type='search' placeholder='Search...' />
    </SearchBox>
  );
};

export const WithCutomControl: Story<SearchBoxProps> = (args) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleIsExpanded = () => {
    action('SearchBox clicked')();
    setIsExpanded(!isExpanded);
  };

  return (
    <SearchBox
      expandable
      animateTo='left'
      isExpanded={isExpanded}
      onToggle={toggleIsExpanded}
      {...args}
    >
      <Icon>
        <SvgAirplane />
      </Icon>
      <input type='search' placeholder='Search...' />
    </SearchBox>
  );
};
