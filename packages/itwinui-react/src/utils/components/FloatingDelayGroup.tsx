/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { FloatingDelayGroup as FuiFloatingDelayGroup } from '@floating-ui/react';
import React from 'react';

/** Whether iTwinUI's `FloatingDelayGroup` exists up the tree */
export const FloatingDelayGroupContext = React.createContext<boolean>(false);
if (process.env.NODE_ENV === 'development') {
  FloatingDelayGroupContext.displayName = 'FloatingDelayGroupContext';
}

/** A wrapper around Floating UI's `FloatingDelayGroup` that sets `FloatingDelayGroupContext` */
export const FloatingDelayGroup = (
  props: React.ComponentPropsWithRef<typeof FuiFloatingDelayGroup>,
) => {
  return (
    <FloatingDelayGroupContext.Provider value={true}>
      <FuiFloatingDelayGroup {...props} />
    </FloatingDelayGroupContext.Provider>
  );
};
