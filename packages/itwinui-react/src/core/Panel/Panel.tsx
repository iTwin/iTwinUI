/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Box,
  cloneElementWithRef,
  mergeEventHandlers,
  SvgChevronLeft,
  useMergedRefs,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { IconButton } from '../Buttons/IconButton.js';
import type { IconButtonProps } from '../Buttons/IconButton.js';
import { Flex } from '../Flex/Flex.js';
import { Text } from '../Typography/Text.js';
import cx from 'classnames';

type CurrentPanelId = { id: string; direction?: 'prev' | 'next' };

type PanelWrapperProps = {
  /**
   * The initialPanel that is displayed. Should be passed even if using controlled mode. (TODO: confirm)
   */
  initialActiveId: string;
  /**
   * Pass a value to enter controlled mode. The value object has a few fields:
   * - `id: string` - The panel to show.
   * - `direction?: 'prev' | 'next'`: Pass the direction to animate to the new panel. Else, panel change is instant.
   */
  activeId?: CurrentPanelId;
  /** Useful for controlled mode */
  onActiveIdChange?: (newActiveId: CurrentPanelId) => void;
  children: React.ReactNode;
};

type TriggerMapEntry = { triggerId: string; panelId: string };

/**
 * Component that manages the logic for layered panels.
 * It can be used anywhere to create layers.
 * E.g. `Menu`, `InformationPanel`, `Popover`, etc.
 *
 * @example
 * <Panels.Wrapper
 *   initialActiveId={panelIdRoot}
 *   as={Surface}
 *   style={{ inlineSize: '300px', blockSize: '500px' }}
 * >
 *   <Panels.Panel id={panelIdRoot} as={List}>
 *     <Surface.Header as={Panels.Header}>Base</Surface.Header>
 *     <ListItem>
 *       <Panels.Trigger for={panelIdMoreInfo}>
 *         <ListItem.Action>More details</ListItem.Action>
 *       </Panels.Trigger>
 *     </ListItem>
 *   </Panels.Panel>
 *
 *   <Panels.Panel
 *     id={panelIdMoreInfo}
 *     as={Flex}
 *     flexDirection='column'
 *     alignItems='stretch'
 *   >
 *     <Surface.Header as={Panels.Header}>More details</Surface.Header>
 *     …content
 *   </Panels.Panel>
 * </Panels.Wrapper>
 */
const PanelWrapper = React.forwardRef((props, forwardedRef) => {
  const {
    initialActiveId,
    children,
    activeId: activeIdProp,
    className,
    onActiveIdChange,
    ...rest
  } = props;

  const panelElements = React.useRef<Record<string, HTMLElement | null>>({});

  const [currentPanelId, setCurrentPanelId] = React.useState<CurrentPanelId>({
    id: initialActiveId,
  });

  // Reducer to manage panel animations
  const [{ animations }, dispatch] = React.useReducer(panelAnimationReducer, {
    currentPanelId,
    setCurrentPanelId,
  } satisfies PanelAnimationState);

  const animateToPanel = React.useCallback(
    async (newActiveId: CurrentPanelId) => {
      if (
        // Page transition already in progress
        animations != null ||
        // No animation to show
        newActiveId.direction == null
      ) {
        return;
      }

      const animationOptions = {
        duration: 600,
        iterations: 1,
        easing: 'ease-out',
      };

      const animationsData = {
        [typeof currentPanelId === 'string'
          ? currentPanelId
          : currentPanelId.id]:
          newActiveId.direction === 'next'
            ? [
                { transform: 'translateX(0)' },
                { transform: 'translateX(-100%)' },
              ]
            : [
                { transform: 'translateX(0)' },
                { transform: 'translateX(100%)' },
              ],
        [newActiveId.id]:
          newActiveId.direction === 'next'
            ? [
                { transform: 'translateX(100%)' },
                { transform: 'translateX(0)' },
              ]
            : [
                { transform: 'translateX(-100%)', display: 'block' },
                { transform: 'translateX(0)', display: 'block' },
              ],
      };

      dispatch({
        type: newActiveId.direction,
        animatingToPanelId: newActiveId.id,
        animations: animationsData,
        panelElements,
      });

      await Promise.all(
        Object.entries(animationsData).map(([pageId, keyframes]) => {
          const element = panelElements.current[pageId];

          return new Promise((resolve) => {
            if (element == null) {
              resolve(null);
              return;
            }

            const animation = element.animate(keyframes, animationOptions);

            if (animation) {
              animation.onfinish = () => {
                resolve(null);
              };
            }
          });
        }),
      );

      dispatch({ type: 'endAnimation' });
    },
    [animations, currentPanelId],
  );

  const changeActivePanel = React.useCallback(
    async (newActiveId: CurrentPanelId, force?: boolean) => {
      // In controlled state, users should handle all panel transitions themselves
      if (!force && activeIdProp != null) {
        onActiveIdChange?.(newActiveId);
        return;
      }

      if (
        // Only if forProp exists in the DOM, go to the new panel.
        // This prevents empty panels with no way to go back.
        !document.getElementById(
          typeof newActiveId === 'string' ? newActiveId : newActiveId.id,
        )
      ) {
        return;
      }

      await animateToPanel(newActiveId);

      setCurrentPanelId(newActiveId);
      onActiveIdChange?.(newActiveId);

      // Focus the next panel once the panel animation is complete
      panelElements.current?.[newActiveId.id]?.focus({
        preventScroll: true,
      });
    },
    [activeIdProp, animateToPanel, onActiveIdChange],
  );

  // When in controlled mode, listen to activeIdProp.id changes and animate accordingly.
  const [previousActivePanelId, setPreviousActivePanelId] = React.useState<
    string | undefined
  >(activeIdProp?.id);

  const syncControlledActiveId = React.useCallback(async () => {
    if (activeIdProp?.id == previousActivePanelId) {
      return;
    }
    setPreviousActivePanelId(activeIdProp?.id);

    // Go to uncontrolled mode
    if (activeIdProp == null) {
      return;
    }

    if (activeIdProp.id != currentPanelId.id) {
      changeActivePanel(activeIdProp, true);
    }
  }, [
    activeIdProp,
    changeActivePanel,
    currentPanelId.id,
    previousActivePanelId,
  ]);

  React.useEffect(() => {
    syncControlledActiveId();
  }, [syncControlledActiveId]);

  const triggers = React.useRef(new Map<string, TriggerMapEntry>());

  return (
    <PanelWrapperContext.Provider
      value={{
        activeId: activeIdProp,
        currentPanelId,
        changeActivePanel,
        triggers,
        panelElements,
        animations,
      }}
    >
      <Box
        ref={forwardedRef}
        {...rest}
        className={cx('iui-panel-wrapper', className)}
      >
        {children}
      </Box>
    </PanelWrapperContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', PanelWrapperProps>;
PanelWrapper.displayName = 'Panels.Wrapper';

const PanelWrapperContext = React.createContext<
  | {
      activeId?: PanelWrapperProps['activeId'];
      currentPanelId: CurrentPanelId;
      triggers: React.RefObject<
        Map<string, { triggerId: string; panelId: string }>
      >;
      changeActivePanel: (newActiveId: CurrentPanelId) => Promise<void>;
      panelElements: React.RefObject<Record<string, HTMLElement | null>>;
      animations: Record<string, React.CSSProperties[]> | undefined;
    }
  | undefined
>(undefined);

// ----------------------------------------------------------------------------

type PanelProps = {
  id: string;
};

const Panel = React.forwardRef((props, forwardedRef) => {
  const { id: idProp, children, className, style, ...rest } = props;

  const { currentPanelId, triggers, panelElements, animations } =
    React.useContext(PanelWrapperContext) || {};

  const fallbackId = React.useId();
  const id = idProp || fallbackId;

  const [element, setElement] = React.useState<HTMLElement | null>(null);
  if (panelElements?.current != null) {
    panelElements.current[id] = element;
  }

  const isHidden =
    animations == null
      ? id !== currentPanelId?.id
      : !Object.keys(animations).includes(id);

  const associatedTrigger = !!id ? triggers?.current?.get(id) : undefined;

  return (
    <PanelContext.Provider
      value={{
        id,
        associatedTrigger,
      }}
    >
      <Box
        ref={useMergedRefs(setElement, forwardedRef)}
        id={id}
        hidden={isHidden}
        aria-labelledby={`${id}-header`}
        tabIndex={-1}
        {...rest}
        className={cx('iui-panel', className, {
          'iui-panel-visible': id === currentPanelId?.id,
        })}
        style={{
          display: isHidden ? 'none' : undefined,

          // Add the last keyframe styles to the current panel to avoid flickering
          // i.e. showing the current panel for a split second between when the animations ends and the panel is hidden
          ...(id === currentPanelId?.id &&
          animations != null &&
          animations[id] != null
            ? animations[id][animations[id].length - 1]
            : {}),

          ...style,
        }}
      >
        {children}
      </Box>
    </PanelContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', PanelProps>;
Panel.displayName = 'Panel';

const PanelContext = React.createContext<
  | {
      id: string;
      associatedTrigger: TriggerMapEntry | undefined;
    }
  | undefined
>(undefined);

// ----------------------------------------------------------------------------

type PanelTriggerProps = {
  for: string;
  children: React.ReactElement;
};

const PanelTrigger = (props: PanelTriggerProps) => {
  const { children, for: forProp } = props;

  const panelWrapperContext = React.useContext(PanelWrapperContext);
  const panelContext = React.useContext(PanelContext);

  const fallbackId = React.useId();
  const triggerId = children.props.id || fallbackId;

  const onClick = React.useCallback(() => {
    panelWrapperContext?.changeActivePanel({
      id: forProp,
      direction: 'next',
    });
  }, [forProp, panelWrapperContext]);

  if (!React.isValidElement(children)) {
    return null;
  }

  const triggersMatch = panelWrapperContext?.triggers.current?.get(forProp);
  if (
    !!panelContext?.id &&
    (panelContext?.id !== triggersMatch?.panelId ||
      triggerId !== triggersMatch?.triggerId)
  ) {
    panelWrapperContext?.triggers.current?.set(forProp, {
      triggerId,
      panelId: panelContext?.id,
    });
  }

  return cloneElementWithRef(children, (children) => {
    return {
      ...children.props,
      id: triggerId,
      onClick: mergeEventHandlers(children.props.onClick, onClick),
      'aria-expanded': panelWrapperContext?.currentPanelId.id === forProp,
      'aria-controls': forProp,
    };
  });
};

// ----------------------------------------------------------------------------

const PanelHeader = React.forwardRef((props, forwardedRef) => {
  const { children, ...rest } = props;

  const { id: panelId, associatedTrigger: panelAssociatedTrigger } =
    React.useContext(PanelContext) || {};

  return (
    <Flex ref={forwardedRef} {...rest}>
      {panelAssociatedTrigger && <PanelBackButton />}
      <Text id={`${panelId}-header`} as='h2'>
        {children}
      </Text>
    </Flex>
  );
}) as PolymorphicForwardRefComponent<'div'>;

const PanelBackButton = React.forwardRef((props, forwardedRef) => {
  const { onClick, ...rest } = props;

  const panelWrapperContext = React.useContext(PanelWrapperContext);
  const panelContext = React.useContext(PanelContext);

  const { triggers } = panelWrapperContext || {};
  const { id: panelId } = panelContext || {};

  const trigger = !!panelId ? triggers?.current?.get(panelId) : undefined;

  const goBack = React.useCallback(async () => {
    if (trigger?.triggerId != null) {
      panelWrapperContext?.changeActivePanel({
        id: trigger.panelId,
        direction: 'prev',
      });
    }
  }, [panelWrapperContext, trigger]);

  return (
    <IconButton
      ref={forwardedRef}
      label='Back'
      styleType='borderless'
      size='small'
      data-iui-shift='left'
      {...rest}
      onClick={mergeEventHandlers(goBack, onClick)}
    >
      <SvgChevronLeft />
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;

// ----------------------------------------------------------------------------

export const Panels = {
  Wrapper: PanelWrapper,
  Panel,
  Trigger: PanelTrigger,
  Header: PanelHeader,
  BackButton: PanelBackButton,
};

// ----------------------------------------------------------------------------

type PanelAnimationState = {
  currentPanelId: CurrentPanelId;
  setCurrentPanelId: React.Dispatch<React.SetStateAction<CurrentPanelId>>;
  animatingToPanelId?: string;
  animations?: Record<string, React.CSSProperties[]>;
};

type PanelAnimationAction =
  | {
      type: 'prev' | 'next';
      animatingToPanelId: string;
      animations: PanelAnimationState['animations'];
      panelElements: React.RefObject<Record<string, HTMLElement | null>>;
    }
  | { type: 'endAnimation' };

const panelAnimationReducer = (
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
