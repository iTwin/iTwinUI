/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import {
  SearchBox,
  SearchBoxProps,
  IconButton,
  Text,
  Flex,
  Divider,
} from '@itwin/itwinui-react';
import { SvgCaretDownSmall, SvgCaretUpSmall } from '@itwin/itwinui-icons-react';

export default {
  component: SearchBox,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
  title: 'Input/SearchBox',
} as Meta<SearchBoxProps>;

export const Basic: StoryFn<SearchBoxProps> = () => {
  return (
    <Flex flexDirection='column'>
      <SearchBox inputProps={{ placeholder: 'Basic search' }} />
      <SearchBox>
        <SearchBox.Button title='Search button' />
        <SearchBox.Input placeholder='Basic search with custom interactions' />
        <Text
          isMuted
          variant='body'
          as='p'
          style={{ paddingRight: 'var(--iui-size-s)', alignSelf: 'center' }}
        >
          0/3
        </Text>
        <Divider orientation='vertical' />
        <SearchBox.Button styleType='borderless'>
          <SvgCaretUpSmall />
        </SearchBox.Button>
        <SearchBox.Button styleType='borderless'>
          <SvgCaretDownSmall />
        </SearchBox.Button>
      </SearchBox>
    </Flex>
  );
};

export const Expandable: StoryFn<SearchBoxProps> = () => {
  return (
    <Flex flexDirection='column' alignItems='start'>
      <SearchBox expandable />
      <SearchBox expandable>
        <SearchBox.Icon />
        <SearchBox.Input placeholder='Expandable search with custom interactions' />
        <Text
          isMuted
          variant='body'
          as='p'
          style={{ paddingRight: 'var(--iui-size-s)', alignSelf: 'center' }}
        >
          0/3
        </Text>
        <Divider orientation='vertical' />
        <SearchBox.Button styleType='borderless'>
          <SvgCaretUpSmall />
        </SearchBox.Button>
        <SearchBox.Button styleType='borderless'>
          <SvgCaretDownSmall />
        </SearchBox.Button>
      </SearchBox>
    </Flex>
  );
};

export const Small: StoryFn<SearchBoxProps> = () => {
  return <SearchBox size='small' inputProps={{ placeholder: 'Search...' }} />;
};

export const WithCustomAction: StoryFn<SearchBoxProps> = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleToggle = (value: boolean) => {
    console.log('handling toggle', value);
    setExpanded(value);
  };

  return (
    <SearchBox expandable isExpanded={expanded} onToggle={handleToggle}>
      <SearchBox.CloseButton />
      <input type='search' placeholder='Search...' />
      <Text
        isMuted
        variant='body'
        as='p'
        style={{ paddingRight: 'var(--iui-size-s)', alignSelf: 'center' }}
      >
        0/3
      </Text>
      <IconButton styleType='borderless'>
        <SvgCaretUpSmall />
      </IconButton>
      <IconButton styleType='borderless'>
        <SvgCaretDownSmall />
      </IconButton>
    </SearchBox>
  );
};
