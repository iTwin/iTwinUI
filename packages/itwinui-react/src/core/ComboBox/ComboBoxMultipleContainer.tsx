/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import SelectTagContainer from '../Select/SelectTagContainer';

type ComboBoxMultipleContainerProps = {
  selectedItems?: React.ReactNode[];
  /**
   * Selected tags joined into a single string for live region.
   */
  selectedItemsString: string;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

export const ComboBoxMultipleContainer = React.forwardRef(
  (props: ComboBoxMultipleContainerProps, ref: React.Ref<HTMLDivElement>) => {
    const { selectedItems = [], selectedItemsString, ...rest } = props;
    return (
      <SelectTagContainer
        ref={ref}
        tags={selectedItems}
        selectedItemsString={selectedItemsString}
        {...rest}
      />
    );
  },
);

ComboBoxMultipleContainer.displayName = 'ComboBoxMultipleContainer';
