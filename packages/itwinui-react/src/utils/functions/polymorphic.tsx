/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { useGlobals } from '../hooks/useGlobals.js';
import { styles } from '../../styles.js';

const _elementBase = <As extends keyof JSX.IntrinsicElements = 'div'>(
  defaultElement: As,
) => {
  return (className: string, attrs?: JSX.IntrinsicElements[As]) => {
    const Comp = React.forwardRef(({ as = defaultElement, ...props }, ref) => {
      props = {
        ...attrs, // Merge default attributes with passed props
        ...props,
        className: getScopedClassName(
          cx(className, attrs?.className, props.className),
        ),
      };

      useGlobals();

      if (Array.isArray(as as any)) {
        if (as.length > 1) {
          const [Component, ...restAs] = as;
          return <Component ref={ref} {...props} as={restAs} />;
        }
        (as as any) = as[0];
      }

      const Element = (as as any) || 'div';

      // Add tabIndex to interactive elements if not already set.
      // Workaround for Safari refusing to focus links/buttons/non-text inputs.
      if (
        Element === 'button' ||
        Element === 'a' ||
        (Element === 'input' && (props as any).type === 'checkbox')
      ) {
        props.tabIndex ??= 0;
      }

      return <Element ref={ref} {...props} />;
    }) as PolymorphicForwardRefComponent<NonNullable<typeof defaultElement>>;

    if (process.env.NODE_ENV === 'development') {
      Comp.displayName = getDisplayNameFromClass(className);
    }

    return Comp;
  };
};

const _componentBase = (
  ...components: PolymorphicForwardRefComponent<any>[]
) => {
  const Comp = _elementBase('div')('');
  return React.forwardRef((props, ref) => (
    <Comp
      ref={ref}
      {...props}
      as={[...components, props.as].filter(Boolean) as any}
    />
  )) as PolymorphicForwardRefComponent<'div'>;
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
 * Alternatively, it can be called directly with multiple components to create a chain of
 * components. This is useful for creating wrapper components that still need to support
 * user-specified `as` prop. **Note:** All components in the chain must be polymorphic.
 *
 * @example
 * const MyPolyButton = polymorphic.button('my-poly-button', { type: 'button' });
 * <MyPolyButton as='a' href='#'>...</MyPolyButton>;
 *
 * @example
 * const MyMenuButton = polymorphic(MyPolyButton, MyMenu) as PolymorphicForwardRefComponent<'button'>;
 * <MyMenuButton as='a' href='#'>...</MyMenuButton>;
 *
 * @private
 */
export const polymorphic = new Proxy(_componentBase, {
  get: (target, prop) => {
    if (typeof prop === 'string') {
      // eslint-disable-next-line -- string is as far as we can narrow it down
      // @ts-ignore
      return _elementBase(prop);
    }
    return Reflect.get(target, prop);
  },
}) as typeof _componentBase & {
  [key in keyof JSX.IntrinsicElements]: ReturnType<typeof _elementBase<key>>;
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
