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
  getProps: (children: JSX.Element) => Record<string, unknown>,
) => {
  if (!children) {
    return null;
  }

  if (!React.isValidElement(children)) {
    return children;
  }

  const props = getProps(children);
  const ref = mergeRefs(
    ...[
      'ref' in children.props
        ? children.props.ref
        : 'ref' in children
          ? children.ref
          : null,
      'ref' in props ? props.ref : null,
    ].filter(Boolean),
  );

  return React.cloneElement(children, {
    ...props,
    // we already checked ref above and handled null, so ts-ignore is ok
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ref,
  });
};

/**
 * Returns an object with `inert` if the `inert` argument is `true`.
 *
 * The value of the `inert` prop is adjusted to work with all React versions, including React 19+.
 */
export const getReactVersionSafeInertProp = (inert = true) => {
  const inertValue =
    Number(React.version.split('.')[0]) >= 19 ? true : undefined;
  return inert ? { inert: inertValue } : {};
};
