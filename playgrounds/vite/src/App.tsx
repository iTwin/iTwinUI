import * as React from 'react';
import { Button, Flex, IconButton, SearchBox } from '@itwin/itwinui-react';
import { SvgSearch } from '@itwin/itwinui-icons-react';
import {
  InputFlexContainer,
  InputFlexContainerButton,
} from '../../../packages/itwinui-react/esm/utils/index';

export default function App() {
  return (
    <Flex flexDirection='column' alignItems='stretch'>
      <Flex justifyContent='flex-end'>
        <IconButton>…</IconButton>
        <IconButton>…</IconButton>
        <SearchBox
          // isExpanded
          expandable
          // onExpand={() => {
          //   console.log('EX');
          // }}
          // onCollapse={() => console.log('CO')}
        >
          <SearchBox.CollapsedState>
            <SearchBox.ExpandButton styleType='borderless' />
            {/* <IconButton styleType='borderless'>…</IconButton> */}
          </SearchBox.CollapsedState>
          <SearchBox.ExpandedState>
            <SearchBox.Icon />
            <SearchBox.Input />
            <SearchBox.CollapseButton />
          </SearchBox.ExpandedState>
        </SearchBox>
      </Flex>
      <Flex justifyContent='flex-end'>
        <IconButton styleType='borderless'>
          <SvgSearch />
        </IconButton>
      </Flex>

      <Flex justifyContent='flex-end'>
        <SearchBox
          expandable
          inputProps={{ placeholder: 'Expandable search...' }}
        />
      </Flex>
    </Flex>
  );
}
