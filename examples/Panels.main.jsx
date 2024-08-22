/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Panels, List, ListItem, Surface, Text } from '@itwin/itwinui-react';

export default () => {
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
