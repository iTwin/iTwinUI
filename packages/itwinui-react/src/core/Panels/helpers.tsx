/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useSafeContext, useSynchronizeInstance } from '../../utils/index.js';

export type PanelsInstance = {
  /** Go back to the panel that has a trigger that points to the current panel. */
  goBack: () => void;
};

export type TriggerMapEntry = {
  triggerId: string;
  triggerElement: HTMLElement | null;
  panelId: string;
};

export type FocusEntry =
  | { panelId: string; direction: 'forward' | 'backward' }
  | undefined;

// ----------------------------------------------------------------------------

// TODO: Can move this to Panels.tsx near PanelsWrapper
export const PanelsWrapperContext = React.createContext<
  | {
      // TODO: Change names to like activePanelId. But maybe we can use elements directly without ids?
      activePanel: string;
      triggers: Record<string, TriggerMapEntry>;
      setTriggers: React.Dispatch<
        React.SetStateAction<Record<string, TriggerMapEntry>>
      >;
      triggersRef: React.MutableRefObject<Record<string, TriggerMapEntry>>;

      changeActivePanel: (newActiveId: string) => Promise<void>;
      shouldFocus: FocusEntry;
      setShouldFocus: React.Dispatch<React.SetStateAction<FocusEntry>>;
    }
  | undefined
>(undefined);
if (process.env.NODE_ENV === 'development') {
  PanelsWrapperContext.displayName = 'PanelsWrapperContext';
}

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
  instance: PanelsInstance;
};

export const PanelsInstanceProvider = (props: PanelInstanceProviderProps) => {
  const { children, instance } = props;

  // TODO: Extract the backup useInstance call here

  const { activePanel, changeActivePanel, triggers, setShouldFocus } =
    useSafeContext(PanelsWrapperContext);

  const goBack = React.useCallback(async () => {
    const trigger = triggers[activePanel];
    if (trigger.triggerId != null) {
      setShouldFocus({ panelId: trigger.panelId, direction: 'backward' });
      changeActivePanel(trigger.panelId);
    }
  }, [activePanel, changeActivePanel, setShouldFocus, triggers]);

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
