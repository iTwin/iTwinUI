/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
module.exports = new Proxy(
  {},
  {
    get: (target, prop) => {
      // instead of returning scoped css modules, we will preserve the original classes
      if (prop.startsWith('iui')) {
        return prop;
      }
      return Reflect.get(target, prop);
    },
  },
);
