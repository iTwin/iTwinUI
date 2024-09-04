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
  useInertPolyfill,
  useInstance,
  useLatestRef,
  useMergedRefs,
  useSafeContext,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { IconButton } from '../Buttons/IconButton.js';
import type { IconButtonProps } from '../Buttons/IconButton.js';
import { Flex } from '../Flex/Flex.js';
import { Text } from '../Typography/Text.js';
import cx from 'classnames';
import {
  PanelsInstanceContext,
  PanelsInstanceProvider,
  PanelsWrapperContext,
} from './helpers.js';
import type { PanelsInstance, TriggerMapEntry } from './helpers.js';

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
 * Notes:
 * - A panel can have only one trigger pointing to it. i.e. out of all the triggers across all panels,
 *   only one can point to a particular panel.
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
    instance: instanceProp,
    ...rest
  } = props;

  const instanceBackup = Panels.useInstance();
  const instance = instanceProp || instanceBackup;

  const ref = React.useRef<HTMLDivElement | null>(null);

  const [activePanel, _setActivePanel] = React.useState(initialActiveId);
  const setActivePanel = React.useCallback(
    (newActivePanel: typeof activePanel) => {
      _setActivePanel(newActivePanel);
      onActiveIdChange?.(newActivePanel);
    },
    [onActiveIdChange],
  );

  // TODO: Combine similar code
  const [_panelElements, setPanelElements] = React.useState<
    Record<string, HTMLElement | null>
  >({});
  const panelElements = useLatestRef(_panelElements);

  const [_panelHeaderElements, setPanelHeaderElements] = React.useState<
    Record<string, HTMLElement | null>
  >({});
  const panelHeaderElements = useLatestRef(_panelHeaderElements);

  const [triggers, setTriggers] = React.useState<
    Record<string, TriggerMapEntry>
  >({});
  const triggersRef = useLatestRef(triggers);

  const previousActivePanel = useDelayed(activePanel);

  const changeActivePanel = React.useCallback(
    async (newActiveId: string, direction: 'forward' | 'backward') => {
      if (
        // Only if forProp is a panel, go to the new panel.
        !Object.keys(panelElements.current).includes(newActiveId) ||
        // Same panel
        newActiveId === activePanel
      ) {
        return;
      }

      ReactDOM.flushSync(() => setActivePanel(newActiveId));
      panelElements.current[newActiveId]?.scrollIntoView({
        block: 'nearest',
        inline: 'center',
        behavior: 'smooth',
      });

      await new Promise((resolve) => {
        setTimeout(() => {
          if (direction === 'forward') {
            const headerElement = panelHeaderElements.current[newActiveId];
            headerElement?.focus({ preventScroll: true });
          } else {
            const trigger =
              triggersRef.current[previousActivePanel].triggerElement;
            trigger?.focus({ preventScroll: true });
          }

          resolve(null);
        });
      });
    },
    [
      activePanel,
      panelElements,
      panelHeaderElements,
      previousActivePanel,
      setActivePanel,
      triggersRef,
    ],
  );

  return (
    <PanelsWrapperContext.Provider
      value={React.useMemo(
        () => ({
          activePanel,
          changeActivePanel,
          triggers,
          setTriggers,
          triggersRef,
          panelElements: panelElements.current,
          panelHeaderElements: panelHeaderElements.current,
          setPanelElements,
          setPanelHeaderElements,
        }),
        [
          activePanel,
          changeActivePanel,
          panelElements,
          panelHeaderElements,
          triggers,
          triggersRef,
        ],
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
PanelsWrapper.displayName = 'Panels.Wrapper';

// #endregion PanelsWrapper
// ----------------------------------------------------------------------------
// #region Panel

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
  const { id: idProp, children, className, ...rest } = props;

  const { activePanel, triggers, setPanelElements } =
    useSafeContext(PanelsWrapperContext);

  const fallbackId = React.useId();
  const id = idProp || fallbackId;

  const [element, setElement] = React.useState<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    setPanelElements((oldPanelElements) => {
      if (oldPanelElements[id] === element) {
        return oldPanelElements;
      }

      return {
        ...oldPanelElements,
        [id]: element,
      };
    });
  }, [element, id, setPanelElements]);

  useInertPolyfill();

  const associatedTrigger = React.useMemo(() => triggers[id], [id, triggers]);

  const previousActivePanel = useDelayed(activePanel);

  const isMounted = [activePanel, previousActivePanel].includes(id);
  const isTransitioning =
    activePanel === id && activePanel !== previousActivePanel;
  const isInert = previousActivePanel === id && activePanel !== id;

  const refs = useMergedRefs(setElement, forwardedRef);

  return (
    <PanelContext.Provider
      value={React.useMemo(
        () => ({ id, associatedTrigger }),
        [associatedTrigger, id],
      )}
    >
      {isMounted && (
        <Box
          ref={refs}
          id={id}
          className={cx('iui-panel', className)}
          aria-labelledby={`${id}-header-title`}
          tabIndex={-1}
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
Panel.displayName = 'Panels.Panel';

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

  const { changeActivePanel, setTriggers, activePanel } =
    useSafeContext(PanelsWrapperContext);
  const { id: panelId } = useSafeContext(PanelContext);

  const fallbackId = React.useId();
  const triggerId = children.props.id || fallbackId;

  const [triggerElement, setTriggerElement] =
    React.useState<HTMLButtonElement | null>(null);

  const onClick = React.useCallback(() => {
    changeActivePanel?.(forProp, 'forward');
  }, [changeActivePanel, forProp]);

  // Add/Update trigger in the triggers map
  React.useEffect(() => {
    setTriggers((oldTriggers) => {
      const triggersMatch = oldTriggers[forProp];

      // Update entry only if it doesn't exist or has changed
      if (
        triggersMatch == null ||
        panelId !== triggersMatch.panelId ||
        triggerId !== triggersMatch.triggerId ||
        triggerElement !== triggersMatch.triggerElement
      ) {
        return {
          ...oldTriggers,
          [forProp]: {
            panelId,
            triggerId,
            triggerElement,
          },
        };
      }

      return oldTriggers;
    });
  }, [forProp, panelId, setTriggers, triggerElement, triggerId]);

  return cloneElementWithRef(children, (children) => {
    return {
      ...children.props,
      id: triggerId,
      ref: setTriggerElement,
      onClick: mergeEventHandlers(children.props.onClick, onClick),
      'aria-expanded': activePanel === forProp,
      'aria-controls': forProp,
    };
  });
};
PanelTrigger.displayName = 'Panels.Trigger';

// #endregion PanelTrigger
// ----------------------------------------------------------------------------
// #region PanelHeader

/**
 * Required component to add an accessible name and also a back button (depending on whether a previous panel exist).
 */
const PanelHeader = React.forwardRef((props, forwardedRef) => {
  const { children, ...rest } = props;

  const { setPanelHeaderElements } = useSafeContext(PanelsWrapperContext);
  const { id: panelId, associatedTrigger: panelAssociatedTrigger } =
    useSafeContext(PanelContext);

  const [element, setElement] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setPanelHeaderElements((oldPanelHeaderElements) => {
      if (oldPanelHeaderElements[panelId] === element) {
        return oldPanelHeaderElements;
      }

      return {
        ...oldPanelHeaderElements,
        [panelId]: element,
      };
    });
  }, [element, panelId, setPanelHeaderElements]);

  const refs = useMergedRefs(setElement, forwardedRef);

  return (
    <Flex ref={refs} tabIndex={-1} {...rest}>
      {panelAssociatedTrigger && <PanelBackButton />}
      <Text id={`${panelId}-header-title`} as='h2'>
        {children}
      </Text>
    </Flex>
  );
}) as PolymorphicForwardRefComponent<'div'>;
PanelHeader.displayName = 'Panels.Header';

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
PanelBackButton.displayName = 'Panels.BackButton';

// #endregion PanelBackButton
// ----------------------------------------------------------------------------

export const Panels = {
  Wrapper: PanelsWrapper,
  Panel,
  Trigger: PanelTrigger,
  Header: PanelHeader,
  BackButton: PanelBackButton,
  useInstance: useInstance as () => PanelsInstance,
};

/**
 * Returns a copy of value which reflects state changes after a set delay.
 */
function useDelayed<T>(value: T, { delay } = { delay: 500 }): T {
  const [delayed, setDelayed] = React.useState<T>(value);
  const timeout = React.useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  React.useEffect(() => {
    timeout.current = setTimeout(() => setDelayed(value), delay);
    return () => {
      clearTimeout(timeout.current);
    };
  }, [value, delay]);

  return delayed;
}
