/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Kbd, KbdKeys } from '@itwin/itwinui-react';

export default () => {
  return (
    <p>
      Press <Kbd>{KbdKeys.Command}</Kbd> + <Kbd>K</Kbd> to search.
    </p>
  );
};
