/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Panels, Flex, Surface, Button } from '@itwin/itwinui-react';

export default () => {
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
