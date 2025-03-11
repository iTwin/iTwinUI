/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { ExpandableBlockOwnProps } from './ExpandableBlock.js';

export const ExpandableBlockContext = React.createContext<
  | ({
      setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
      descriptionId: string | undefined;
      setDescriptionId: React.Dispatch<
        React.SetStateAction<string | undefined>
      >;
    } & ExpandableBlockOwnProps)
  | undefined
>(undefined);
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockContext.displayName = 'ExpandableBlockContext';
}
