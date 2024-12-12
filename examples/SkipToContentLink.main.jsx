/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SkipToContentLink } from '@itwin/itwinui-react';

export default () => {
  return (
    <div className='demo-container'>
      <div>
        <button>Click here</button> then press <kbd>Tab</kbd> to see the skip
        link.
      </div>
      {/* The SkipToContentLink component should normally be placed at the
          beginning of the page and point to the main content. This is a
          contrived example for visual demonstration. */}
      <SkipToContentLink href='#' />
    </div>
  );
};
