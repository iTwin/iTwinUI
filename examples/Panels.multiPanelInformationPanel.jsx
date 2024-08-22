/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Panels,
  List,
  ListItem,
  Flex,
  Surface,
  Text,
} from '@itwin/itwinui-react';

export default () => {
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
