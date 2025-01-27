/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { mergeRefs } from '../hooks/useMergedRefs.js';

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
  // if (!children) {
  //   return null;
  // }

  // if (!React.isValidElement(children)) {
  //   return children;
  // }

  if (!children) {
    return null;
  }

  if (!React.isValidElement(children)) {
    return children;
  }

  const childrenRef = (children as any)?.props?.ref || (children as any)?.ref;

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
