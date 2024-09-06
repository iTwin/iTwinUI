/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { isUnitTest } from '../functions/dev.js';

export const useInertPolyfill = () => {
  const loaded = React.useRef(false);
  const modulePath =
    'https://cdn.jsdelivr.net/npm/wicg-inert@3.1.2/dist/inert.min.js';

  React.useEffect(() => {
    (async () => {
      if (
        !HTMLElement.prototype.hasOwnProperty('inert') &&
        !loaded.current &&
        !isUnitTest
      ) {
        await new Function('url', 'return import(url)')(modulePath);
        loaded.current = true;
      }
    })();
  }, []);
};
