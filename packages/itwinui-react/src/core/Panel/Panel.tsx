/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Box,
  cloneElementWithRef,
  mergeEventHandlers,
  mergeRefs,
  SvgChevronLeft,
  useControlledState,
  useMergedRefs,
  useResizeObserver,
  type PolymorphicForwardRefComponent,
} from '../../utils/index.js';
import { IconButton } from '../Buttons/IconButton.js';
import { Flex } from '../Flex/Flex.js';
import { Text } from '../Typography/Text.js';
import cx from 'classnames';

type PanelWrapperProps = {
  defaultActiveId: string;
  /** Useful for controlled mode */
  activeId?: string;
  /** Useful for controlled mode */
  onActiveIdChange?: (newActiveId: string) => void;
  children: React.ReactNode;
};

type TriggerMapEntry = { triggerId: string; panelId: string };

/**
 * TODO: Proper JSDocs
 * Component that manages the logic for layered panels.
 * It can be used anywhere to create layers.
 * E.g. `Menu`, `InformationPanel`, `Popover`, etc.
 *
 * @example
 * Example usages go here!
 */
const PanelWrapper = React.forwardRef((props, forwardedRef) => {
  const {
    defaultActiveId,
    children,
    activeId,
    className,
    onActiveIdChange,
    ...rest
  } = props;

  const panelRefs = React.useRef<Record<string, HTMLElement | null>>({});

  const [currentPanelId, setCurrentPanelId] = useControlledState(
    defaultActiveId,
    activeId,
    onActiveIdChange,
  );

  const [history, setHistory] = React.useState([defaultActiveId]);
  const [width, setWidth] = React.useState(0);
  const [resizeObserverRef] = useResizeObserver((size) => setWidth(size.width));

  const triggers = React.useRef(new Map<string, TriggerMapEntry>());

  // Reducer where all the component-wide state is stored
  const [{ animations }, dispatch] = React.useReducer(panelAnimationReducer, {
    currentPanelId,
    setCurrentPanelId,
  } satisfies PanelAnimationState);

  const animateToPanel = async (
    toPanelId: string,
    direction: 'prev' | 'next',
  ) => {
    // Page transition already in progress
    if (animations != null) {
      return;
    }

    const animationOptions = {
      duration: 600,
      iterations: 1,
      easing: 'ease-out',
    };

    const animationsData = {
      [currentPanelId]:
        direction === 'next'
          ? [{ transform: 'translateX(0)' }, { transform: 'translateX(-100%)' }]
          : [{ transform: 'translateX(0)' }, { transform: 'translateX(100%)' }],
      [toPanelId]:
        direction === 'next'
          ? [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }]
          : [
              { transform: 'translateX(-100%)', display: 'block' },
              { transform: 'translateX(0)', display: 'block' },
            ],
    };

    dispatch({
      type: direction,
      animatingToPanelId: toPanelId,
      animations: animationsData,
      panelRefs,
    });

    await Promise.all(
      Object.entries(animationsData).map(([pageId, keyframes]) => {
        const element = panelRefs.current[pageId];

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
    setCurrentPanelId(toPanelId);
  };

  return (
    <PanelWrapperContext.Provider
      value={{
        currentPanelId,
        setCurrentPanelId,
        triggers,
        history,
        setHistory,
        width,
        panelRefs,
        animations,
        animateToPanel,
      }}
    >
      <Box
        ref={mergeRefs(forwardedRef, resizeObserverRef)}
        {...rest}
        className={cx('iui-panel-wrapper', className)}
      >
        {children}
      </Box>
    </PanelWrapperContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', PanelWrapperProps>;
PanelWrapper.displayName = 'Panel.Wrapper';

const PanelWrapperContext = React.createContext<
  | {
      currentPanelId: string | undefined;
      setCurrentPanelId: React.Dispatch<
        React.SetStateAction<string | undefined>
      >;
      triggers: React.RefObject<
        Map<string, { triggerId: string; panelId: string }>
      >;

      history: string[];
      setHistory: React.Dispatch<React.SetStateAction<string[]>>;
      width: number;
      panelRefs: React.RefObject<Record<string, HTMLElement | null>>;
      animations: Record<string, React.CSSProperties[]> | undefined;
      animateToPanel: (
        toPanelId: string,
        direction: 'prev' | 'next',
      ) => Promise<void>;
    }
  | undefined
>(undefined);

// ----------------------------------------------------------------------------

type PanelProps = {
  id: string;
};

const Panel = React.forwardRef((props, forwardedRef) => {
  const { id: idProp, children, className, style, ...rest } = props;

  const {
    currentPanelId,
    triggers,
    width: panelWrapperWidth,
    panelRefs,
    animations,
  } = React.useContext(PanelWrapperContext) || {};

  const fallbackId = React.useId();
  const id = idProp || fallbackId;

  const ref = React.useRef<HTMLElement>(null);
  if (panelRefs?.current != null) {
    panelRefs.current[id] = ref.current;
  }

  const isHidden =
    animations == null
      ? id !== currentPanelId
      : !Object.keys(animations).includes(id);

  panelWrapperWidth;

  const associatedTrigger = !!id ? triggers?.current?.get(id) : undefined;

  return (
    <PanelContext.Provider
      value={{
        id,
        associatedTrigger,
      }}
    >
      <Box
        ref={useMergedRefs(ref, forwardedRef)}
        id={id}
        hidden={isHidden}
        aria-labelledby={`${id}-header`}
        tabIndex={-1}
        {...rest}
        className={cx('iui-panel', className, {
          'iui-panel-visible': id === currentPanelId,
        })}
        style={{
          display: isHidden ? 'none' : undefined,

          // Add the last keyframe styles to the current panel to avoid flickering
          // i.e. showing the current panel for a split second between when the animations ends and the panel is hidden
          ...(id === currentPanelId &&
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

  const triggerId = React.useId();

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

  const onClick = async () => {
    // Only if forProp exists in the DOM, go to the new panel.
    // This prevents empty panels with no way to go back.
    if (!!document.getElementById(forProp)) {
      // Focus the next panel once the panel animation is complete
      await panelWrapperContext?.animateToPanel(forProp, 'next');
      panelWrapperContext?.panelRefs.current?.[forProp]?.focus();
    }
  };

  return cloneElementWithRef(children, (children) => {
    return {
      ...children.props,
      id: triggerId,
      onClick: mergeEventHandlers(children.props.onClick, onClick),
      'aria-expanded': panelWrapperContext?.currentPanelId === forProp,
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

const PanelBackButton = () => {
  const panelWrapperContext = React.useContext(PanelWrapperContext);
  const panelContext = React.useContext(PanelContext);

  const { triggers } = panelWrapperContext || {};
  const { id: panelId } = panelContext || {};

  const trigger = !!panelId ? triggers?.current?.get(panelId) : undefined;

  const goBack = React.useCallback(async () => {
    if (trigger?.triggerId != null) {
      // Focus the prev panel once the panel animation is complete
      await panelWrapperContext?.animateToPanel(trigger.panelId, 'prev');
      document.getElementById(trigger.triggerId)?.focus();
    }
  }, [panelWrapperContext, trigger?.panelId, trigger?.triggerId]);

  return (
    <IconButton
      label='Back'
      styleType='borderless'
      onClick={goBack}
      size='small'
      data-iui-shift='left'
    >
      <SvgChevronLeft />
    </IconButton>
  );
};

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
  currentPanelId: string | undefined;
  setCurrentPanelId: React.Dispatch<React.SetStateAction<string | undefined>>;
  animatingToPanelId?: string;
  animations?: Record<string, React.CSSProperties[]>;
};

type PanelAnimationAction =
  | {
      type: 'prev' | 'next';
      animatingToPanelId: string;
      animations: PanelAnimationState['animations'];
      panelRefs: React.RefObject<Record<string, HTMLElement | null>>;
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
        action.panelRefs.current?.[action.animatingToPanelId] == null
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
