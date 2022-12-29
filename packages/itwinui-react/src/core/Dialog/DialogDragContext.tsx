/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

export type DialogDragContextProps = {
  onPointerDown?: (e: React.PointerEvent<HTMLElement>) => void;
};

export const DialogDragContext = React.createContext<
  DialogDragContextProps | undefined
>(undefined);

export const useDialogDragContext = () => {
  const context = React.useContext(DialogDragContext);
  return {
    ...context,
  };
};
