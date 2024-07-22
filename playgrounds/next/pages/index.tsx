import {
  Divider,
  Flex,
  List,
  ListItem,
  Panels,
  Surface,
  Text,
} from '@itwin/itwinui-react';
import React from 'react';
import { SvgShare } from '@itwin/itwinui-icons-react';

export default function Home() {
  return <MultiPanelInformationPanel />;
  // return <BasicDemo />;
}

const BasicDemo = () => {
  const basePanelId = React.useId();
  const repeatId = React.useId();
  const qualityPanelId = React.useId();
  const speedPanelId = React.useId();
  const accessibilityPanelId = React.useId();

  return (
    <>
      <Panels.Wrapper
        as={Surface}
        defaultActiveId={basePanelId}
        style={{
          inlineSize: '300px',
          blockSize: '500px',
        }}
      >
        <Panels.Panel as={List} id={basePanelId}>
          <ListItem>Repeat</ListItem>
          <ListItem>
            <Panels.Trigger for={qualityPanelId}>
              <ListItem.Action>Quality</ListItem.Action>
            </Panels.Trigger>
          </ListItem>
          <ListItem>
            <Panels.Trigger for={speedPanelId}>
              <ListItem.Action>Speed</ListItem.Action>
            </Panels.Trigger>
          </ListItem>
          <ListItem>
            <Panels.Trigger for={accessibilityPanelId}>
              <ListItem.Action>Accessibility</ListItem.Action>
            </Panels.Trigger>
          </ListItem>
        </Panels.Panel>

        <Panels.Panel as={List} id={qualityPanelId}>
          <Surface.Header as={Panels.Header}>Quality</Surface.Header>
          <ListItem>240p</ListItem>
          <ListItem>360p</ListItem>
          <ListItem>480p</ListItem>
          <ListItem>720p</ListItem>
          <ListItem>1080p</ListItem>
        </Panels.Panel>

        {/* TODO: Remove the temp _iui3-menu class */}
        <Panels.Panel as={List} id={speedPanelId}>
          <Surface.Header as={Panels.Header}>Speed</Surface.Header>
          <Surface.Body
            style={{
              maxBlockSize: '100%',
              overflowY: 'auto',
            }}
          >
            <ListItem>0.2x</ListItem>
            <ListItem>0.3x</ListItem>
            <ListItem>0.4x</ListItem>
            <ListItem>0.5x</ListItem>
            <ListItem>0.6x</ListItem>
            <ListItem>0.7x</ListItem>
            <ListItem>0.8x</ListItem>
            <ListItem>0.9x</ListItem>
            <ListItem>1.0x</ListItem>
            <ListItem>1.1x</ListItem>
            <ListItem>1.2x</ListItem>
            <ListItem>1.3x</ListItem>
            <ListItem>1.4x</ListItem>
            <ListItem>1.5x</ListItem>
            <ListItem>1.6x</ListItem>
            <ListItem>1.7x</ListItem>
            <ListItem>1.8x</ListItem>
            <ListItem>1.9x</ListItem>
            <ListItem>2.0x</ListItem>
          </Surface.Body>
        </Panels.Panel>

        <Panels.Panel as={List} id={accessibilityPanelId}>
          <Surface.Header as={Panels.Header}>Accessibility</Surface.Header>
          <ListItem>High contrast</ListItem>
          <ListItem>Large text</ListItem>
          <ListItem>Screen reader</ListItem>
        </Panels.Panel>
      </Panels.Wrapper>
    </>
  );
};

const MultiPanelInformationPanel = () => {
  const basePanelId = 'base';

  const pages = Array.from(Array(10).keys()).map((i) => ({
    id: i,
    label: `Page ${i}`,
  }));

  const [activeId, onActiveIdChange] = React.useState(basePanelId);

  return (
    <Panels.Wrapper
      defaultActiveId={basePanelId}
      as={Surface}
      activeId={activeId}
      onActiveIdChange={onActiveIdChange}
      style={{
        inlineSize: '300px',
        blockSize: '500px',
        // position: 'relative',
      }}
    >
      <Panels.Panel
        id={basePanelId}
        className='HERE'
        as={List}
        // TODO: Try having the arrow keys navigation like Tree to allow focusing the share icon button
        role='tree'
        style={{}}
      >
        <Surface.Header as={Panels.Header}>Base</Surface.Header>
        {pages.map((page) => (
          <ListItem>
            <ListItem.Content>
              <Panels.Trigger for={`${page.id}`}>
                <ListItem.Action>{page.label}</ListItem.Action>
              </Panels.Trigger>
            </ListItem.Content>
            {/* TODO: Make it to something like an IconButton */}
            <ListItem.Icon>
              <SvgShare />
            </ListItem.Icon>
          </ListItem>
        ))}
      </Panels.Panel>

      {pages.map((page) => (
        <Panels.Panel
          id={`${page.id}`}
          as={Flex}
          flexDirection='column'
          alignItems='stretch'
          style={
            {
              // blockSize: '100%',
              // display: activeId === `${page.id}` ? undefined : 'none',
            }
          }
        >
          <Surface.Header as={Panels.Header}>{page.label}</Surface.Header>
          <Surface.Body
            as={Flex}
            flexDirection='column'
            style={{
              height: '100%',
            }}
          >
            <Flex.Spacer />
            <Divider />
            <Text>{`Footer for page ${page.id}`}</Text>
          </Surface.Body>
        </Panels.Panel>
      ))}
    </Panels.Wrapper>
  );
};
