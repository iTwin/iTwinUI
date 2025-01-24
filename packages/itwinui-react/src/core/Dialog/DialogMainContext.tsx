import * as React from 'react';

type DialogMainContextProps = {
  beforeClose: () => void;
};

export const DialogMainContext =
  React.createContext<DialogMainContextProps | null>(null);

export const useDialogMainContext = () => {
  return React.useContext(DialogMainContext);
};
