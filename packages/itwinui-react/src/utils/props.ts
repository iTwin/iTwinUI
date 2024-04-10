/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type * as React from 'react';

// TODO: remove this once it's not used anywhere
export type CommonProps = {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Makes `as` prop available and merges original OwnProps and the inferred props from `as` element.
 * Extends ForwardRefExoticComponent so ref gets the correct type.
 *
 * `DefaultAs` should be the default element that is used for the `as`  prop.
 *
 * @example
 * const Button = React.forwardRef((props, forwardedRef) => {
 *   // ...
 * }) as PolymorphicForwardRefComponent<'button', ButtonOwnProps>;
 */
export interface PolymorphicForwardRefComponent<
  DefaultAs,
  OwnProps = {}, // eslint-disable-line @typescript-eslint/ban-types
> extends React.ForwardRefExoticComponent<
    Merge<
      DefaultAs extends React.ElementType
        ? React.ComponentPropsWithRef<DefaultAs>
        : never,
      OwnProps & { as?: DefaultAs }
    >
  > {
  <As = DefaultAs>(
    props: As extends keyof JSX.IntrinsicElements
      ? Merge<JSX.IntrinsicElements[As], OwnProps & { as: As }>
      : As extends React.ComponentType<infer P>
        ? Merge<P, OwnProps & { as: As }>
        : never,
  ): React.ReactElement | null;
}

type Merge<P1, P2> = Omit<P1, keyof P2> & P2;
