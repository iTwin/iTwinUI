/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Kbd, SkipToContentLink } from '@itwin/itwinui-react';

export default () => {
  return (
    <>
      <SkipToContentLink href='#main-content'>
        Go to main section
      </SkipToContentLink>
      <div id='main-content'>
        To view the skip link, click inside this box then press <Kbd>Enter</Kbd>
        .
      </div>
    </>
  );
};
