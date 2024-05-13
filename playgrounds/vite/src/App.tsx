import {
  Flex,
  IconButton,
  List,
  ListItem,
  Surface,
  Text,
  ToggleSwitch,
} from '@itwin/itwinui-react';
import * as React from 'react';
import { useAtom, useAtomValue, useSetAtom, atom } from 'jotai';
import { SvgChevronLeft } from '@itwin/itwinui-icons-react';
import { flushSync } from 'react-dom';

const App = () => {
  const basePanelId = React.useId();
  const qualityPanelId = React.useId();
  const repeatId = React.useId();

  // Note: Will not work, because BackButton currently relies on context.
  const { goBack } = Panels.useInstance();

  return (
    <Surface style={{ display: 'inline-block' }}>
      <Panels defaultActiveId={basePanelId}>
        <Panel id={basePanelId}>
          <List>
            <ListItem>
              <Flex>
                <label htmlFor={repeatId}>Repeat</label>
                <Flex.Spacer />
                <ToggleSwitch id={repeatId} />
              </Flex>
            </ListItem>
            <ListItem>
              <Panel.Trigger for={qualityPanelId}>
                <ListItem.Action>Quality</ListItem.Action>
              </Panel.Trigger>
            </ListItem>
            <ListItem>Speed</ListItem>
            <ListItem>Loop</ListItem>
          </List>
        </Panel>

        <Panel id={qualityPanelId}>
          <Surface.Header as={Panel.Header}>Quality</Surface.Header>
          <List>
            <ListItem>
              <ListItem.Action
                onClick={() => {
                  // setQuality('240p');
                  goBack();
                }}
              >
                240p
              </ListItem.Action>
            </ListItem>
            <ListItem>360p</ListItem>
            <ListItem>480p</ListItem>
            <ListItem>720p</ListItem>
            <ListItem>1080p</ListItem>
          </List>
        </Panel>
      </Panels>
    </Surface>
  );
};

// ----------------------------------------------------------------------------

const expandedIdAtom = atom<string | undefined>(undefined);
const triggersAtom = atom(
  new Map<string, { triggerId: string; panelId: string }>(),
);

const Panels = ({
  children,
  defaultActiveId,
}: React.PropsWithChildren<any>) => {
  const [expandedId, setExpandedId] = useAtom(expandedIdAtom);

  if (expandedId === undefined) {
    setExpandedId(defaultActiveId);
  }

  return <>{children}</>;
};

const Panel = ({ children, id, ...rest }: React.PropsWithChildren<any>) => {
  const [expandedId] = useAtom(expandedIdAtom);
  return (
    <PanelIdContext.Provider value={id}>
      <div id={id} hidden={id !== expandedId} {...rest}>
        {children}
      </div>
    </PanelIdContext.Provider>
  );
};

const PanelIdContext = React.createContext('');

Panel.Header = ({ children, ...props }: React.PropsWithChildren<any>) => {
  return (
    <Flex {...props}>
      <Panel.BackButton />
      <Text
        as='h2'
        tabIndex={-1}
        // TODO: Confirm that focus moves correctly to the Text after the next panel is opened.
        // When a keyboard user triggers the panel, they should be able to continue tabbing into the panel.
        // When a screen-reader user triggers the panel, they should hear the name of the panel announced.
        //
        // Alternate idea: maybe the Panel itself could be focused. But then the panel needs a role and a label.
        ref={React.useCallback((el: HTMLElement | null) => el?.focus(), [])}
      >
        {children}
      </Text>
    </Flex>
  );
};

Panel.BackButton = () => {
  const setExpandedId = useSetAtom(expandedIdAtom);
  const panelId = React.useContext(PanelIdContext);
  const trigger = useAtomValue(triggersAtom).get(panelId);

  const goBack = () => {
    flushSync(() => setExpandedId(trigger?.panelId));

    if (trigger?.triggerId) {
      document.getElementById(trigger?.triggerId)?.focus();
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

Panels.useInstance = () => ({
  goBack: () => {},
});

Panel.Trigger = ({
  children: childrenProp,
  for: forProp,
}: React.PropsWithChildren<{ for: string }>) => {
  const [expandedId, setExpandedId] = useAtom(expandedIdAtom);
  const [triggers, setTriggers] = useAtom(triggersAtom);
  const panelId = React.useContext(PanelIdContext);

  const children = React.Children.only(childrenProp) as any;

  const triggerFallbackId = React.useId();
  const triggerId = children?.props?.id || triggerFallbackId;

  if (triggers.get(forProp)?.triggerId !== triggerId) {
    setTriggers(new Map(triggers.set(forProp, { triggerId, panelId })));
  }

  return (
    React.isValidElement(children) &&
    React.cloneElement(children, {
      id: triggerId,
      onClick: () => setExpandedId(forProp),
      'aria-expanded': expandedId === forProp,
      'aria-controls': forProp,
    } as any)
  );
};

export default App;
