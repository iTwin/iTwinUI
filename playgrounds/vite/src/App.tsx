import { Button, LabeledInput, SearchBox } from '@itwin/itwinui-react';

const App = () => {
  return (
    <>
      <Button>Hello world</Button>
      {/* End icon has a 9px padding (.75rem) */}
      <SearchBox>
        <SearchBox.CollapsedState />
        <SearchBox.ExpandedState>
          <SearchBox.Icon />
          {/* <span>something</span> */}
          <SearchBox.Icon />
          <SearchBox.Icon />
          <SearchBox.Icon />
          <SearchBox.Input />
          <SearchBox.CollapseButton />
          <SearchBox.CollapseButton />
        </SearchBox.ExpandedState>
      </SearchBox>
      <SearchBox>
        <SearchBox.CollapsedState />
        <SearchBox.ExpandedState>
          <SearchBox.Icon />
          <SearchBox.Input />
          <SearchBox.CollapseButton />
        </SearchBox.ExpandedState>
      </SearchBox>
      <SearchBox size='small'>
        <SearchBox.CollapsedState />
        <SearchBox.ExpandedState>
          <SearchBox.Icon />
          <SearchBox.Icon />
          <SearchBox.Icon />
          <SearchBox.Icon />
          <SearchBox.Input />
          <SearchBox.CollapseButton />
          <SearchBox.CollapseButton />
        </SearchBox.ExpandedState>
      </SearchBox>
      <SearchBox size='large'>
        <SearchBox.CollapsedState />
        <SearchBox.ExpandedState>
          <SearchBox.Icon />
          <SearchBox.Icon />
          <SearchBox.Icon />
          <SearchBox.Icon />
          <SearchBox.Input />
          <SearchBox.CollapseButton />
          <SearchBox.CollapseButton />
        </SearchBox.ExpandedState>
      </SearchBox>

      <LabeledInput label='Label' status='positive' />
      <LabeledInput label='Label' status='positive' size='small' />
    </>
  );
};

export default App;
