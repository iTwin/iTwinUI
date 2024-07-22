/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Box,
  cloneElementWithRef,
  getFocusableElements,
  mergeEventHandlers,
  mergeRefs,
  SvgChevronLeft,
  useControlledState,
  useMergedRefs,
  useResizeObserver,
  type PolymorphicForwardRefComponent,
} from '../../utils/index.js';
import { flushSync } from 'react-dom';
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
    style,
    ...rest
  } = props;

  const panelRefs = React.useRef<Record<string, HTMLElement | null>>({});

  const [currentPanelId, setCurrentPanelId] = useControlledState(
    defaultActiveId,
    activeId,
    onActiveIdChange,
  );

  const [history, setHistory] = React.useState([defaultActiveId]);
  const [width, setWidth] = React.useState(0); // TODO: Start off with real width
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

  // if (expandedId === undefined) {
  //   setExpandedId(defaultActiveId);
  // }

  return (
    <PanelWrapperContext.Provider
      value={{
        currentPanelId,
        setCurrentPanelId,
        triggers,
        // setTriggers,
        history,
        setHistory,
        width,
        panelRefs,
        animations,
        animateToPanel,
      }}
    >
      {/* <div>{history}</div> */}
      <Box
        ref={mergeRefs(forwardedRef, resizeObserverRef)}
        {...rest}
        className={cx('iui-panel-wrapper', className)}
        style={{
          position: 'relative',
          ...style,
        }}
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
      // triggers: Map<string, { triggerId: string; panelId: string }>;
      // setTriggers: React.Dispatch<
      //   React.SetStateAction<
      //     Map<string, { triggerId: string; panelId: string }>
      //   >
      // >;
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
    history,
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

  // React.useEffect(() => {
  //   // Every 1 second, focus itself
  //   const interval = setInterval(() => {
  //     if (id === expandedId) {
  //       console.log('focused', id, document.getElementById(id));
  //       document.getElementById(id)?.focus();
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [id, expandedId]);

  const historyIndex =
    history != null
      ? history?.findIndex((historyItemId) => historyItemId === id)
      : -1;
  const historyOffset =
    historyIndex !== -1 && history != null
      ? historyIndex - (history.length - 1)
      : null;

  historyOffset;

  if (id === 'base') {
    console.log('panel', {
      id,
      1: id === currentPanelId,
      2: animations != null,
      3: animations != null ? animations[id] != null : "it's null",
      4:
        animations != null
          ? animations[id][animations[id].length - 1]
          : "it's null",
      5:
        animations != null
          ? animations[id][animations[id].length - 1]
          : "it's null",
    });
  }

  return (
    <PanelContext.Provider
      value={{
        id,
        associatedTrigger,
      }}
    >
      {/* <Transition
        in={id === expandedId}
        timeout={{ exit: 400 }}
        // mountOnEnter
        // unmountOnExit
      > */}
      <Box
        ref={useMergedRefs(
          ref,
          forwardedRef,
          React.useCallback(
            (el) => el?.focus(),
            [],
          ) as React.RefCallback<HTMLElement>,
        )}
        id={id}
        // hidden={id !== expandedId}
        {...rest}
        className={cx('iui-panel', className, {
          'iui-panel-visible': id === currentPanelId,
        })}
        // // className='HERE'
        // style={{
        //   // transform: id === history?.[-1] ? 'translate(100px)' : undefined,
        //   // transform:
        //   //   historyOffset != null
        //   //     ? `translate(${(panelWrapperWidth ?? 0) * historyOffset}px`
        //   //     : undefined,
        //   // display: history?.includes(id) ? undefined : 'none',
        //   ...style,
        // }}

        hidden={isHidden}
        style={{
          position: 'absolute',
          inset: 0,

          // inlineSize: '100%',
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
        {/* <div>{id}</div> */}
        {children}
      </Box>
      {/* </Transition> */}
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

// TODO: Should it be a like a DOM node? Or it is just a wrapper around a DOM node that adds properties to the DOM node?
const PanelTrigger = (props: PanelTriggerProps) => {
  const { children, for: forProp } = props;

  const panelWrapperContext = React.useContext(PanelWrapperContext);
  const panelContext = React.useContext(PanelContext);

  // TODO: Should we have an idProp and use useId only as a fallback?
  const triggerId = React.useId();

  // const children = React.Children.only(childrenProp);
  if (!React.isValidElement(children)) {
    return null;
  }

  // const [expandedId, setExpandedId] = useAtom(expandedIdAtom);
  // const [triggers, setTriggers] = useAtom(triggersAtom);
  // const panelId = React.useContext(PanelIdContext);

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
      // flushSync(() => panelWrapperContext?.setExpandedId(forProp));

      console.log('triggerId', triggerId, forProp);

      await panelWrapperContext?.animateToPanel(forProp, 'next');

      // Focus the first focusable element in the panel.
      // This is useful for screen-reader users.

      // Wait for the panel to be expanded before focusing. i.e. since setExpandedId triggers a re-render.
      // setTimeout(() => {
      //   console.log('focus', forProp, document.getElementById(forProp));
      //   document.getElementById(forProp)?.focus();
      // }, 1000);

      panelWrapperContext?.setHistory((prev) => [...prev, forProp]);
      const firstFocusable = getFocusableElements(
        document.getElementById(forProp),
      )?.[0] as HTMLElement | undefined;
      firstFocusable?.focus();
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

  const { associatedTrigger: panelAssociatedTrigger } =
    React.useContext(PanelContext) || {};

  return (
    <Flex ref={forwardedRef} {...rest}>
      {panelAssociatedTrigger && <PanelBackButton />}
      <Text
        as='h2'
        tabIndex={-1}
        // TODO: Confirm that focus moves correctly to the Text after the next panel is opened.
        // When a keyboard user triggers the panel, they should be able to continue tabbing into the panel.
        // When a screen-reader user triggers the panel, they should hear the name of the panel announced.
        //
        // Alternate idea: maybe the Panel itself could be focused. But then the panel needs a role and a label.
        // ref={React.useCallback((el: HTMLElement | null) => el?.focus(), [])}
        // TODO: This focusing should not happen when the Header is set on the Base menu. This should only happen when moving from one menu to another
      >
        {children}
      </Text>
    </Flex>
  );
}) as PolymorphicForwardRefComponent<'div'>;

const PanelBackButton = () => {
  // const setExpandedId = useSetAtom(expandedIdAtom);
  // const panelId = React.useContext(PanelIdContext);
  // const trigger = useAtomValue(triggersAtom).get(panelId);

  const panelWrapperContext = React.useContext(PanelWrapperContext);
  const panelContext = React.useContext(PanelContext);

  const { triggers } = panelWrapperContext || {};
  const { id: panelId } = panelContext || {};

  const trigger = !!panelId ? triggers?.current?.get(panelId) : undefined;

  const goBack = () => {
    if (trigger?.triggerId != null) {
      // flushSync(() => setExpandedId?.(trigger.panelId));
      flushSync(
        () => panelWrapperContext?.animateToPanel(trigger.panelId, 'prev'),
      );

      panelWrapperContext?.setHistory((prev) =>
        [...prev].slice(0, prev.length - 1),
      );
      document.getElementById(trigger.triggerId)?.focus();
    }
  };

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
  // currentPanelId: string;
  currentPanelId: string | undefined;
  setCurrentPanelId: React.Dispatch<React.SetStateAction<string | undefined>>;
  animatingToPanelId?: string;
  animationDirection?: 'prev' | 'next';
  animations?: Record<string, React.CSSProperties[]>;
};

type PanelAnimationAction =
  | {
      type: 'prev' | 'next';
      animatingToPanelId: string;
      animations: PanelAnimationState['animations'];
      // TODO: Or do document.querySelector each time?
      panelRefs: React.RefObject<Record<string, HTMLElement | null>>;
    }
  | { type: 'endAnimation' };

const panelAnimationReducer = (
  state: PanelAnimationState,
  action: PanelAnimationAction,
): PanelAnimationState => {
  console.log('reducer', state, action);

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
        animationDirection: action.type,
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
        animationDirection: undefined,
        animations: undefined,
      };
    }
    default: {
      return state;
    }
  }
};
