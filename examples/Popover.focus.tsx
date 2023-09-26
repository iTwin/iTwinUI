/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, Flex, Popover, Surface, Text } from '@itwin/itwinui-react';

export default () => {
  const idPrefix = React.useId();
  const headingId = `${idPrefix}-label`;
  const descriptionId = `${idPrefix}-description`;

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      applyBackground
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      visible={isOpen}
      onVisibleChange={setIsOpen}
      style={{ maxWidth: '45ch', border: 'none' }}
      content={
        <Surface elevation={0}>
          <Surface.Header>
            <Text as='h3' id={headingId} variant='leading'>
              Terms and conditions
            </Text>
          </Surface.Header>
          <Surface.Body isPadded>
            <Flex flexDirection='column' alignItems='start'>
              <Text as='p' id={descriptionId}>
                (TODO: improve text) Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Voluptatem, voluptates impedit rem incidunt
                excepturi accusamus facilis doloribus saepe quibusdam
                reiciendis.
              </Text>

              <Button
                ref={(el) => el?.focus()}
                onClick={() => setIsOpen(false)}
                styleType='high-visibility'
              >
                Agree
              </Button>
            </Flex>
          </Surface.Body>
        </Surface>
      }
    >
      <Button>Details…</Button>
    </Popover>
  );
};
