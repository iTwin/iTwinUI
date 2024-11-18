/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  unstable_Panels as Panels,
  List,
  ListItem,
  Surface,
  Text,
} from '@itwin/itwinui-react';

export default () => {
  const panelIdRoot = 'root';
  const panelIdMoreInfo = 'more-info';

  return (
    <Panels.Wrapper as={Surface} className='demo-panels-wrapper'>
      <Panels.Panel id={panelIdRoot}>
        <Surface.Header as={Panels.Header}>Root</Surface.Header>
        <Surface.Body as={List}>
          <ListItem>
            <Panels.Trigger for={panelIdMoreInfo}>
              <ListItem.Action>More details</ListItem.Action>
            </Panels.Trigger>
          </ListItem>
        </Surface.Body>
      </Panels.Panel>

      <Panels.Panel id={panelIdMoreInfo}>
        <Surface.Header as={Panels.Header}>More details</Surface.Header>
        <Surface.Body isPadded>
          <Text>Content</Text>
        </Surface.Body>
      </Panels.Panel>
    </Panels.Wrapper>
  );
};
