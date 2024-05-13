/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Box,
  cloneElementWithRef,
  type PolymorphicForwardRefComponent,
} from '../../utils/index.js';

type PanelWrapperProps = {
  defaultActiveId: string;
  children: React.ReactNode;
};

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
  const { defaultActiveId, children, ...rest } = props;

  const [expandedId, setExpandedId] = React.useState(defaultActiveId);
  const [triggers, setTriggers] = React.useState(
    new Map<string, { triggerId: string; panelId: string }>(),
  );

  if (expandedId === undefined) {
    setExpandedId(defaultActiveId);
  }

  return (
    <PanelWrapperContext.Provider
      value={{
        expandedId,
        setExpandedId,
        triggers,
        setTriggers,
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
      triggers: Map<string, { triggerId: string; panelId: string }>;
      setTriggers: React.Dispatch<
        React.SetStateAction<
          Map<string, { triggerId: string; panelId: string }>
        >
      >;
    }
  | undefined
>(undefined);

// ----------------------------------------------------------------------------

type PanelProps = {
  id: string;
};

const Panel = React.forwardRef((props, forwardedRef) => {
  const { id, ...rest } = props;

  const { expandedId } = React.useContext(PanelWrapperContext) || {};

  return (
    <PanelContext.Provider
      value={{
        id,
      }}
    >
      <div ref={forwardedRef} id={id} hidden={id !== expandedId} {...rest} />
    </PanelContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', PanelProps>;
Panel.displayName = 'Panel';

const PanelContext = React.createContext<
  | {
      id: string;
    }
  | undefined
>(undefined);

// ----------------------------------------------------------------------------

type PanelTriggerProps = {
  for: string;
};

const PanelTrigger = React.forwardRef((props, forwardedRef) => {
  const { children, for: forProp, ...rest } = props;

  // const children = React.Children.only(childrenProp);
  if (!React.isValidElement(children)) {
    return null;
  }

  const triggerFallbackId = React.useId();
  const triggerId = children?.props?.id || triggerFallbackId;

  const panelWrapperContext = React.useContext(PanelWrapperContext);
  const panelContext = React.useContext(PanelContext);

  // const [expandedId, setExpandedId] = useAtom(expandedIdAtom);
  // const [triggers, setTriggers] = useAtom(triggersAtom);
  // const panelId = React.useContext(PanelIdContext);

  if (
    panelWrapperContext?.triggers.get(forProp)?.triggerId !== triggerId &&
    panelContext?.id
  ) {
    panelWrapperContext?.setTriggers(
      new Map(
        panelWrapperContext?.triggers.set(forProp, {
          triggerId,
          panelId: panelContext?.id,
        }),
      ),
    );
  }

  return cloneElementWithRef(children, (children) => {
    return {
      id: triggerId,
      onClick: () => panelWrapperContext?.setExpandedId(forProp),
      'aria-expanded': panelWrapperContext?.expandedId === forProp,
      'aria-controls': forProp,
    };
  });
  // TODO: I think only the components that return Box should use PolymorphicForwardRefComponent as the type
}) as PolymorphicForwardRefComponent<'div', PanelTriggerProps>;

// ----------------------------------------------------------------------------

export const Panels = {
  Wrapper: PanelWrapper,
  Panel,
  Trigger: PanelTrigger,
};
