/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { polymorphic } from '../functions/polymorphic.js';
import styles from '../../../styles.js';
import type { PolymorphicForwardRefComponent } from '../props.js';

const BoxInternal = polymorphic.div('');

/**
 * Polymorphic component that renders a div element by default.
 * Intended to be used as a base for other components.
 * @private
 */
export const Box = React.forwardRef((props, forwardedRef) => {
  return (
    <BoxInternal
      {...props}
      className={getScopedClassName(props.className)}
      ref={forwardedRef}
    />
  );
}) as PolymorphicForwardRefComponent<'div'>;

const getScopedClassName = (className = '') => {
  return className
    .split(' ')
    .map((c) => (c in styles ? styles[c] : c))
    .join(' ');
};
