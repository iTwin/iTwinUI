import { Button, List, ListItem, LinkAction } from '@itwin/itwinui-react';

const App = () => {
  return (
    <>
      <List>
        <ListItem>
          <LinkAction href='#'>item 1</LinkAction>
        </ListItem>
        <ListItem>item 2</ListItem>
        <ListItem>item 3</ListItem>
      </List>
    </>
  );
};

export default App;
