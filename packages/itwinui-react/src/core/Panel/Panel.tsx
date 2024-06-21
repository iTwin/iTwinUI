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
  SvgChevronLeft,
  useControlledState,
  useMergedRefs,
  type PolymorphicForwardRefComponent,
} from '../../utils/index.js';
import { flushSync } from 'react-dom';
import { IconButton } from '../Buttons/IconButton.js';
import { Flex } from '../Flex/Flex.js';
import { Text } from '../Typography/Text.js';

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
  const { defaultActiveId, children, activeId, onActiveIdChange, ...rest } =
    props;

  // const [expandedId, setExpandedId] = React.useState(defaultActiveId);
  const [expandedId, setExpandedId] = useControlledState(
    defaultActiveId,
    activeId,
    onActiveIdChange,
  );

  const triggers = React.useRef(new Map<string, TriggerMapEntry>());

  // if (expandedId === undefined) {
  //   setExpandedId(defaultActiveId);
  // }

  return (
    <PanelWrapperContext.Provider
      value={{
        expandedId,
        setExpandedId,
        triggers,
        // setTriggers,
      }}
    >
      <Box ref={forwardedRef} {...rest}>
        {children}
      </Box>
    </PanelWrapperContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', PanelWrapperProps>;
PanelWrapper.displayName = 'Panel.Wrapper';

const PanelWrapperContext = React.createContext<
  | {
      expandedId: string | undefined;
      setExpandedId: React.Dispatch<React.SetStateAction<string | undefined>>;
      triggers: React.RefObject<
        Map<string, { triggerId: string; panelId: string }>
      >;
      // triggers: Map<string, { triggerId: string; panelId: string }>;
      // setTriggers: React.Dispatch<
      //   React.SetStateAction<
      //     Map<string, { triggerId: string; panelId: string }>
      //   >
      // >;
    }
  | undefined
>(undefined);

// ----------------------------------------------------------------------------

type PanelProps = {
  id: string;
};

const Panel = React.forwardRef((props, forwardedRef) => {
  const { id: idProp, ...rest } = props;

  const fallbackId = React.useId();
  const id = idProp || fallbackId;

  const { expandedId, triggers } = React.useContext(PanelWrapperContext) || {};

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

  return (
    <PanelContext.Provider
      value={{
        id,
        associatedTrigger,
      }}
    >
      <Box
        ref={useMergedRefs(
          forwardedRef,
          React.useCallback(
            (el) => el?.focus(),
            [],
          ) as React.RefCallback<HTMLElement>,
        )}
        id={id}
        hidden={id !== expandedId}
        {...rest}
      />
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

  const onClick = () => {
    // Only if forProp exists in the DOM, go to the new panel.
    // This prevents empty panels with no way to go back.
    if (!!document.getElementById(forProp)) {
      flushSync(() => panelWrapperContext?.setExpandedId(forProp));

      // Focus the first focusable element in the panel.
      // This is useful for screen-reader users.

      // Wait for the panel to be expanded before focusing. i.e. since setExpandedId triggers a re-render.
      // setTimeout(() => {
      //   console.log('focus', forProp, document.getElementById(forProp));
      //   document.getElementById(forProp)?.focus();
      // }, 1000);

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
      'aria-expanded': panelWrapperContext?.expandedId === forProp,
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

  const { setExpandedId, triggers } = panelWrapperContext || {};
  const { id: panelId } = panelContext || {};

  const trigger = !!panelId ? triggers?.current?.get(panelId) : undefined;

  const goBack = () => {
    if (trigger?.triggerId != null) {
      flushSync(() => setExpandedId?.(trigger.panelId));
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
