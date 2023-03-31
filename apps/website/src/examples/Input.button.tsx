/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { LabeledInput, IconButton } from '@itwin/itwinui-react';
import { SvgCloseSmall } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <>
      <LabeledInput
        label='Street'
        defaultValue='1051 Faribault Road'
        svgIcon={
          <IconButton styleType='borderless' aria-label='Clear street input'>
            <SvgCloseSmall />
          </IconButton>
        }
        iconDisplayStyle='inline'
      />
    </>
  );
};
