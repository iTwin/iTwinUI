/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Box,
  cloneElementWithRef,
  getWindow,
  mergeEventHandlers,
  SvgChevronLeft,
  useInertPolyfill,
  useInstance,
  useMergedRefs,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { IconButton } from '../Buttons/IconButton.js';
import type { IconButtonProps } from '../Buttons/IconButton.js';
import { Flex } from '../Flex/Flex.js';
import { Text } from '../Typography/Text.js';
import cx from 'classnames';
import { panelAnimationReducer, PanelsInstanceProvider } from './helpers.js';
import type {
  CurrentPanelId,
  PanelAnimationState,
  PanelsInstance,
  TriggerMapEntry,
} from './helpers.js';

type PanelsWrapperProps = {
  /**
   * The initialPanel that is displayed.
   */
  initialActiveId: string;
  /**
   * Pass a value to enter controlled mode. The value object has a few fields:
   * - `id: string` - The panel to show.
   * - `direction?: 'prev' | 'next' | 'undefined'`:
   *   - animates to the new panel in the specified direction or transitions instantly if `undefined`.
   *   - moves focus to the new panel when `next` or `undefined` and to the trigger when `prev`.
   */
  activeId?: CurrentPanelId;
  /** Useful for controlled mode */
  onActiveIdChange?: (newActiveId: CurrentPanelId) => void;
  children: React.ReactNode;
  /**
   * Pass an instance created by `useInstance` to control the panels imperatively.
   *
   * @example
   * const panels = Panels.useInstance();
   * <Panels instance={panels} />
   */
  instance?: PanelsInstance;
};

/**
 * Component that manages the logic for layered panels.
 * It can be used anywhere to create layers. E.g. `Menu`, `InformationPanel`, `Popover`, etc.
 *
 * Notes:
 * - There can only be one panel with triggers to a particular other panel. i.e. Panel Y should have triggers only in
 * one particular panel X (only one clear back navigation). Panel X can have multiple triggers that point to panel Y.
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
const PanelsWrapper = React.forwardRef((props, forwardedRef) => {
  const {
    initialActiveId,
    children,
    activeId: activeIdProp,
    className,
    onActiveIdChange,
    instance,
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
      const motionOk = getWindow()?.matchMedia(
        '(prefers-reduced-motion: no-preference)',
      )?.matches;

      if (
        // Reduced motion
        !motionOk ||
        // Page transition already in progress
        animations != null ||
        // No animation to show
        newActiveId.direction == null
      ) {
        return;
      }

      const animationOptions = {
        duration: 600,
        easing: 'ease-out',
      };

      const animationsData = {
        [currentPanelId.id]:
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
                { transform: 'translateX(-100%)' },
                { transform: 'translateX(0)' },
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
            animation.onfinish = () => {
              resolve(null);
            };
          });
        }),
      );

      dispatch({ type: 'endAnimation' });
    },
    [animations, currentPanelId],
  );

  const changeActivePanel = React.useCallback(
    async ({
      newActiveId,
      ignoreControlledMode = false,
    }: {
      newActiveId: CurrentPanelId;
      /**
       * By default, the active panel is not changed when in controlled mode.
       * Pass `true` to change the active panel even when in controlled mode.
       */
      ignoreControlledMode?: boolean;
    }) => {
      // In controlled mode, users should set the active panel themselves.
      if (!ignoreControlledMode && activeIdProp != null) {
        onActiveIdChange?.(newActiveId);
        return;
      }

      if (
        // Only if forProp exists in the DOM, go to the new panel.
        // This prevents empty panels with no way to go back.
        !document.getElementById(newActiveId.id) ||
        // Animation already in progress
        animations != null ||
        // Same panel
        newActiveId.id === currentPanelId.id
      ) {
        return;
      }

      await animateToPanel(newActiveId);

      setCurrentPanelId(newActiveId);
      onActiveIdChange?.(newActiveId);

      // Move focus if a direction is specified
      // - `prev`: Focus the trigger
      // - `next` or undefined: Focus the new panel
      setTimeout(() => {
        if (newActiveId.direction === 'prev') {
          const trigger = triggers?.current?.get(currentPanelId.id);
          if (trigger?.triggerId != null) {
            document
              .getElementById(trigger.triggerId)
              ?.focus({ preventScroll: true });
          }
        } else {
          panelElements.current?.[newActiveId.id]?.focus({
            preventScroll: true,
          });
        }
      }, 0);
    },
    [
      activeIdProp,
      animateToPanel,
      animations,
      currentPanelId.id,
      onActiveIdChange,
    ],
  );

  const goBack = React.useCallback(
    async (options?: { animate?: boolean }) => {
      const { animate = true } = options ?? {};

      const trigger = triggers?.current?.get(currentPanelId.id);
      if (trigger?.triggerId != null) {
        changeActivePanel({
          newActiveId: {
            id: trigger.panelId,
            direction: animate ? 'prev' : undefined,
          },
        });
      }
    },
    [changeActivePanel, currentPanelId.id],
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
      changeActivePanel({
        newActiveId: activeIdProp,
        ignoreControlledMode: true,
      });
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
    <PanelsInstanceProvider instance={instance} goBack={goBack}>
      <PanelsWrapperContext.Provider
        value={{
          activeId: activeIdProp,
          currentPanelId,
          changeActivePanel,
          goBack,
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
      </PanelsWrapperContext.Provider>
    </PanelsInstanceProvider>
  );
}) as PolymorphicForwardRefComponent<'div', PanelsWrapperProps>;
PanelsWrapper.displayName = 'Panels.Wrapper';

const PanelsWrapperContext = React.createContext<
  | {
      activeId?: PanelsWrapperProps['activeId'];
      currentPanelId: CurrentPanelId;
      triggers: React.RefObject<
        Map<string, { triggerId: string; panelId: string }>
      >;
      changeActivePanel: (props: {
        newActiveId: CurrentPanelId;
        ignoreControlledMode?: boolean;
      }) => Promise<void>;
      goBack: PanelsInstance['goBack'];
      panelElements: React.RefObject<Record<string, HTMLElement | null>>;
      animations: Record<string, React.CSSProperties[]> | undefined;
    }
  | undefined
>(undefined);

// ----------------------------------------------------------------------------

type PanelProps = {
  id: string;
};

/**
 * Takes an `id` and the panel content. When the wrapper's `activeId` is set to this panel id, this panel is shown.
 *
 * @example
 * <Panels.Panel id={panelIdRoot} as={List}>
 *   <Surface.Header as={Panels.Header}>Root</Surface.Header>
 *   <ListItem>
 *     <Panels.Trigger for={panelIdMoreInfo}>
 *       <ListItem.Action>More details</ListItem.Action>
 *     </Panels.Trigger>
 *   </ListItem>
 * </Panels.Panel>
 */
const Panel = React.forwardRef((props, forwardedRef) => {
  const { id: idProp, children, className, style, ...rest } = props;

  const { currentPanelId, triggers, panelElements, animations } =
    React.useContext(PanelsWrapperContext) || {};

  const fallbackId = React.useId();
  const id = idProp || fallbackId;

  const [element, setElement] = React.useState<HTMLElement | null>(null);
  if (panelElements?.current != null) {
    panelElements.current[id] = element;
  }

  const arePanelsAnimating = animations != null;
  const isThisPanelAnimating = animations?.[id] != null;

  const isHidden = arePanelsAnimating
    ? !Object.keys(animations).includes(id)
    : id !== currentPanelId?.id;
  const isInert = isHidden || arePanelsAnimating;

  useInertPolyfill();

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
        aria-labelledby={`${id}-header`}
        tabIndex={-1}
        {...rest}
        className={cx('iui-panel', className)}
        hidden={isHidden}
        style={{
          // Add the last keyframe styles to the current panel to avoid flickering
          // i.e. showing the current panel for a split second between when the animations ends and the panel is hidden
          ...(id === currentPanelId?.id && isThisPanelAnimating
            ? animations[id][animations[id].length - 1]
            : {}),

          ...style,
        }}
        {...{ inert: isInert ? '' : undefined }}
      >
        {children}
      </Box>
    </PanelContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', PanelProps>;
Panel.displayName = 'Panels.Panel';

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

/**
 * Wraps the button to append an `onClick` that changes the panel to the `for` prop panel.
 *
 * @example
 * <Panels.Panel id={panelIdRoot} as={List}>
 *   <Surface.Header as={Panels.Header}>Root</Surface.Header>
 *   <ListItem>
 *     <Panels.Trigger for={panelIdMoreInfo}>
 *       <ListItem.Action>More details</ListItem.Action>
 *     </Panels.Trigger>
 *   </ListItem>
 * </Panels.Panel>
 */
const PanelTrigger = (props: PanelTriggerProps) => {
  const { children, for: forProp } = props;

  const { changeActivePanel, triggers, currentPanelId } =
    React.useContext(PanelsWrapperContext) || {};
  const { id: panelId } = React.useContext(PanelContext) || {};

  const fallbackId = React.useId();
  const triggerId = children.props.id || fallbackId;

  const onClick = React.useCallback(() => {
    changeActivePanel?.({
      newActiveId: {
        id: forProp,
        direction: 'next',
      },
    });
  }, [changeActivePanel, forProp]);

  const triggersMatch = triggers?.current?.get(forProp);
  if (
    !!panelId &&
    (panelId !== triggersMatch?.panelId ||
      triggerId !== triggersMatch?.triggerId)
  ) {
    triggers?.current?.set(forProp, {
      triggerId,
      panelId: panelId,
    });
  }

  return cloneElementWithRef(children, (children) => {
    return {
      ...children.props,
      id: triggerId,
      onClick: mergeEventHandlers(children.props.onClick, onClick),
      'aria-expanded': currentPanelId?.id === forProp,
      'aria-controls': forProp,
    };
  });
};
PanelTrigger.displayName = 'Panels.Trigger';

// ----------------------------------------------------------------------------

/**
 * Optional component, if added, shows a title and handles the showing of the back button depending on whether a
 * previous panel exist.
 */
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
PanelHeader.displayName = 'Panels.Header';

// ----------------------------------------------------------------------------

/**
 * Optional component, if added, sets the `activeId` to the panel that has a trigger that points to the current panel
 * when clicked.
 *
 * @example
 * <caption>Default back button</caption>
 * <Panels.BackButton />
 *
 * @example
 * <caption>Custom back button</caption>
 * <Panels.BackButton onClick={() => console.log('Back button clicked')}>
 *  <CustomBackIcon />
 * </Panels.BackButton>
 */
const PanelBackButton = React.forwardRef((props, forwardedRef) => {
  const { children, onClick, ...rest } = props;

  const panelWrapperContext = React.useContext(PanelsWrapperContext);

  return (
    <IconButton
      ref={forwardedRef}
      label='Back'
      styleType='borderless'
      size='small'
      data-iui-shift='left'
      {...rest}
      onClick={mergeEventHandlers(
        React.useCallback(
          () => panelWrapperContext?.goBack(),
          [panelWrapperContext],
        ),
        onClick,
      )}
    >
      {children || <SvgChevronLeft />}
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;
PanelBackButton.displayName = 'Panels.BackButton';

// ----------------------------------------------------------------------------

export const Panels = {
  Wrapper: PanelsWrapper,
  Panel,
  Trigger: PanelTrigger,
  Header: PanelHeader,
  BackButton: PanelBackButton,
  useInstance: useInstance as () => PanelsInstance,
};
