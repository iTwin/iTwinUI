import { SvgSearch } from '@itwin/itwinui-icons-react';
import { Button, IconButton, SearchBox, Flex } from '@itwin/itwinui-react';

const App = () => {
  return (
    <>
      <Flex flexDirection='column' alignItems='flex-start'>
        {/* <IconButton>
          <SvgSearch />
        </IconButton> */}
        <SearchBox expandable />
      </Flex>
    </>
  );
};

export default App;
