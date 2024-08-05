import * as React from 'react';
import { useSynchronizeInstance } from '../../utils/index.js';

export type CurrentPanelId = { id: string; direction?: 'prev' | 'next' };

export type PanelsInstance = {
  /** Go back to the panel that has a trigger that points to the current panel. */
  goBack: (options?: {
    /**
     * Whether to animate the transition to the previous panel.
     * @default true
     */
    animate?: boolean;
  }) => void;
};

export type TriggerMapEntry = { triggerId: string; panelId: string };

// ----------------------------------------------------------------------------

export const PanelsInstanceContext = React.createContext<{
  instance: PanelsInstance | undefined;
}>({ instance: undefined });

type PanelInstanceProviderProps = {
  children: React.ReactNode;
  instance: PanelsInstance | undefined;
  goBack: PanelsInstance['goBack'];
};

export const PanelInstanceProvider = (props: PanelInstanceProviderProps) => {
  const { children, instance, goBack } = props;

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

// ----------------------------------------------------------------------------

export type PanelAnimationState = {
  currentPanelId: CurrentPanelId;
  setCurrentPanelId: React.Dispatch<React.SetStateAction<CurrentPanelId>>;
  animatingToPanelId?: string;
  animations?: Record<string, React.CSSProperties[]>;
};

export type PanelAnimationAction =
  | {
      type: 'prev' | 'next';
      animatingToPanelId: string;
      animations: PanelAnimationState['animations'];
      panelElements: React.RefObject<Record<string, HTMLElement | null>>;
    }
  | { type: 'endAnimation' };

export const panelAnimationReducer = (
  state: PanelAnimationState,
  action: PanelAnimationAction,
): PanelAnimationState => {
  switch (action.type) {
    case 'prev':
    case 'next': {
      // Animation already in progress or other panel doesn't exist
      if (
        state.animatingToPanelId != null ||
        action.panelElements.current?.[action.animatingToPanelId] == null
      ) {
        return state;
      }

      return {
        ...state,
        animatingToPanelId: action.animatingToPanelId,
        animations: action.animations,
      };
    }
    case 'endAnimation': {
      // No animation in progress
      if (state.animatingToPanelId == null) {
        return state;
      }

      return {
        ...state,
        animatingToPanelId: undefined,
        animations: undefined,
      };
    }
    default: {
      return state;
    }
  }
};
