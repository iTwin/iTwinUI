/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';

type DialogMainContextProps = {
  beforeClose: () => void;
};

export const DialogMainContext =
  React.createContext<DialogMainContextProps | null>(null);

export const useDialogMainContext = () => {
  return React.useContext(DialogMainContext);
};
