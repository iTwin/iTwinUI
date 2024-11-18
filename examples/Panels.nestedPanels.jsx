/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  unstable_Panels as Panels,
  Flex,
  Surface,
  Button,
} from '@itwin/itwinui-react';

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
        as={Surface}
        className='demo-panels-wrapper'
      >
        {panelIds.map((id, index) => (
          <Panels.Panel key={id} id={id}>
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
