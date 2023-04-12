/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  SearchBox,
  SearchBoxProps,
  IconButton,
  Text,
  Flex,
} from '@itwin/itwinui-react';
import {
  SvgCaretDownSmall,
  SvgCaretUpSmall,
  SvgCloseSmall,
} from '@itwin/itwinui-icons-react';

export default {
  component: SearchBox,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
  title: 'Input/SearchBox',
} as Meta<SearchBoxProps>;

export const Basic: Story<SearchBoxProps> = () => {
  return (
    <Flex>
      <SearchBox />
      <SearchBox>
        <SearchBox.Button title='Search button' />
        <SearchBox.Input />
        <SearchBox.Button title='random'>button</SearchBox.Button>
      </SearchBox>
    </Flex>
  );
};

export const Expandable: Story<SearchBoxProps> = () => {
  return (
    <Flex flexDirection='column' alignItems='start'>
      <SearchBox expandable />
      <SearchBox expandable isExpanded />
      <SearchBox
        expandable
        inputProps={{ placeholder: 'Test' }}
        onToggle={(isExpanding) => {
          console.log(isExpanding);
        }}
      />
    </Flex>
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
  const [expanded, setExpanded] = React.useState(false);

  return (
    <SearchBox
      expandable
      isExpanded={expanded}
      onFocus={() => setExpanded(true)}
      // onToggle={(_expanded: boolean) => setExpanded(_expanded)}
      {...args}
    >
      <IconButton styleType='borderless' onClick={() => setExpanded(false)}>
        <SvgCloseSmall />
      </IconButton>
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
