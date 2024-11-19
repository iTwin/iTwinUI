/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  unstable_Panels as Panels,
  List,
  ListItem,
  Surface,
  ToggleSwitch,
} from '@itwin/itwinui-react';

export default () => {
  const initialActiveId = React.useId();
  const qualityPanelId = React.useId();
  const speedPanelId = React.useId();
  const accessibilityPanelId = React.useId();

  const [repeat, setRepeat] = React.useState(false);
  const [quality, setQuality] = React.useState('240p');
  const [speed, setSpeed] = React.useState('1.0x');
  const [accessibilityOptions, setAccessibilityOptions] = React.useState([]);

  const panels = Panels.useInstance();

  const _Item = React.useCallback(
    ({ content, state, setState }) => {
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
    ({ content }) => (
      <_Item content={content} state={quality} setState={setQuality} />
    ),
    [_Item, quality],
  );

  const _ItemSpeed = React.useCallback(
    ({ content }) => (
      <_Item content={content} state={speed} setState={setSpeed} />
    ),
    [_Item, speed],
  );

  const _ItemAccessibility = React.useCallback(
    ({ content }) => (
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

  const toggleSwitchId = React.useId();

  return (
    <>
      <Panels.Wrapper
        instance={panels}
        as={Surface}
        className='demo-panels-wrapper'
      >
        <Panels.Panel id={initialActiveId}>
          <List>
            <ListItem>
              <ListItem.Content as='label' htmlFor={toggleSwitchId}>
                Repeat
              </ListItem.Content>
              <ToggleSwitch
                id={toggleSwitchId}
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
          </List>
        </Panels.Panel>

        <Panels.Panel
          id={qualityPanelId}
          as={Flex}
          flexDirection='column'
          alignItems='stretch'
          gap='0'
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
          as={Flex}
          flexDirection='column'
          alignItems='stretch'
          gap='0'
        >
          <Surface.Header as={Panels.Header}>Speed</Surface.Header>
          <Surface.Body as={List}>
            {speeds.map((speed) => (
              <_ItemSpeed key={speed} content={speed} />
            ))}
          </Surface.Body>
        </Panels.Panel>

        <Panels.Panel
          id={accessibilityPanelId}
          as={Flex}
          flexDirection='column'
          alignItems='stretch'
          gap='0'
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
