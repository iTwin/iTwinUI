// import { SvgAdd } from '@itwin/itwinui-icons-react';
import { ExpandableBlock } from '@itwin/itwinui-react';

const App = () => {
  // const onToggleMock = jest.fn();
  return (
    <ExpandableBlock disabled>
      <ExpandableBlock.Header>
        <ExpandableBlock.LabelArea>
          <ExpandableBlock.Title>test title</ExpandableBlock.Title>
        </ExpandableBlock.LabelArea>
      </ExpandableBlock.Header>
      <ExpandableBlock.Content>test content</ExpandableBlock.Content>
    </ExpandableBlock>
  );
};

export default App;
