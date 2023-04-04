/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { VisuallyHidden } from '@itwin/itwinui-react';

export default () => {
  return (
    <>
      <div aria-hidden='true'>★★★☆☆</div>
      <VisuallyHidden>3 stars out of 5</VisuallyHidden>
    </>
  );
};
