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
  const panelIdRoot = 'root';
  const panelIdMoreInfo = 'more-info';

  return (
    <Panels.Wrapper
      initialActiveId={panelIdRoot}
      as={Surface}
      style={{
        inlineSize: 'min(300px, 30vw)',
        blockSize: 'min(500px, 50vh)',
      }}
    >
      <Panels.Panel id={panelIdRoot} as={Surface} border={false} elevation={0}>
        <Surface.Header as={Panels.Header}>Root</Surface.Header>
        <Surface.Body as={List}>
          <ListItem>
            <Panels.Trigger for={panelIdMoreInfo}>
              <ListItem.Action>More details</ListItem.Action>
            </Panels.Trigger>
          </ListItem>
        </Surface.Body>
      </Panels.Panel>

      <Panels.Panel
        id={panelIdMoreInfo}
        as={Surface}
        border={false}
        elevation={0}
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
  const initialActiveId = 'root';

  const panels = Array.from(Array(20).keys()).map((i) => ({
    id: `panel-${i}`,
    label: `Panel ${i}`,
  }));

  return (
    <Panels.Wrapper
      initialActiveId={initialActiveId}
      as={Surface}
      style={{
        inlineSize: 'min(300px, 30vw)',
        blockSize: 'min(500px, 50vh)',
      }}
    >
      <Panels.Panel
        id={initialActiveId}
        as={Surface}
        border={false}
        elevation={0}
      >
        <Surface.Header as={Panels.Header}>Root</Surface.Header>
        <Surface.Body as={List}>
          {panels.map((panel) => (
            <ListItem key={panel.id}>
              <ListItem.Content>
                <Panels.Trigger for={`${panel.id}`}>
                  <ListItem.Action>{panel.label}</ListItem.Action>
                </Panels.Trigger>
              </ListItem.Content>
            </ListItem>
          ))}
        </Surface.Body>
      </Panels.Panel>

      {panels.map((panel) => (
        <Panels.Panel
          key={panel.id}
          id={panel.id}
          as={Surface}
          border={false}
          elevation={0}
        >
          <Surface.Header as={Panels.Header}>{panel.label}</Surface.Header>
          <Surface.Body as={Flex} flexDirection='column'>
            <Text>{`Content for ${panel.id}`}</Text>
            <Flex.Spacer />
            <Divider />
            <Text>{`Footer for ${panel.id}`}</Text>
          </Surface.Body>
        </Panels.Panel>
      ))}
    </Panels.Wrapper>
  );
};

export const MultiLevelList = () => {
  const initialActiveId = React.useId();
  const qualityPanelId = React.useId();
  const speedPanelId = React.useId();
  const accessibilityPanelId = React.useId();

  const [repeat, setRepeat] = React.useState(false);
  const [quality, setQuality] = React.useState('240p');
  const [speed, setSpeed] = React.useState('1.0x');
  const [accessibilityOptions, setAccessibilityOptions] = React.useState<
    string[]
  >([]);

  const panels = Panels.useInstance();

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
        <ListItem
          active={selected}
          aria-selected={selected}
          onClick={() => {
            panels.goBack();
          }}
        >
          <ListItem.Action onClick={() => setState(content)}>
            {content}
          </ListItem.Action>
          <ListItem.Icon />
        </ListItem>
      );
    },
    [panels],
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

  const _ItemAccessibility = React.useCallback(
    ({ content }: { content: string }) => (
      <_Item
        content={content}
        state={accessibilityOptions.includes(content) ? content : ''}
        setState={() => {
          setAccessibilityOptions((prev) =>
            prev.includes(content)
              ? prev.filter((item) => item !== content)
              : [...prev, content],
          );
        }}
      />
    ),
    [_Item, accessibilityOptions],
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
        instance={panels}
        as={Surface}
        initialActiveId={initialActiveId}
        style={{
          inlineSize: 'min(200px, 30vw)',
          blockSize: 'min(250px, 50vh)',
        }}
      >
        <Panels.Panel as={List} id={initialActiveId}>
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

        <Panels.Panel
          id={qualityPanelId}
          as={Surface}
          border={false}
          elevation={0}
        >
          <Surface.Header as={Panels.Header}>Quality</Surface.Header>
          <Surface.Body as={List}>
            {qualities.map((quality) => (
              <_ItemQuality key={quality} content={quality} />
            ))}
          </Surface.Body>
        </Panels.Panel>

        <Panels.Panel
          id={speedPanelId}
          as={Surface}
          border={false}
          elevation={0}
        >
          <Surface.Header as={Panels.Header}>Speed</Surface.Header>
          <Surface.Body as={List}>
            {speeds.map((speed) => (
              <_ItemSpeed key={speed} content={speed} />
            ))}
          </Surface.Body>
        </Panels.Panel>

        <Panels.Panel
          as={Surface}
          id={accessibilityPanelId}
          border={false}
          elevation={0}
        >
          <Surface.Header as={Panels.Header}>Accessibility</Surface.Header>
          <Surface.Body as={List}>
            <_ItemAccessibility content='High contrast' />
            <_ItemAccessibility content='Large text' />
            <_ItemAccessibility content='Screen reader' />
          </Surface.Body>
        </Panels.Panel>
      </Panels.Wrapper>
    </>
  );
};

export const NestedPanels = () => {
  const panels = Panels.useInstance();

  const initialActiveId = 'root';
  const panel1Id = 'panel-1';
  const panel1_1Id = 'panel-1-1';
  const panel1_1_1Id = 'panel-1-1-1';

  const panelIds = [initialActiveId, panel1Id, panel1_1Id, panel1_1_1Id];

  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <Button id='instance-go-back' onClick={() => panels.goBack()}>
        Go Back
      </Button>
      <Panels.Wrapper
        instance={panels}
        initialActiveId={initialActiveId}
        style={{
          width: 'min(300px, 30vw)',
          height: 'min(500px, 50vh)',
        }}
        as={Surface}
      >
        {panelIds.map((id, index) => (
          <Panels.Panel
            key={id}
            id={id}
            as={Surface}
            border={false}
            elevation={0}
          >
            <Surface.Header as={Panels.Header}>{id}</Surface.Header>
            <Surface.Body isPadded>
              <Panels.Trigger for={panelIds[index + 1]}>
                <Button>
                  Go to {panelIds[index + 1] ?? "panel that doesn't exist"}
                </Button>
              </Panels.Trigger>
            </Surface.Body>
          </Panels.Panel>
        ))}
      </Panels.Wrapper>
    </Flex>
  );
};
