/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type * as React from 'react';

// TODO: remove this once we it's not used anywhere
export type CommonProps = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Makes `as` prop available and merges original OwnProps and the inferred props from `as` element.
 * Extends ForwardRefExoticComponent so ref gets the correct type.
 *
 * T should be the default element that is used for the `as`  prop.
 *
 * @example
 * type ButtonComponent = PolymorphicForwardRefComponent<'button', ButtonOwnProps>;
 * ...
 * const Button: ButtonComponent = React.forwardRef((props, ref) => {});
 */
export interface PolymorphicForwardRefComponent<
  T,
  OwnProps = Record<string, unknown>,
> extends React.ForwardRefExoticComponent<
    Merge<
      T extends React.ElementType ? React.ComponentPropsWithRef<T> : never,
      OwnProps & { as?: T }
    >
  > {
  <As = T>(
    props: As extends keyof JSX.IntrinsicElements
      ? Merge<JSX.IntrinsicElements[As], OwnProps & { as: As }>
      : As extends React.ComponentType<infer P>
      ? Merge<P, OwnProps & { as: As }>
      : never,
  ): React.ReactElement | null;
}

type Merge<P1, P2> = Omit<P1, keyof P2> & P2;
