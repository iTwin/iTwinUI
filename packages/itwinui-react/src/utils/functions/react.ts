/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { mergeRefs } from '../hooks/useMergedRefs.js';

const _React = React;

/**
 * `true` if the current React version is 17 or 18. Else, is `false`.
 * @private
 */
export const isReact17or18 = (() => {
  const version = _React.version?.split('.')?.[0];
  return ['17', '18'].includes(version);
})();

/**
 * Wrapper over `cloneElement` that automatically checks for `isValidElement`
 * and automatically merges `children.ref` with the ref passed in props.
 *
 * @private
 */
export const cloneElementWithRef = (
  children: React.ReactNode,
  getProps: (children: React.JSX.Element) => Record<string, unknown>,
) => {
  if (!children) {
    return null;
  }

  if (!React.isValidElement<Record<string, any>>(children)) {
    return children;
  }

  // Supporting React 19 and earlier versions
  const childrenRef = (() => {
    if (isReact17or18) {
      return (children as any)?.ref;
    }
    return children.props?.ref;
  })();

  const props = getProps(children);
  const ref = mergeRefs(
    ...[childrenRef, 'ref' in props ? props.ref : null].filter(Boolean),
  );

  return React.cloneElement(children, {
    ...props,
    // we already checked ref above and handled null, so ts-ignore is ok
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ref,
  });
};
