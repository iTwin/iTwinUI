/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ButtonGroup, Button, Input, Label } from '@itwin/itwinui-react';

export default () => {
  return (
    <div>
      <Label htmlFor='url'>Share</Label>
      <ButtonGroup>
        <Input id='url' defaultValue='https://itwinui.bentley.com/docs/input' readOnly />
        <Button
          styleType='high-visibility'
          onClick={async () => {
            await navigator.clipboard.writeText(`https://itwinui.bentley.com/docs/input`);
          }}
        >
          Copy
        </Button>
      </ButtonGroup>
    </div>
  );
};
