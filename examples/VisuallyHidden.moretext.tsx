/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { VisuallyHidden } from '@itwin/itwinui-react';

export default () => {
  return (
    <ul>
      <li>
        Item 1{' '}
        <button>
          Delete <VisuallyHidden>item 1</VisuallyHidden>
        </button>
      </li>

      <li>
        Item 2{' '}
        <button>
          Delete <VisuallyHidden>item 2</VisuallyHidden>
        </button>
      </li>

      <li>
        Item 3{' '}
        <button>
          Delete <VisuallyHidden>item 3</VisuallyHidden>
        </button>
      </li>
    </ul>
  );
};
