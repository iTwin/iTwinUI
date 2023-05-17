/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { useGlobals } from '../hooks/useGlobals.js';

const _base = <As extends keyof JSX.IntrinsicElements = 'div'>(
  defaultElement: As,
) => {
  return (className: string, attrs?: JSX.IntrinsicElements[As]) => {
    const Comp = React.forwardRef(({ as = defaultElement, ...props }, ref) => {
      const Element = (as as any) || 'div'; // eslint-disable-line

      useGlobals();

      return (
        <Element
          ref={ref}
          {...attrs}
          {...props}
          className={cx(className, attrs?.className, props.className)}
        />
      );
    }) as PolymorphicForwardRefComponent<
      NonNullable<typeof defaultElement>,
      {} // eslint-disable-line
    >;

    Comp.displayName = getDisplayNameFromClass(className);

    return Comp;
  };
};

/**
 * Utility to create a type-safe polymorphic component with a simple class.
 *
 * Can be called directly or as a property of the `Polymorphic` object.
 * In both cases, returns a component that:
 * - supports `as` prop with default element
 * - forwards ref and rest props
 * - adds and merges css classes
 *
 * @example
 * const MyPolyDiv = polymorphic('my-poly-div');
 * <MyPolyDiv>...</MyPolyDiv>;
 *
 * @example
 * const MyPolyButton = polymorphic.button('my-poly-button', { type: 'button' });
 * <MyPolyButton as='a' href='#'>...</MyPolyButton>;
 *
 * @private
 */
export const polymorphic = new Proxy(_base('div'), {
  get: (target, prop) => {
    if (typeof prop === 'string') {
      // eslint-disable-next-line -- string is as far as we can narrow it down
      // @ts-ignore
      return _base(prop);
    }
    return Reflect.get(target, prop);
  },
}) as ReturnType<typeof _base> & {
  [key in keyof JSX.IntrinsicElements]: ReturnType<typeof _base<key>>;
};

// e.g. iui-list-item-icon -> ListItemIcon
const getDisplayNameFromClass = (str: string) => {
  const camel = str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  return camel.substring(3);
};
