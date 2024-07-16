/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SelectTagContainer } from '../Select/SelectTagContainer.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type ComboBoxMultipleContainerProps = {
  selectedItems?: React.ReactNode[];
};

export const ComboBoxMultipleContainer = React.forwardRef((props, ref) => {
  const { selectedItems = [], ...rest } = props;
  return <SelectTagContainer ref={ref} tags={selectedItems} {...rest} />;
}) as PolymorphicForwardRefComponent<'div', ComboBoxMultipleContainerProps>;

if (process.env.NODE_ENV === 'development') {
  ComboBoxMultipleContainer.displayName = 'ComboBoxMultipleContainer';
}
