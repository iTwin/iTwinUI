/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useState } from 'react';
import { SearchBox, Text, Divider } from '@itwin/itwinui-react';
import { SvgCaretDownSmall, SvgCaretUpSmall } from '@itwin/itwinui-icons-react';

export default {
  title: 'SearchBox',
};

export const Basic = () => {
  return <SearchBox inputProps={{ placeholder: 'Basic search' }} />;
};

export const BasicWithCustomItems = () => {
  return (
    <SearchBox>
      <SearchBox.Button label='Search button' />
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
      <SearchBox.Button aria-label='Previous result'>
        <SvgCaretUpSmall />
      </SearchBox.Button>
      <SearchBox.Button aria-label='Next result'>
        <SvgCaretDownSmall />
      </SearchBox.Button>
    </SearchBox>
  );
};

export const BasicWithStatus = () => {
  return (
    <SearchBox
      inputProps={{ placeholder: 'Search with warning' }}
      status='warning'
    />
  );
};

export const Expandable = () => {
  return (
    <SearchBox expandable inputProps={{ placeholder: 'Expandable search' }} />
  );
};

export const BorderlessCollapsedState = () => {
  return (
    <SearchBox expandable>
      <SearchBox.CollapsedState>
        <SearchBox.ExpandButton styleType='borderless' />
      </SearchBox.CollapsedState>
      <SearchBox.ExpandedState>
        <SearchBox.Icon />
        <SearchBox.Input placeholder='Expandable search with borderless SearchBox.CollapsedState' />
        <SearchBox.CollapseButton />
      </SearchBox.ExpandedState>
    </SearchBox>
  );
};

export const ExpandableWithCustomItems = () => {
  return (
    <SearchBox expandable>
      <SearchBox.CollapsedState />
      <SearchBox.ExpandedState>
        <SearchBox.Input placeholder='Expandable search with custom interactions' />
        <SearchBox.Button aria-label='Previous result'>
          <SvgCaretUpSmall />
        </SearchBox.Button>
        <SearchBox.Button aria-label='Next result'>
          <SvgCaretDownSmall />
        </SearchBox.Button>
        <Divider orientation='vertical' />
        <SearchBox.CollapseButton />
      </SearchBox.ExpandedState>
    </SearchBox>
  );
};

export const Small = () => {
  return <SearchBox size='small' inputProps={{ placeholder: 'Search...' }} />;
};

export const WithCustomAction = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    console.log('Expanding searchbox');
    setExpanded(true);
  };

  const handleCollapse = () => {
    console.log('Collapsing searchbox');
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
        <SearchBox.Button aria-label='Previous result'>
          <SvgCaretUpSmall />
        </SearchBox.Button>
        <SearchBox.Button aria-label='Next result'>
          <SvgCaretDownSmall />
        </SearchBox.Button>
      </SearchBox.ExpandedState>
    </SearchBox>
  );
};
