/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Button,
  Divider,
  Flex,
  List,
  ListItem,
  Panels,
  Surface,
  Text,
  ToggleSwitch,
} from '@itwin/itwinui-react';

export default {
  component: Panels,
  title: 'Panels',
};

export const Basic = () => {
  const panelIdRoot = React.useId();
  const panelIdMoreInfo = React.useId();

  return (
    <Panels.Wrapper
      initialActiveId={panelIdRoot}
      as={Surface}
      style={{
        inlineSize: 'min(300px, 30vw)',
        blockSize: 'min(500px, 50vh)',
      }}
    >
      <Panels.Panel id={panelIdRoot} as={List}>
        <Surface.Header as={Panels.Header}>Base</Surface.Header>
        <ListItem>
          <Panels.Trigger for={panelIdMoreInfo}>
            <ListItem.Action>More details</ListItem.Action>
          </Panels.Trigger>
        </ListItem>
      </Panels.Panel>

      <Panels.Panel
        id={panelIdMoreInfo}
        as={Flex}
        flexDirection='column'
        alignItems='stretch'
      >
        <Surface.Header as={Panels.Header}>More details</Surface.Header>
        <Surface.Body isPadded>
          <Text>Content</Text>
        </Surface.Body>
      </Panels.Panel>
    </Panels.Wrapper>
  );
};

export const Controlled = () => {
  const panelIdRoot = React.useId();
  const panelIdMoreInfo = React.useId();

  const [activeId, setActiveId] = React.useState<
    React.ComponentPropsWithoutRef<typeof Panels.Wrapper>['activeId']
  >({ id: panelIdRoot });

  return (
    <Panels.Wrapper
      initialActiveId={panelIdRoot}
      activeId={activeId}
      onActiveIdChange={(newActiveId) => setActiveId(newActiveId)}
      as={Surface}
      style={{
        inlineSize: 'min(300px, 30vw)',
        blockSize: 'min(500px, 50vh)',
      }}
    >
      <Panels.Panel id={panelIdRoot}>
        <Surface.Header as={Panels.Header}>Base</Surface.Header>

        <Flex flexDirection='column' alignItems='stretch'>
          <Flex flexWrap='wrap' style={{ padding: 'var(--iui-size-s)' }}>
            <Button
              onClick={() => {
                setActiveId({ id: panelIdMoreInfo });
              }}
            >
              Next panel (without animation)
            </Button>
            <Button
              onClick={() => {
                setActiveId({ id: panelIdMoreInfo, direction: 'next' });
              }}
            >
              Next panel (with animation)
            </Button>
          </Flex>

          <Divider />

          <List>
            <ListItem>
              <Panels.Trigger for={panelIdMoreInfo}>
                <ListItem.Action>{`Next panel (using <Panels.Trigger>)`}</ListItem.Action>
              </Panels.Trigger>
            </ListItem>
          </List>
        </Flex>
      </Panels.Panel>

      <Panels.Panel
        id={panelIdMoreInfo}
        as={Flex}
        flexDirection='column'
        alignItems='stretch'
      >
        <Surface.Header as={Panels.Header}>More details</Surface.Header>
        <Surface.Body isPadded>
          <Text>Content</Text>
        </Surface.Body>
      </Panels.Panel>
    </Panels.Wrapper>
  );
};

export const MultiPanelInformationPanel = () => {
  const basePanelId = 'base';

  const pages = Array.from(Array(10).keys()).map((i) => ({
    id: i,
    label: `Page ${i}`,
  }));

  return (
    <Panels.Wrapper
      initialActiveId={basePanelId}
      as={Surface}
      style={{
        inlineSize: 'min(300px, 30vw)',
        blockSize: 'min(500px, 50vh)',
      }}
    >
      <Panels.Panel id={basePanelId} as={List}>
        <Surface.Header as={Panels.Header}>Base</Surface.Header>
        {pages.map((page) => (
          <ListItem key={page.id}>
            <ListItem.Content>
              <Panels.Trigger for={`${page.id}`}>
                <ListItem.Action>{page.label}</ListItem.Action>
              </Panels.Trigger>
            </ListItem.Content>
          </ListItem>
        ))}
      </Panels.Panel>

      {pages.map((page) => (
        <Panels.Panel
          key={page.id}
          id={`${page.id}`}
          as={Flex}
          flexDirection='column'
          alignItems='stretch'
        >
          <Surface.Header as={Panels.Header}>{page.label}</Surface.Header>
          <Surface.Body
            as={Flex}
            flexDirection='column'
            style={{
              height: '100%',
            }}
          >
            <Text>{`Content for page ${page.id}`}</Text>
            <Flex.Spacer />
            <Divider />
            <Text>{`Footer for page ${page.id}`}</Text>
          </Surface.Body>
        </Panels.Panel>
      ))}
    </Panels.Wrapper>
  );
};

export const MultiLevelList = () => {
  const basePanelId = React.useId();
  const qualityPanelId = React.useId();
  const speedPanelId = React.useId();
  const accessibilityPanelId = React.useId();

  const [repeat, setRepeat] = React.useState(false);
  const [quality, setQuality] = React.useState('240p');
  const [speed, setSpeed] = React.useState('1.0x');

  const _Item = React.useCallback(
    ({
      content,
      state,
      setState,
    }: {
      content: string;
      state: string;
      setState: React.Dispatch<React.SetStateAction<string>>;
    }) => {
      const selected = state === content;

      return (
        <ListItem active={selected} aria-selected={selected}>
          <ListItem.Action onClick={() => setState(content)}>
            {content}
          </ListItem.Action>
          <ListItem.Icon />
        </ListItem>
      );
    },
    [],
  );

  const _ItemQuality = React.useCallback(
    ({ content }: { content: string }) => (
      <_Item content={content} state={quality} setState={setQuality} />
    ),
    [_Item, quality],
  );

  const _ItemSpeed = React.useCallback(
    ({ content }: { content: string }) => (
      <_Item content={content} state={speed} setState={setSpeed} />
    ),
    [_Item, speed],
  );

  const qualities = React.useMemo(
    () => ['240p', '360p', '480p', '720p', '1080p'],
    [],
  );

  const speeds = React.useMemo(
    () => Array.from({ length: 21 }, (_, i) => (i * 0.1).toFixed(1) + 'x'),
    [],
  );

  return (
    <>
      <Panels.Wrapper
        as={Surface}
        initialActiveId={basePanelId}
        style={{
          inlineSize: 'min(200px, 30vw)',
          blockSize: 'min(250px, 50vh)',
        }}
      >
        <Panels.Panel as={List} id={basePanelId}>
          <ListItem as='label'>
            <ListItem.Content>Repeat</ListItem.Content>
            <ToggleSwitch
              onChange={(e) => setRepeat(e.target.checked)}
              checked={repeat}
            />
          </ListItem>
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
          {qualities.map((quality) => (
            <_ItemQuality key={quality} content={quality} />
          ))}
        </Panels.Panel>

        <Panels.Panel as={List} id={speedPanelId}>
          <Surface.Header as={Panels.Header}>Speed</Surface.Header>
          <Surface.Body
            style={{
              maxBlockSize: '100%',
              overflowY: 'auto',
            }}
          >
            {speeds.map((speed) => (
              <_ItemSpeed key={speed} content={speed} />
            ))}
          </Surface.Body>
        </Panels.Panel>

        <Panels.Panel as={List} id={accessibilityPanelId}>
          <Surface.Header as={Panels.Header}>Accessibility</Surface.Header>
          <ListItem>
            <ListItem.Action>High contrast</ListItem.Action>
          </ListItem>
          <ListItem>
            <ListItem.Action>Large text</ListItem.Action>
          </ListItem>
          <ListItem>
            <ListItem.Action>Screen reader</ListItem.Action>
          </ListItem>
        </Panels.Panel>
      </Panels.Wrapper>
    </>
  );
};
