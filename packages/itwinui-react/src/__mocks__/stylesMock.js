/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
module.exports = new Proxy(
  {},
  {
    // instead of returning scoped css modules, we will preserve the original classes
    get: (...args) => {
      return Reflect.get(...args);
    },
  },
);
