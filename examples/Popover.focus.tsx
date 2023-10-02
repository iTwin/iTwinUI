/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Button,
  Flex,
  IconButton,
  LabeledInput,
  Popover,
  Surface,
  Text,
} from '@itwin/itwinui-react';
import { SvgSettings } from '@itwin/itwinui-icons-react';

export default () => {
  const idPrefix = React.useId();
  const headingId = `${idPrefix}-label`;

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      applyBackground
      aria-labelledby={headingId}
      visible={isOpen}
      onVisibleChange={setIsOpen}
      style={{ maxWidth: '45ch', border: 'none' }}
      content={
        <Surface elevation={0}>
          <Surface.Header>
            <Text as='h3' id={headingId} variant='leading'>
              Settings
            </Text>
          </Surface.Header>
          <Surface.Body isPadded>
            <Flex flexDirection='column' alignItems='flex-end'>
              <LabeledInput label='Quality' autoFocus />
              <LabeledInput label='Grain' />
              <LabeledInput label='Saturation' />

              <Button
                styleType='high-visibility'
                onClick={() => setIsOpen(false)}
              >
                Apply
              </Button>
            </Flex>
          </Surface.Body>
        </Surface>
      }
    >
      <IconButton label='Adjust settings'>
        <SvgSettings />
      </IconButton>
    </Popover>
  );
};
