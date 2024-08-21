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
import {
  PanelsInstanceContext,
  PanelsInstanceProvider,
  PanelsWrapperContext,
  usePanelAnimations,
} from './helpers.js';
import type {
  ActivePanel,
  PanelsInstance,
  TriggerMapEntry,
} from './helpers.js';

type PanelsWrapperProps = {
  /**
   * The initialPanel that is displayed.
   */
  initialActiveId: string;
  onActiveIdChange?: (newActiveId: ActivePanel) => void;
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
    className,
    onActiveIdChange,
    instance: instanceProp,
    ...rest
  } = props;

  const instanceBackup = Panels.useInstance();
  const instance = instanceProp || instanceBackup;

  const panelElements = React.useRef<Record<string, HTMLElement | null>>({});

  const [activePanel, setActivePanel] = React.useState<ActivePanel>({
    id: initialActiveId,
  });

  const {
    animateToPanel,
    animations,
    arePanelsAnimating,
    getPanelAnimationProps,
  } = usePanelAnimations(activePanel, panelElements);

  const changeActivePanel = React.useCallback(
    async (newActiveId: ActivePanel) => {
      if (
        // Only if forProp exists in the DOM, go to the new panel.
        // This prevents empty panels with no way to go back.
        !document.getElementById(newActiveId.id) ||
        // Animation already in progress
        arePanelsAnimating ||
        // Same panel
        newActiveId.id === activePanel.id
      ) {
        return;
      }

      await animateToPanel(newActiveId);

      setActivePanel(newActiveId);
      onActiveIdChange?.(newActiveId);

      // Move focus if a direction is specified
      // - `prev`: Focus the trigger
      // - `next` or undefined: Focus the new panel
      setTimeout(() => {
        if (newActiveId.direction === 'prev') {
          const trigger = triggers?.current?.get(activePanel.id);
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
    [arePanelsAnimating, activePanel.id, animateToPanel, onActiveIdChange],
  );

  const triggers = React.useRef(new Map<string, TriggerMapEntry>());

  return (
    <PanelsWrapperContext.Provider
      value={{
        activePanel,
        changeActivePanel,
        triggers,
        panelElements,
        arePanelsAnimating,
        animations,
        getPanelAnimationProps,
      }}
    >
      <PanelsInstanceProvider instance={instance}>
        <Box
          ref={forwardedRef}
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
  const { id: idProp, children, className, ...rest } = props;

  const { triggers, panelElements, getPanelAnimationProps } =
    React.useContext(PanelsWrapperContext) || {};

  const fallbackId = React.useId();
  const id = idProp || fallbackId;

  const [element, setElement] = React.useState<HTMLElement | null>(null);
  if (panelElements?.current != null) {
    panelElements.current[id] = element;
  }

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
        {...getPanelAnimationProps?.({
          id,
          className: cx('iui-panel', className),
          'aria-labelledby': `${id}-header`,
          tabIndex: -1,
          ...rest,
        })}
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

  const { changeActivePanel, triggers, activePanel } =
    React.useContext(PanelsWrapperContext) || {};
  const { id: panelId } = React.useContext(PanelContext) || {};

  const fallbackId = React.useId();
  const triggerId = children.props.id || fallbackId;

  const onClick = React.useCallback(() => {
    changeActivePanel?.({
      id: forProp,
      direction: 'next',
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
      'aria-expanded': activePanel?.id === forProp,
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

// ----------------------------------------------------------------------------

export const Panels = {
  Wrapper: PanelsWrapper,
  Panel,
  Trigger: PanelTrigger,
  Header: PanelHeader,
  BackButton: PanelBackButton,
  useInstance: useInstance as () => PanelsInstance,
};
