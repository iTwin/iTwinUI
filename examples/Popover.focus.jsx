/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Button,
  IconButton,
  LabeledInput,
  Popover,
  Surface,
  Text,
} from '@itwin/itwinui-react';
import { SvgSettings } from '@itwin/itwinui-icons-react';

export default () => {
  const headingId = `${React.useId()}-label`;

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      applyBackground
      aria-labelledby={headingId}
      visible={isOpen}
      onVisibleChange={setIsOpen}
      className='demo-popover'
      content={
        <Surface elevation={0} border={false}>
          <Surface.Header>
            <Text as='h3' id={headingId} variant='leading'>
              Settings
            </Text>
          </Surface.Header>
          <Surface.Body isPadded>
            <div className='demo-container'>
              {/* this will be focused when popover opens */}
              <LabeledInput label='Quality' autoFocus />

              <LabeledInput label='Grain' />
              <LabeledInput label='Saturation' />

              <Button
                styleType='high-visibility'
                onClick={() => setIsOpen(false)}
              >
                Apply
              </Button>
            </div>
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
