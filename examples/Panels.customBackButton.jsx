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

      <Panels.Panel id={panelIdMoreInfo} as={Surface}>
        <Surface.Header as={Flex}>
          <Panels.BackButton label='Go back to home'>
            <SvgArrowLeft />
          </Panels.BackButton>
          More details
        </Surface.Header>
        <Surface.Body isPadded>
          <Text>Content</Text>
        </Surface.Body>
      </Panels.Panel>
    </Panels.Wrapper>
  );
};
