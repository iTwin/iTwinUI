/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { useGlobals } from '../hooks/useGlobals.js';
import { styles } from '../../styles.js';

// Tag extends keyof JSX.IntrinsicElements = keyof JSX.IntrinsicElements
const _base = <As extends keyof React.JSX.IntrinsicElements = 'div'>(
  defaultElement: As,
) => {
  return (className: string, attrs?: React.JSX.IntrinsicElements[As]) => {
    // @ts-expect-error -- React 19 types WIP
    const Comp = React.forwardRef(({ as = defaultElement, ...props }, ref) => {
      props = {
        ...attrs, // Merge default attributes with passed props
        ...props,
        className: getScopedClassName(
          // @ts-expect-error -- React 19 types WIP
          cx(className, attrs?.className, props.className),
        ),
      };

      const Element = (as as any) || 'div';

      // Add tabIndex to interactive elements if not already set.
      // Workaround for Safari refusing to focus links/buttons/non-text inputs.
      if (
        Element === 'button' ||
        Element === 'a' ||
        (Element === 'input' && (props as any).type === 'checkbox')
      ) {
        // @ts-expect-error -- React 19 types WIP
        props.tabIndex ??= 0;
      }

      useGlobals();

      return <Element ref={ref} {...props} />;
    }) as PolymorphicForwardRefComponent<NonNullable<typeof defaultElement>>;

    if (process.env.NODE_ENV === 'development') {
      Comp.displayName = getDisplayNameFromClass(className);
    }

    return Comp;
  };
};

/**
 * Utility to create a type-safe polymorphic component with a simple class.
 *
 * Should be called as a property of the `polymorphic` object.
 * Returns a component that:
 * - uses CSS-modules scoped classes
 * - supports `as` prop with default element
 * - forwards ref and spreads rest props
 * - adds and merges CSS classes
 * - adds tabIndex to interactive elements (Safari workaround)
 *
 * @example
 * const MyPolyButton = polymorphic.button('my-poly-button', { type: 'button' });
 * <MyPolyButton as='a' href='#'>...</MyPolyButton>;
 *
 * @private
 */
export const polymorphic = new Proxy({} as never, {
  get: (target, prop) => {
    if (typeof prop === 'string') {
      // eslint-disable-next-line -- string is as far as we can narrow it down
      // @ts-ignore
      return _base(prop);
    }
    return Reflect.get(target, prop);
  },
}) as {
  [key in keyof React.JSX.IntrinsicElements]: ReturnType<typeof _base<key>>;
};

// e.g. iui-list-item-icon -> ListItemIcon
const getDisplayNameFromClass = (str: string) => {
  const camel = str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  return camel.substring(3);
};

// e.g. iui-button -> _iui3-button
const getScopedClassName = (className = '') => {
  return (
    className
      .split(' ')
      .map((c) => (c in styles ? styles[c] : c))
      .join(' ') || null
  );
};
