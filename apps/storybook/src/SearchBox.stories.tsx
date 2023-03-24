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
  VerticalDivider,
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
  return <SearchBox />;
};

export const Expandable: Story<SearchBoxProps> = (args) => {
  return <SearchBox expandable {...args} />;
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
      <VerticalDivider />
      <IconButton styleType='borderless'>
        <SvgCaretUpSmall />
      </IconButton>
      <IconButton styleType='borderless'>
        <SvgCaretDownSmall />
      </IconButton>
    </SearchBox>
  );
};
