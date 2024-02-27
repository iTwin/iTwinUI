import { SvgSearch, SvgStar } from '@itwin/itwinui-icons-react';
import {
  Button,
  Icon,
  IconButton,
  Input,
  InputWithDecorations,
} from '@itwin/itwinui-react';

const App = () => {
  const dummyValue = Array.from({ length: 100 }, () => 'ABC').join('');
  const dummyStyle = {
    // backgroundColor: 'hotpink',
  };

  return (
    <>
      <Button>Hello world</Button>
      <InputWithDecorations>
        <Icon padded>
          <SvgStar />
        </Icon>
        <Input value={dummyValue} style={dummyStyle} />
        <IconButton styleType='borderless'>
          <SvgSearch />
        </IconButton>
      </InputWithDecorations>

      <InputWithDecorations>
        <Icon padded>
          <SvgStar />
        </Icon>
        <Input value={dummyValue} style={dummyStyle} />
        <IconButton onClick={() => console.log('pressed')}>
          <SvgSearch />
        </IconButton>
      </InputWithDecorations>

      <InputWithDecorations>
        <Icon>
          <SvgStar />
        </Icon>
        <Input value={dummyValue} style={dummyStyle} />
        <IconButton onClick={() => console.log('pressed')}>
          <SvgSearch />
        </IconButton>
      </InputWithDecorations>

      <InputWithDecorations>
        <Icon padded>
          <SvgStar />
        </Icon>
        <Input value={dummyValue} style={dummyStyle} />
        <IconButton onClick={() => console.log('pressed')}>
          <SvgSearch />
        </IconButton>
      </InputWithDecorations>
    </>
  );
};

export default App;
