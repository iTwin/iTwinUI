import {
  Divider,
  Flex,
  IconButton,
  SearchBox,
  Text,
} from '@itwin/itwinui-react';
import { SvgSearch } from '@itwin/itwinui-icons-react';

export default function App() {
  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <Text>Regular Expandable SearchBox</Text>
      <SearchBox expandable>
        <SearchBox.CollapsedState>
          <SearchBox.ExpandButton />
        </SearchBox.CollapsedState>
        <SearchBox.ExpandedState>
          <SearchBox.Icon />
          <SearchBox.Input />
          <SearchBox.CollapseButton />
        </SearchBox.ExpandedState>
      </SearchBox>

      <Divider />

      <Text>Regular IconButton</Text>
      <IconButton>
        <SvgSearch />
      </IconButton>

      <Divider />

      <Text>Borderless Expandable SearchBox</Text>
      <SearchBox expandable>
        <SearchBox.CollapsedState>
          <SearchBox.ExpandButton styleType='borderless' />
        </SearchBox.CollapsedState>
        <SearchBox.ExpandedState>
          <SearchBox.Icon />
          <SearchBox.Input />
          <SearchBox.CollapseButton />
        </SearchBox.ExpandedState>
      </SearchBox>
      <SearchBox expandable>
        <SearchBox.CollapsedState>
          <SearchBox.ExpandButton styleType='borderless' />
        </SearchBox.CollapsedState>
        <SearchBox.ExpandedState>
          <SearchBox.Icon />
          <SearchBox.Input />
          <SearchBox.CollapseButton />
        </SearchBox.ExpandedState>
      </SearchBox>

      <Divider />

      <Text>Borderless IconButton</Text>
      <IconButton styleType='borderless'>
        <SvgSearch />
      </IconButton>

      <Divider />

      <Text>Regular Expandable SearchBox (expanded)</Text>
      <SearchBox expandable isExpanded={true}>
        <SearchBox.CollapsedState>
          <SearchBox.ExpandButton />
        </SearchBox.CollapsedState>
        <SearchBox.ExpandedState>
          <SearchBox.Icon />
          <SearchBox.Input />
          <SearchBox.CollapseButton />
        </SearchBox.ExpandedState>
      </SearchBox>

      <Divider />

      <Text>Borderless Expandable SearchBox (expanded)</Text>
      <SearchBox expandable isExpanded={true}>
        <SearchBox.CollapsedState>
          <SearchBox.ExpandButton styleType='borderless' />
        </SearchBox.CollapsedState>
        <SearchBox.ExpandedState>
          <SearchBox.Icon />
          <SearchBox.Input />
          <SearchBox.CollapseButton />
        </SearchBox.ExpandedState>
      </SearchBox>

      <Divider />
    </Flex>
  );
}
