/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Footer } from '@itwin/itwinui-react';

export default () => {
  return (
    <Footer
      customElements={() => [
        {
          title: 'Custom Element 1',
          url: 'https://www.bentley.com/',
        },
        {
          title: 'Custom Element 2',
        },
        {
          title: 'Custom Element 3',
        },
        {
          title: 'Custom Element 4',
        },
      ]}
    />
  );
};
