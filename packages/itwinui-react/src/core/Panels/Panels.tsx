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
  panelsReducer,
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
 * - There can only be one panel with triggers to a particular other panel. In other words:
 *   - Triggers to a particular Panel Y can only exist in a particular Panel X.
 *   - In a particular navigation path, a panel cannot appear twice. E.g. Panel X → Panel Y → Panel X is not allowed.
 * Panel X can have multiple triggers that point to panel Y.
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

  const [{ activePanel, nextPanel }, dispatch] = React.useReducer(
    panelsReducer,
    {
      activePanel: initialActiveId,
      nextPanel: undefined,
      onActiveIdChange,
    },
  );

  React.useEffect(() => {
    console.log('panels', activePanel, nextPanel);
  }, [activePanel, nextPanel]);

  const [_panelElements, setPanelElements] = React.useState<
    Record<string, HTMLElement | null>
  >({});
  const panelElements = useLatestRef(_panelElements);

  const [triggers, setTriggers] = React.useState<
    Record<string, TriggerMapEntry>
  >({});

  React.useEffect(() => {
    const refCurrent = ref.current;

    const scrollEndListenerCurrent = () => {
      dispatch({ type: 'end-panel-transition' });
    };

    const scrollListener = () => {
      clearTimeout((window as any).scrollEndTimer);
      (window as any).scrollEndTimer = setTimeout(
        scrollEndListenerCurrent,
        100,
      );
    };

    if ('onscrollend' in window) {
      refCurrent?.addEventListener('scrollend', scrollEndListenerCurrent);
    } else {
      refCurrent?.addEventListener('scroll', scrollListener);
    }

    return () => {
      refCurrent?.removeEventListener('scrollend', scrollEndListenerCurrent);
      refCurrent?.removeEventListener('scroll', scrollListener);
    };
  }, [activePanel, nextPanel]);

  const changeActivePanel = React.useCallback(
    async (newActiveId: string) => {
      if (
        // Only if forProp is a panel, go to the new panel.
        !Object.keys(panelElements.current).includes(newActiveId) ||
        // Same panel
        newActiveId === activePanel
      ) {
        return;
      }

      ReactDOM.flushSync(() => {
        // setNextPanel(newActiveId);
        dispatch({ type: 'start-panel-transition', nextPanel: newActiveId });
      });

      setTimeout(() => {
        console.log('HERE', panelElements.current[activePanel]);
        panelElements.current[activePanel]?.scrollIntoView({
          behavior: 'instant',
          block: 'nearest',
          inline: 'center',
        });
      }, 1_000);

      await new Promise((resolve) => {
        setTimeout(() => {
          console.log('Scrolling', panelElements.current?.[newActiveId]);

          panelElements.current?.[newActiveId]?.scrollIntoView({
            block: 'nearest',
            inline: 'center',
          });

          // WIP Focus
          // const activePanelElement = document.getElementById(activePanel);
          // const newActiveElement = document.getElementById(newActiveId);

          // if (activePanelElement != null && newActiveElement != null) {
          //   const isNewActivePanelAfterCurrentActivePanelInDom =
          //     activePanelElement?.compareDocumentPosition(newActiveElement) &
          //     Node.DOCUMENT_POSITION_FOLLOWING;

          //   // Going forward = Focus new panel
          //   if (isNewActivePanelAfterCurrentActivePanelInDom) {
          //     const panel = document.getElementById(newActiveId);
          //     // console.log('1', panel);
          //     panel?.focus({ preventScroll: true });
          //   }
          //   // Going backward = Focus trigger that had opened the current panel
          //   else {
          //     const trigger = document.getElementById(
          //       triggers[activePanel].triggerId,
          //     );
          //     // console.log('2', triggers, triggers[activePanel]);
          //     trigger?.focus({ preventScroll: true });
          //   }
          // }

          resolve(null);
        }, 4_000);
      });

      // TODO: focus
      // const triggerId = triggers?.current?.get(newActiveId)?.triggerId;
      // if (triggerId) {
      //   const trigger = document.getElementById(triggerId);
      //   console.log(triggers?.current?.get(newActiveId));
      //   const isTriggerFocused = document.activeElement === trigger;
      //   const elementToFocus = isTriggerFocused
      //     ? panelElements.current?.[newActiveId]
      //     : trigger;
      //   elementToFocus?.focus({ preventScroll: true });
      // }

      // ReactDOM.flushSync(() => {
      //   setActivePanel(newActiveId);
      //   onActiveIdChange?.(newActiveId);
      // });

      // TODO: DOM cleanup
      // setTimeout(() => setPreviousPanel(undefined), 1000);
    },
    [activePanel, panelElements],
  );

  return (
    <PanelsWrapperContext.Provider
      value={React.useMemo(
        () => ({
          activePanel,
          nextPanel,
          changeActivePanel,
          triggers,
          setTriggers,
          panelElements: panelElements.current,
          setPanelElements,
        }),
        [activePanel, changeActivePanel, panelElements, nextPanel, triggers],
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

  const { activePanel, nextPanel, triggers, panelElements, setPanelElements } =
    React.useContext(PanelsWrapperContext) || {};

  const fallbackId = React.useId();
  const id = idProp || fallbackId;

  const [element, setElement] = React.useState<HTMLElement | null>(null);

  React.useLayoutEffect(() => {
    // if (panelElements != null) {
    //   panelElements[id] = element;
    // }

    setPanelElements?.((oldPanelElements) => {
      const newPanelElements = {
        ...oldPanelElements,
        [id]: element,
      };

      if (oldPanelElements[id] === element) {
        return oldPanelElements;
      }
      return newPanelElements;
    });
  }, [element, id, panelElements, setPanelElements]);

  useInertPolyfill();

  const associatedTrigger = React.useMemo(
    () => (!!id ? triggers?.[id] : undefined),
    [id, triggers],
  );

  const isMounted = [activePanel, nextPanel].includes(id);
  // TODO: Being back inert checks
  // const isInert = [nextPanel].includes(id);

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
          aria-labelledby={`${id}-header`}
          tabIndex={-1}
          // {...{ inert: isInert ? '' : undefined }}
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

  const { changeActivePanel, triggers, setTriggers, activePanel } =
    React.useContext(PanelsWrapperContext) || {};
  const { id: panelId } = React.useContext(PanelContext) || {};

  const fallbackId = React.useId();
  const triggerId = children.props.id || fallbackId;

  const onClick = React.useCallback(() => {
    changeActivePanel?.(forProp);
  }, [changeActivePanel, forProp]);

  // Add/Update trigger in the triggers map
  React.useEffect(() => {
    if (triggers == null) {
      return;
    }

    setTriggers?.((oldTriggers) => {
      const triggersMatch = oldTriggers[forProp];

      if (
        !!panelId &&
        (panelId !== triggersMatch?.panelId ||
          triggerId !== triggersMatch?.triggerId)
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
  }, [forProp, panelId, setTriggers, triggerId, triggers]);

  return cloneElementWithRef(children, (children) => {
    return {
      ...children.props,
      id: triggerId,
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

  const { instance: panelInstance } =
    React.useContext(PanelsInstanceContext) || {};

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
