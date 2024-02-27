import { SvgSearch, SvgStar } from '@itwin/itwinui-icons-react';
import {
  Button,
  Flex,
  Text,
  Icon,
  IconButton,
  Input,
  InputWithDecorations,
  Divider,
} from '@itwin/itwinui-react';

const App = () => {
  const dummyValue = Array.from({ length: 100 }, () => 'ABC').join('');
  const dummyStyle = {
    // backgroundColor: 'hotpink',
  };

  return (
    <>
      <Flex flexDirection='column' gap='l' alignItems='stretch'>
        <Section title='Begin Icon - End IconButton'>
          <SectionSubtitle>padded Icon - borderless IconButton</SectionSubtitle>
          <SectionText>Both paddings collapsed</SectionText>
          <InputWithDecorations>
            <Icon padded>
              <SvgStar />
            </Icon>
            <Input value={dummyValue} style={dummyStyle} />
            <IconButton styleType='borderless'>
              <SvgSearch />
            </IconButton>
          </InputWithDecorations>

          <SectionSubtitle>padded Icon - default IconButton</SectionSubtitle>
          <SectionText>Only start padding collapsed</SectionText>
          <InputWithDecorations>
            <Icon padded>
              <SvgStar />
            </Icon>
            <Input value={dummyValue} style={dummyStyle} />
            <IconButton onClick={() => console.log('pressed')}>
              <SvgSearch />
            </IconButton>
          </InputWithDecorations>

          <SectionSubtitle>
            non-padded Icon - borderless IconButton
          </SectionSubtitle>
          <SectionText>Only end padding collapsed</SectionText>
          <InputWithDecorations>
            <Icon>
              <SvgStar />
            </Icon>
            <Input value={dummyValue} style={dummyStyle} />
            <IconButton
              styleType='borderless'
              onClick={() => console.log('pressed')}
            >
              <SvgSearch />
            </IconButton>
          </InputWithDecorations>

          <SectionSubtitle>
            non-padded Icon - default IconButton
          </SectionSubtitle>
          <SectionText>No paddings collapsed</SectionText>
          <InputWithDecorations>
            <Icon>
              <SvgStar />
            </Icon>
            <Input value={dummyValue} style={dummyStyle} />
            <IconButton onClick={() => console.log('pressed')}>
              <SvgSearch />
            </IconButton>
          </InputWithDecorations>
        </Section>

        <CustomDivider />

        <Section title='Begin IconButton - End Icon'>
          <SectionSubtitle>borderless IconButton - padded Icon</SectionSubtitle>
          <SectionText>Both paddings collapsed</SectionText>
          <InputWithDecorations>
            <IconButton
              styleType='borderless'
              onClick={() => console.log('pressed')}
            >
              <SvgSearch />
            </IconButton>
            <Input value={dummyValue} style={dummyStyle} />
            <Icon padded>
              <SvgStar />
            </Icon>
          </InputWithDecorations>

          <SectionSubtitle>
            borderless IconButton - non-padded Icon
          </SectionSubtitle>
          <SectionText>Only start padding collapsed</SectionText>
          <InputWithDecorations>
            <IconButton
              styleType='borderless'
              onClick={() => console.log('pressed')}
            >
              <SvgSearch />
            </IconButton>
            <Input value={dummyValue} style={dummyStyle} />
            <Icon>
              <SvgStar />
            </Icon>
          </InputWithDecorations>

          <SectionSubtitle>default IconButton - padded Icon</SectionSubtitle>
          <SectionText>Only end padding collapsed</SectionText>
          <InputWithDecorations>
            <IconButton onClick={() => console.log('pressed')}>
              <SvgSearch />
            </IconButton>
            <Input value={dummyValue} style={dummyStyle} />
            <Icon padded>
              <SvgStar />
            </Icon>
          </InputWithDecorations>

          <SectionSubtitle>
            default IconButton - non-padded Icon
          </SectionSubtitle>
          <SectionText>No paddings collapsed</SectionText>
          <InputWithDecorations>
            <IconButton onClick={() => console.log('pressed')}>
              <SvgSearch />
            </IconButton>
            <Input value={dummyValue} style={dummyStyle} />
            <Icon>
              <SvgStar />
            </Icon>
          </InputWithDecorations>
        </Section>

        <CustomDivider />

        <Section title='non Icon/IconButton'>
          <SectionText>No paddings collapsed</SectionText>

          <InputWithDecorations>
            <SvgStar />
            <Input value={dummyValue} style={dummyStyle} />
            <Button onClick={() => console.log('pressed')}>Button</Button>
          </InputWithDecorations>
        </Section>
      </Flex>
    </>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Flex as='section' flexDirection='column' alignItems='stretch'>
    <Text as='h1' variant='title'>
      {title}
    </Text>
    {children}
  </Flex>
);

const SectionSubtitle = ({ children }: { children: React.ReactNode }) => (
  <Text as='h2' variant='subheading'>
    {children}
  </Text>
);

const SectionText = ({ children }: { children: React.ReactNode }) => (
  <Text as='p' variant='body'>
    {children}
  </Text>
);

const CustomDivider = () => <Divider style={{ margin: '1rem 0' }} />;

export default App;
