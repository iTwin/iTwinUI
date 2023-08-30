/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  LabeledInput,
  IconButton,
  InputGrid,
  Label,
  InputWithDecorations,
} from '@itwin/itwinui-react';
import { SvgCloseSmall } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <>
      <InputGrid>
        <Label htmlFor='input-1'>Street</Label>
        <InputWithDecorations>
          <InputWithDecorations.Input
            id='input-1'
            defaultValue='1051 Faribault Road'
          />
          <InputWithDecorations.Button>
            <SvgCloseSmall />
          </InputWithDecorations.Button>
        </InputWithDecorations>
      </InputGrid>
    </>
  );
};
