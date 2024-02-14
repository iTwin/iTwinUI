/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { IdeasButton } from '@itwin/itwinui-react';

export default () => {
  return (
    /** Creating a container only for demo purposes. Normally this will be fixed to viewport. */
    <div className='ideas-button-container'>
      <IdeasButton onClick={() => {}} />
    </div>
  );
};
