/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useSynchronizeInstance } from '../../utils/index.js';

export type PanelsInstance = {
  /** Go back to the panel that has a trigger that points to the current panel. */
  goBack: () => void;
};

export type TriggerMapEntry = { triggerId: string; panelId: string };

// ----------------------------------------------------------------------------

export const PanelsWrapperContext = React.createContext<
  | {
      // TODO: Change names to like activePanelId. But maybe we can use elements directly without ids?
      activePanel: string;
      nextPanel?: string;
      triggers: React.RefObject<
        Map<string, { triggerId: string; panelId: string }>
      >;
      changeActivePanel: (newActiveId: string) => Promise<void>;
      panelElements: React.RefObject<Record<string, HTMLElement | null>>;
    }
  | undefined
>(undefined);

// ----------------------------------------------------------------------------

export const PanelsInstanceContext = React.createContext<
  | {
      instance: PanelsInstance;
    }
  | undefined
>(undefined);

type PanelInstanceProviderProps = {
  children: React.ReactNode;
  instance: PanelsInstance;
};

export const PanelsInstanceProvider = (props: PanelInstanceProviderProps) => {
  const { children, instance } = props;

  // TODO: Extract the backup useInstance call here

  const panelsWrapperContext = React.useContext(PanelsWrapperContext);

  const goBack = React.useCallback(async () => {
    if (panelsWrapperContext == null) {
      return;
    }

    const { activePanel, changeActivePanel, triggers } = panelsWrapperContext;

    const trigger = triggers.current?.get(activePanel);
    if (trigger?.triggerId != null) {
      changeActivePanel(trigger.triggerId);
    }
  }, [panelsWrapperContext]);

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
