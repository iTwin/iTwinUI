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
        label='Address'
        placeholder='1600 Pennsylvania Avenue, Washington, DC 20500'
        defaultValue='685 Stockton Dr, Exton, PA 19341'
        svgIcon={
          <IconButton styleType='borderless'>
            <SvgCloseSmall />
          </IconButton>
        }
        iconDisplayStyle='inline'
      />
    </>
  );
};
