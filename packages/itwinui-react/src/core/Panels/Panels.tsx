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
  /**
   * To customize the panel transition animations, pass one of the following:
   * - `number`: Duration in milliseconds. Overrides the default `animationOptions`.
   * - `object`: For more customization. Merges with the default `animationOptions`.
   * - `null`: Disables animations completely.
   *
   * @see `HTMLElement.animate`
   */
  animationOptions?: Parameters<HTMLElement['animate']>[1] | null;
};

/**
 * Component that manages the logic for layered panels.
 * It can be used anywhere to create layers. E.g. `Menu`, `InformationPanel`, `Popover`, etc.
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
    animationOptions: animationOptionsProp,
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

      if (!motionOk) {
        return;
      }

      if (
        // Page transition already in progress
        animations != null ||
        // No animation to show
        newActiveId.direction == null ||
        // Animations disabled
        animationOptionsProp === null
      ) {
        return;
      }

      const animationOptions: typeof animationOptionsProp =
        typeof animationOptionsProp === 'number'
          ? animationOptionsProp
          : {
              duration: 600,
              easing: 'ease-out',
              ...(animationOptionsProp ?? {}),
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
    [animationOptionsProp, animations, currentPanelId],
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
        !document.getElementById(
          typeof newActiveId === 'string' ? newActiveId : newActiveId.id,
        ) ||
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

  const isAnimating = animations != null;
  const isHidden =
    animations == null
      ? id !== currentPanelId?.id
      : !Object.keys(animations).includes(id);

  const isInert = isHidden || isAnimating;

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

const PanelTrigger = (props: PanelTriggerProps) => {
  const { children, for: forProp } = props;

  const panelWrapperContext = React.useContext(PanelsWrapperContext);
  const panelContext = React.useContext(PanelContext);

  const fallbackId = React.useId();
  const triggerId = children.props.id || fallbackId;

  const onClick = React.useCallback(() => {
    panelWrapperContext?.changeActivePanel({
      newActiveId: {
        id: forProp,
        direction: 'next',
      },
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
PanelTrigger.displayName = 'Panels.Trigger';

// ----------------------------------------------------------------------------

/**
 * Optional header for the panel that shows the `Panels.BackButton` if there is an associated trigger.
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

/**
 * Button to go back to the previous panel.
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
