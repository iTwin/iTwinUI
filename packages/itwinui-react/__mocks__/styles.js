/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
export const styles = new Proxy(
  {},
  {
    get: (target, prop) => {
      // instead of returning scoped css modules, we will preserve the original classes
      if (typeof prop === 'string' && prop.startsWith('iui')) {
        return prop;
      }
      return Reflect.get(target, prop);
    },
  },
);

export const version = 'DEV';
