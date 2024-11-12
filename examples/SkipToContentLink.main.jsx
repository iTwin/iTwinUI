/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Button, Kbd, SkipToContentLink } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <div>
        <Button>Click here</Button> then press <Kbd>Tab</Kbd> to see the skip
        link.
      </div>
      {/* The SkipToContentLink component should normally be placed at the
          beginning of the page and point to the main content. This is a
          contrived example for visual demonstration. */}
      <SkipToContentLink href='#' />
    </div>
  );
};
