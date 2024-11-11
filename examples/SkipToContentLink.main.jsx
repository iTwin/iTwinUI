/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Kbd, SkipToContentLink } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <SkipToContentLink href='#main-content' className='skip-link' />
      <div id='main-content'>
        To view the skip link, click inside this box then press <Kbd>Tab</Kbd>.
      </div>
    </div>
  );
};
