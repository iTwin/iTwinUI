/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { getWindow, useSynchronizeInstance } from '../../utils/index.js';

export type ActivePanel = { id: string; direction?: 'prev' | 'next' };

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

export const PanelsWrapperContext = React.createContext<
  | {
      activePanel: ActivePanel;
      triggers: React.RefObject<
        Map<string, { triggerId: string; panelId: string }>
      >;
      changeActivePanel: (newActiveId: ActivePanel) => Promise<void>;
      goBack: PanelsInstance['goBack'];
      panelElements: React.RefObject<Record<string, HTMLElement | null>>;
      arePanelsAnimating: boolean;
      animations: PanelAnimationState['animations'];
      getPanelAnimationProps: (
        props: {
          id: string;
        } & React.ComponentPropsWithoutRef<'div'>,
      ) => React.ComponentPropsWithoutRef<'div'>;
    }
  | undefined
>(undefined);

// ----------------------------------------------------------------------------

export const PanelsInstanceContext = React.createContext<{
  instance: PanelsInstance | undefined;
}>({ instance: undefined });

type PanelInstanceProviderProps = {
  children: React.ReactNode;
  instance: PanelsInstance | undefined;
  goBack: PanelsInstance['goBack'];
};

export const PanelsInstanceProvider = (props: PanelInstanceProviderProps) => {
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
  animatingToPanelId?: string;
  animations?: Record<
    string,
    {
      isDestinationPanel: boolean;
      keyframes: React.CSSProperties[];
    }
  >;
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

// ----------------------------------------------------------------------------

/**
 * Use in `PanelsWrapper` to manage the panel animations.
 * @param activePanel
 * @param panelElements
 * @returns
 */
export const usePanelAnimations = (
  activePanel: ActivePanel,
  panelElements: React.RefObject<Record<string, HTMLElement | null>>,
) => {
  // Reducer to manage panel animations state
  const [{ animations }, dispatch] = React.useReducer(
    panelAnimationReducer,
    {} satisfies PanelAnimationState,
  );

  const arePanelsAnimating = animations != null;

  const animateToPanel = React.useCallback(
    async (newActivePanel: ActivePanel) => {
      const motionOk = getWindow()?.matchMedia(
        '(prefers-reduced-motion: no-preference)',
      )?.matches;

      if (
        // Reduced motion
        !motionOk ||
        // Page transition already in progress
        animations != null ||
        // No animation to show
        newActivePanel.direction == null ||
        // Same panel
        activePanel.id === newActivePanel.id
      ) {
        return;
      }

      const animationOptions = {
        duration: 400,
        easing: 'ease-out',
      };

      const activePanelElement = panelElements.current?.[activePanel.id];
      const newActivePanelElement = panelElements.current?.[newActivePanel.id];
      const isNewPanelPrecedingActivePanel =
        !!newActivePanelElement &&
        !!activePanelElement &&
        !!(
          activePanelElement.compareDocumentPosition(newActivePanelElement) &
          Node.DOCUMENT_POSITION_PRECEDING
        );

      const keyframes = (() => {
        if (newActivePanel.direction === 'next') {
          if (isNewPanelPrecedingActivePanel) {
            return {
              activePanel: [
                { transform: 'translateX(-100%)' },
                { transform: 'translateX(-200%)' },
              ],
              newActivePanel: [
                { transform: 'translateX(100%)' },
                { transform: 'translateX(0)' },
              ],
            };
          } else {
            return {
              activePanel: [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-100%)' },
              ],
              newActivePanel: [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-100%)' },
              ],
            };
          }
        } else {
          if (isNewPanelPrecedingActivePanel) {
            return {
              activePanel: [
                { transform: 'translateX(-100%)' },
                { transform: 'translateX(0)' },
              ],
              newActivePanel: [
                { transform: 'translateX(-100%)' },
                { transform: 'translateX(0)' },
              ],
            };
          } else {
            return {
              activePanel: [
                { transform: 'translateX(0)' },
                { transform: 'translateX(100%)' },
              ],
              newActivePanel: [
                { transform: 'translateX(-200%)' },
                { transform: 'translateX(-100%)' },
              ],
            };
          }
        }
      })();

      const animationsData = {
        [activePanel.id]: {
          isDestinationPanel: false,
          keyframes: keyframes.activePanel,
        },
        [newActivePanel.id]: {
          isDestinationPanel: true,
          keyframes: keyframes.newActivePanel,
        },
      };

      dispatch({
        type: newActivePanel.direction,
        animatingToPanelId: newActivePanel.id,
        animations: animationsData,
        panelElements,
      });

      await Promise.all(
        Object.entries(animationsData).map(([pageId, data]) => {
          const element = panelElements.current?.[pageId];

          return new Promise((resolve) => {
            if (element == null) {
              resolve(null);
              return;
            }

            const animation = element.animate(data.keyframes, animationOptions);
            animation.onfinish = () => {
              resolve(null);
            };
          });
        }),
      );

      dispatch({ type: 'endAnimation' });
    },
    [activePanel.id, animations, panelElements],
  );

  /**
   * Appends the props necessary for the panel animations to work correctly. Also appends props that depend on the
   * panel's animation state.
   */
  const getPanelAnimationProps = React.useCallback(
    (props: { id: string } & React.ComponentPropsWithoutRef<'div'>) => {
      const { id: idProp, style: styleProp, ...rest } = props;

      const isActivePanel = idProp === activePanel?.id;
      const isPanelAnimating = animations?.[idProp] != null;

      const isHidden =
        arePanelsAnimating && !!animations
          ? !Object.keys(animations).includes(idProp)
          : idProp !== activePanel?.id;
      const isInert = idProp !== activePanel?.id && !isHidden;

      const style = {
        // Add the last keyframe styles to the current panel to avoid flickering
        // i.e. showing the current panel for a split second between when the animations ends and the panel is hidden
        ...(isActivePanel && isPanelAnimating
          ? animations[idProp].keyframes[
              animations[idProp].keyframes.length - 1
            ]
          : {}),
        ...styleProp,
      };

      return {
        id: idProp,
        style,
        hidden: isHidden,
        ...{ inert: isInert ? '' : undefined },
        ...rest,
      };
    },
    [activePanel?.id, animations, arePanelsAnimating],
  );

  return React.useMemo(
    () => ({
      animations,
      animateToPanel,
      arePanelsAnimating,
      getPanelAnimationProps,
    }),
    [animateToPanel, animations, arePanelsAnimating, getPanelAnimationProps],
  );
};
