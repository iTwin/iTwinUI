/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useSafeContext, useSynchronizeInstance } from '../../utils/index.js';
import { Panels, PanelsWrapperContext } from './Panels.js';

export type PanelsInstance = {
  /** Go back to the panel that has a trigger that points to the current panel. */
  goBack: () => void;
};

export type TriggerMapEntry = {
  triggerId: string;
  panelId: string;
};

export type FocusEntry =
  | { panelId: string; direction: 'forward' | 'backward' }
  | undefined;

// ----------------------------------------------------------------------------

export const PanelsInstanceContext = React.createContext<
  | {
      instance: PanelsInstance;
    }
  | undefined
>(undefined);
if (process.env.NODE_ENV === 'development') {
  PanelsInstanceContext.displayName = 'PanelsInstanceContext';
}

type PanelInstanceProviderProps = {
  children: React.ReactNode;
  instance: PanelsInstance | undefined;
};

export const PanelsInstanceProvider = (props: PanelInstanceProviderProps) => {
  const { children, instance: instanceProp } = props;

  const instanceBackup = Panels.useInstance();
  const instance = instanceProp || instanceBackup;

  const { activePanelId, changeActivePanel, triggers, setShouldFocus } =
    useSafeContext(PanelsWrapperContext);

  const goBack = React.useCallback(async () => {
    const trigger = triggers[activePanelId];
    if (trigger.triggerId != null) {
      setShouldFocus({ panelId: trigger.panelId, direction: 'backward' });
      changeActivePanel(trigger.panelId);
    }
  }, [activePanelId, changeActivePanel, setShouldFocus, triggers]);

  useSynchronizeInstance(
    instance,
    React.useMemo(
      () => ({
        goBack,
      }),
      [goBack],
    ),
  );

  return (
    <PanelsInstanceContext.Provider value={{ instance }}>
      {children}
    </PanelsInstanceContext.Provider>
  );
};
