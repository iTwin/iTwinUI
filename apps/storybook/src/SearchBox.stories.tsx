/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import {
  SearchBox,
  SearchBoxProps,
  IconButton,
  Text,
  Divider,
} from '@itwin/itwinui-react';
import { SvgCaretDownSmall, SvgCaretUpSmall } from '@itwin/itwinui-icons-react';

export default {
  component: SearchBox,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
  args: {
    isDisabled: false,
  },
  title: 'Input/SearchBox',
} as Meta<SearchBoxProps>;

export const Basic: StoryFn<SearchBoxProps> = (
  args: JSX.IntrinsicAttributes,
) => {
  return <SearchBox inputProps={{ placeholder: 'Basic search' }} {...args} />;
};

Basic.args = {
  isDisabled: false,
};

export const BasicWithCustomItems: StoryFn<SearchBoxProps> = () => {
  return (
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
  );
};

export const BasicWithStatus: StoryFn<SearchBoxProps> = () => {
  return (
    <SearchBox
      inputProps={{ placeholder: 'Search with warning' }}
      status='warning'
    />
  );
};

export const Expandable: StoryFn<SearchBoxProps> = () => {
  return (
    <SearchBox expandable inputProps={{ placeholder: 'Expandable search' }} />
  );
};

export const ExpandableWithCustomItems: StoryFn<SearchBoxProps> = () => {
  return (
    <SearchBox expandable>
      <SearchBox.CollapsedState />
      <SearchBox.ExpandedState>
        <SearchBox.Input placeholder='Expandable search with custom interactions' />
        <SearchBox.Button>
          <SvgCaretUpSmall />
        </SearchBox.Button>
        <SearchBox.Button>
          <SvgCaretDownSmall />
        </SearchBox.Button>
        <Divider orientation='vertical' />
        <SearchBox.CollapseButton />
      </SearchBox.ExpandedState>
    </SearchBox>
  );
};

export const Small: StoryFn<SearchBoxProps> = () => {
  return <SearchBox size='small' inputProps={{ placeholder: 'Search...' }} />;
};

export const WithCustomAction: StoryFn<SearchBoxProps> = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpand = () => {
    action('Expanding searchbox');
    setExpanded(true);
  };

  const handleCollapse = () => {
    action('Collapsing searchbox');
    setExpanded(false);
  };

  return (
    <SearchBox
      expandable
      isExpanded={expanded}
      onExpand={handleExpand}
      onCollapse={handleCollapse}
    >
      <SearchBox.CollapsedState>
        <SearchBox.ExpandButton />
      </SearchBox.CollapsedState>
      <SearchBox.ExpandedState>
        <SearchBox.Input placeholder='Test' />
        <SearchBox.CollapseButton />
        <Divider orientation='vertical' />
        <IconButton styleType='borderless'>
          <SvgCaretUpSmall />
        </IconButton>
        <IconButton styleType='borderless'>
          <SvgCaretDownSmall />
        </IconButton>
      </SearchBox.ExpandedState>
    </SearchBox>
  );
};
