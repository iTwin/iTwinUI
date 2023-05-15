/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../props.js';

export const Box = <T extends React.ElementType = 'div'>(
  className: string,
  element?: T,
) => {
  type OwnProps = {}; // eslint-disable-line -- yolo

  const Comp = React.forwardRef((props, ref) => {
    const { as = element, className: classNameProp, ...rest } = props;
    const Element = (as as any) || 'div'; // eslint-disable-line -- yolo

    return (
      <Element ref={ref} className={cx(className, classNameProp)} {...rest} />
    );
  }) as PolymorphicForwardRefComponent<NonNullable<typeof element>, OwnProps>;

  Comp.displayName = getDisplayNameFromClass(className);

  return Comp;
};

// e.g. iui-list-item-icon -> ListItemIcon
const getDisplayNameFromClass = (str: string) => {
  const camel = str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  return camel.substring(3);
};
