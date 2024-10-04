/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Box,
  cloneElementWithRef,
  mergeEventHandlers,
  SvgChevronLeft,
  useInstance,
  useMergedRefs,
  useSafeContext,
  useMediaQuery,
  useWarningLogger,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { IconButton } from '../Buttons/IconButton.js';
import type { IconButtonProps } from '../Buttons/IconButton.js';
import { Flex } from '../Flex/Flex.js';
import { Text } from '../Typography/Text.js';
import cx from 'classnames';
import { PanelsInstanceContext, PanelsInstanceProvider } from './helpers.js';
import type { FocusEntry, PanelsInstance, TriggerMapEntry } from './helpers.js';

// #region PanelsWrapper

export type PanelsWrapperProps = {
  /**
   * The initialPanel that is displayed.
   */
  initialActiveId: string;
  onActiveIdChange?: (newActiveId: string) => void;
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
 * Requirements:
 * - A panel can have only one trigger pointing to it. i.e. out of all the triggers across all panels,
 *   only one can point to a particular panel.
 * - The `Panels.Panel` within the wrapper should be in the order of the navigation. E.g.:
 *   ```jsx
 *   <Panels.Wrapper>
 *     <Panels.Panel id={root} /> // Must come before moreDetails since it contains the trigger to moreDetails
 *     <Panels.Panel id={moreDetails}> // Must come after root since it is navigated to from root
 *   </Panels.Wrapper>
 *   ```
 *
 * @example
 * <Panels.Wrapper
 *   initialActiveId={panelIdRoot}
 *   as={Surface}
 *   style={{ inlineSize: '300px', blockSize: '500px' }}
 * >
 *   <Panels.Panel
 *     id={panelIdRoot}
 *     as={Surface}
 *     border={false}
 *     elevation={0}
 *   >
 *     <Surface.Header as={Panels.Header}>Root</Surface.Header>
 *     <Surface.Body as={List}>
 *       <ListItem>
 *         <Panels.Trigger for={panelIdMoreInfo}>
 *           <ListItem.Action>More details</ListItem.Action>
 *         </Panels.Trigger>
 *       </ListItem>
 *     </Surface.Body>
 *   </Panels.Panel>
 *
 *   <Panels.Panel
 *     id={panelIdMoreInfo}
 *     as={Surface}
 *     border={false}
 *     elevation={0}
 *   >
 *     <Surface.Header as={Panels.Header}>More details</Surface.Header>
 *     <Surface.Body isPadded>
 *       <Text>Content</Text>
 *     </Surface.Body>
 *   </Panels.Panel>
 * </Panels.Wrapper>
 */
const PanelsWrapper = React.forwardRef((props, forwardedRef) => {
  const {
    initialActiveId,
    children,
    className,
    onActiveIdChange,
    instance,
    ...rest
  } = props;

  const ref = React.useRef<HTMLDivElement | null>(null);

  const [activePanelId, _setActivePanelId] = React.useState(initialActiveId);
  const setActivePanelId = React.useCallback(
    (newActivePanel: typeof activePanelId) => {
      _setActivePanelId(newActivePanel);
      onActiveIdChange?.(newActivePanel);
    },
    [onActiveIdChange],
  );

  const [triggers, setTriggers] = React.useState<
    Record<string, TriggerMapEntry>
  >({});
  const panels = React.useRef(new Set<string>());

  const [shouldFocus, setShouldFocus] = React.useState<FocusEntry>(undefined);

  const motionOk = useMediaQuery('(prefers-reduced-motion: no-preference)');

  const changeActivePanel = React.useCallback(
    async (newActiveId: string) => {
      if (
        // Only if forProp is a panel, go to the new panel.
        !panels.current.has(newActiveId) ||
        // Same panel
        newActiveId === activePanelId
      ) {
        return;
      }

      ReactDOM.flushSync(() => setActivePanelId(newActiveId));
      ref.current?.ownerDocument.getElementById(newActiveId)?.scrollIntoView({
        block: 'nearest',
        inline: 'center',
        behavior: motionOk ? 'smooth' : 'instant',
      });
    },
    [activePanelId, motionOk, setActivePanelId],
  );

  return (
    <PanelsWrapperContext.Provider
      value={React.useMemo(
        () => ({
          activePanelId,
          changeActivePanel,
          triggers,
          setTriggers,
          shouldFocus,
          setShouldFocus,
          panels,
        }),
        [activePanelId, changeActivePanel, shouldFocus, triggers],
      )}
    >
      <PanelsInstanceProvider instance={instance}>
        <Box
          ref={useMergedRefs(ref, forwardedRef)}
          {...rest}
          className={cx('iui-panel-wrapper', className)}
        >
          {children}
        </Box>
      </PanelsInstanceProvider>
    </PanelsWrapperContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', PanelsWrapperProps>;
if (process.env.NODE_ENV === 'development') {
  PanelsWrapper.displayName = 'Panels.Wrapper';
}

export const PanelsWrapperContext = React.createContext<
  | {
      activePanelId: string;
      triggers: Record<string, TriggerMapEntry>;
      setTriggers: React.Dispatch<
        React.SetStateAction<Record<string, TriggerMapEntry>>
      >;
      changeActivePanel: (newActiveId: string) => Promise<void>;
      shouldFocus: FocusEntry;
      setShouldFocus: React.Dispatch<React.SetStateAction<FocusEntry>>;
      panels: React.MutableRefObject<Set<string>>;
    }
  | undefined
>(undefined);
if (process.env.NODE_ENV === 'development') {
  PanelsWrapperContext.displayName = 'PanelsWrapperContext';
}

// #endregion PanelsWrapper
// ----------------------------------------------------------------------------
// #region Panel

type PanelProps = {
  id: string;
};

/**
 * Takes an `id` and the panel content.
 * Match this `id` with a `Panels.Triggers`'s `for` prop to create a link between them.
 *
 * @example
 * <Panels.Panel id={panelIdRoot} as={Surface} border={false} elevation={0}>
 *   <Surface.Header as={Panels.Header}>Root</Surface.Header>
 *   <Surface.Body as={List}>
 *     <ListItem>
 *       <Panels.Trigger for={panelIdMoreInfo}>
 *         <ListItem.Action>More details</ListItem.Action>
 *       </Panels.Trigger>
 *     </ListItem>
 *   </Surface.Body>
 * </Panels.Panel>
 */
const Panel = React.forwardRef((props, forwardedRef) => {
  const { id: idProp, children, className, ...rest } = props;

  const { activePanelId, triggers, panels } =
    useSafeContext(PanelsWrapperContext);

  const fallbackId = React.useId();
  const id = idProp || fallbackId;

  const associatedTrigger = React.useMemo(() => triggers[id], [id, triggers]);

  const previousActivePanelId = useDelayed(activePanelId) || activePanelId;

  const isMounted = [activePanelId, previousActivePanelId].includes(id);
  const isTransitioning =
    activePanelId === id && activePanelId !== previousActivePanelId;
  const isInert = previousActivePanelId === id && activePanelId !== id;

  React.useEffect(() => {
    const panelsCurrent = panels.current;

    if (!panelsCurrent.has(id)) {
      panelsCurrent.add(id);
    }

    return () => {
      panelsCurrent.delete(id);
    };
  }, [id, panels]);

  return (
    <PanelContext.Provider
      value={React.useMemo(
        () => ({ id, associatedTrigger }),
        [associatedTrigger, id],
      )}
    >
      {isMounted && (
        <Box
          ref={forwardedRef}
          id={id}
          className={cx('iui-panel', className)}
          aria-labelledby={`${id}-header-title`}
          {...{ inert: isInert ? 'true' : undefined }}
          data-iui-transitioning={isTransitioning ? 'true' : undefined}
          {...rest}
        >
          {children}
        </Box>
      )}
    </PanelContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', PanelProps>;
if (process.env.NODE_ENV === 'development') {
  Panel.displayName = 'Panels.Panel';
}

const PanelContext = React.createContext<
  | {
      id: string;
      associatedTrigger: TriggerMapEntry | undefined;
    }
  | undefined
>(undefined);

// #endregion Panel
// ----------------------------------------------------------------------------
// #region PanelTrigger

type PanelTriggerProps = {
  for: string;
  children: React.ReactElement;
};

/**
 * Wraps the button and appends an `onClick` to change the active panel to the one specified in the `for` prop.
 * Also appends some attributes for accessibility.
 *
 * @example
 * <Panels.Trigger for={nextPanelId}>
 *   <Button>go to next panel</Button>
 * </Panels.Trigger>
 *
 * @example
 * <ListItem>
 *   <Panels.Trigger for={panelIdMoreInfo}>
 *     <ListItem.Action>More details</ListItem.Action>
 *   </Panels.Trigger>
 * </ListItem>
 */
const PanelTrigger = (props: PanelTriggerProps) => {
  const { children, for: forProp } = props;

  const {
    changeActivePanel,
    triggers,
    setTriggers,
    activePanelId: activePanel,
    shouldFocus,
    setShouldFocus,
    panels,
  } = useSafeContext(PanelsWrapperContext);
  const { id: panelId } = useSafeContext(PanelContext);

  const fallbackId = React.useId();
  const triggerId = children.props.id || fallbackId;

  const onClick = React.useCallback(() => {
    setShouldFocus({ panelId: forProp, direction: 'forward' });
    changeActivePanel?.(forProp);
  }, [changeActivePanel, forProp, setShouldFocus]);

  const focusRef = React.useCallback(
    (el: HTMLButtonElement) => {
      if (
        shouldFocus?.panelId === panelId &&
        shouldFocus.direction === 'backward'
      ) {
        el?.focus({ preventScroll: true });
        setShouldFocus(undefined);
      }
    },
    [panelId, setShouldFocus, shouldFocus?.direction, shouldFocus?.panelId],
  );

  const refs = useMergedRefs(focusRef);

  const logWarning = useWarningLogger();

  React.useEffect(() => {
    // Wait for panels to be set
    if (panels.current.size === 0) {
      return;
    }

    if (!panels.current.has(forProp)) {
      logWarning(
        `Panels.Trigger's \`for\` prop ("${forProp}") corresponds to no Panel.`,
      );
    }
  }, [forProp, logWarning, panels, triggers]);

  // Add/Update trigger in the triggers map
  React.useEffect(() => {
    setTriggers((oldTriggers) => {
      const triggersMatch = oldTriggers[forProp];

      // Update entry only if it doesn't exist or has changed
      if (
        triggersMatch == null ||
        panelId !== triggersMatch.panelId ||
        triggerId !== triggersMatch.triggerId
      ) {
        return {
          ...oldTriggers,
          [forProp]: {
            panelId,
            triggerId,
          },
        };
      }

      return oldTriggers;
    });
  }, [forProp, panelId, setTriggers, triggerId]);

  return cloneElementWithRef(children, (children) => {
    return {
      ...children.props,
      id: triggerId,
      ref: refs,
      onClick: mergeEventHandlers(children.props.onClick, onClick),
      'aria-expanded': activePanel === forProp,
      'aria-controls': forProp,
    };
  });
};
if (process.env.NODE_ENV === 'development') {
  PanelTrigger.displayName = 'Panels.Trigger';
}

// #endregion PanelTrigger
// ----------------------------------------------------------------------------
// #region PanelHeader

type PanelHeaderProps = {
  titleProps?: React.ComponentProps<typeof Text>;
};

/**
 * Required component to add an accessible name and also a back button (if previous panel exists) to the panel.
 *
 * @example
 * <Panels.Panel id={panelIdRoot}>
 *   <Panels.Header>Root</Panels.Header>
 *   …
 * </Panels.Panel>
 *
 * @example
 * <Panels.Panel
 *   id={panelIdMoreInfo}
 *   as={Surface}
 *   border={false}
 *   elevation={0}
 * >
 *   <Surface.Header as={Panels.Header}>More details</Surface.Header>
 *   <Surface.Body isPadded>
 *     <Text>Content</Text>
 *   </Surface.Body>
 * </Panels.Panel>
 */
const PanelHeader = React.forwardRef((props, forwardedRef) => {
  const { titleProps, children, ...rest } = props;

  const { shouldFocus, setShouldFocus } = useSafeContext(PanelsWrapperContext);
  const { id: panelId, associatedTrigger: panelAssociatedTrigger } =
    useSafeContext(PanelContext);

  const focusRef = React.useCallback(
    (el: HTMLHeadingElement) => {
      if (
        shouldFocus?.panelId === panelId &&
        shouldFocus.direction === 'forward'
      ) {
        el?.focus({ preventScroll: true });
        setShouldFocus(undefined);
      }
    },
    [panelId, setShouldFocus, shouldFocus?.direction, shouldFocus?.panelId],
  );

  return (
    <Flex ref={forwardedRef} {...rest}>
      {panelAssociatedTrigger && <PanelBackButton />}
      <Text
        id={`${panelId}-header-title`}
        as='h2'
        tabIndex={-1}
        ref={focusRef}
        {...titleProps}
      >
        {children}
      </Text>
    </Flex>
  );
}) as PolymorphicForwardRefComponent<'div', PanelHeaderProps>;
if (process.env.NODE_ENV === 'development') {
  PanelHeader.displayName = 'Panels.Header';
}

// #endregion PanelHeader
// ----------------------------------------------------------------------------
// #region PanelBackButton

/**
 * Optional component that goes to the previous panel when clicked (i.e. to the panel that has a trigger that points to
 * the current panel)
 *
 * @example
 * <caption>Default back button</caption>
 * <Panels.BackButton />
 *
 * @example
 * <caption>Custom back button</caption>
 * <Panels.BackButton onClick={() => console.log('Back button clicked')}>
 *   <CustomBackIcon />
 * </Panels.BackButton>
 */
const PanelBackButton = React.forwardRef((props, forwardedRef) => {
  const { children, onClick, ...rest } = props;

  const { instance: panelInstance } = useSafeContext(PanelsInstanceContext);

  return (
    <IconButton
      ref={forwardedRef}
      label='Back'
      styleType='borderless'
      size='small'
      data-iui-shift='left'
      {...rest}
      onClick={mergeEventHandlers(
        React.useCallback(() => panelInstance?.goBack(), [panelInstance]),
        onClick,
      )}
    >
      {children || <SvgChevronLeft />}
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;
if (process.env.NODE_ENV === 'development') {
  PanelBackButton.displayName = 'Panels.BackButton';
}

// #endregion PanelBackButton
// ----------------------------------------------------------------------------

export const Panels = {
  Wrapper: PanelsWrapper,
  Panel,
  Trigger: PanelTrigger,
  Header: PanelHeader,
  useInstance: useInstance as () => PanelsInstance,
};

/**
 * Returns a copy of value which reflects state changes after a set delay.
 */
function useDelayed<T>(value: T, { delay } = { delay: 500 }): T | undefined {
  const [delayed, setDelayed] = React.useState<T | undefined>(undefined);
  const timeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  React.useEffect(() => {
    if (delay === 0) {
      setDelayed(value);
    } else {
      timeout.current = setTimeout(() => setDelayed(value), delay);
    }

    return () => {
      clearTimeout(timeout.current);
    };
  }, [value, delay]);

  return delayed;
}
