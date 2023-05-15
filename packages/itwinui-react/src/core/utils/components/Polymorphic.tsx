/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../props.js';

const _base = <T extends keyof JSX.IntrinsicElements = 'div'>(element: T) => {
  return (className: string) => {
    type OwnProps = {}; // eslint-disable-line

    const Comp = React.forwardRef((props, ref) => {
      const { as = element, className: classNameProp, ...rest } = props;
      const Element = (as as any) || 'div'; // eslint-disable-line

      return (
        <Element ref={ref} className={cx(className, classNameProp)} {...rest} />
      );
    }) as PolymorphicForwardRefComponent<NonNullable<typeof element>, OwnProps>;

    Comp.displayName = getDisplayNameFromClass(className);

    return Comp;
  };
};

/**
 * Utility to create a type-safe polymorphic component with a simple class.
 *
 * Can be called directly or as a property of the `Polymorphic` object.
 * In both cases, returns a component that forwards ref and rest props.
 *
 * @example
 * const MyPolyDiv = Polymorphic('my-poly-div');
 * <MyPolyDiv>...</MyPolyDiv>;
 *
 * @example
 * const MyPolyButton = Polymorphic.button('my-poly-button');
 * <MyPolyButton as='a' href='#'>...</MyPolyButton>;
 *
 * @private
 */
export const Polymorphic = new Proxy(_base('div'), {
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
