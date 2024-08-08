import {
  Button,
  Divider,
  Flex,
  List,
  ListItem,
  Panels,
  Surface,
  Text,
} from '@itwin/itwinui-react';
import { SvgArrowLeft } from '@itwin/itwinui-icons-react';
import { useSearchParams } from '@remix-run/react';

export default function ButtonGroupTest() {
  const [searchParams] = useSearchParams();

  const config = getConfigFromSearchParams(searchParams);
  const { exampleType } = config;

  return exampleType === 'multi-panel-information-panel' ? (
    <MultiPanelInformationPanel config={config} />
  ) : exampleType === 'nested-panels' ? (
    <NestedPanels />
  ) : (
    <Basic />
  );
}

const getConfigFromSearchParams = (searchParams: URLSearchParams) => {
  const exampleType = (searchParams.get('exampleType') ?? 'default') as
    | 'default'
    | 'multi-panel-information-panel'
    | 'nested-panels';
  const showRootPanelBackButton =
    searchParams.get('showRootPanelBackButton') === 'true';

  return {
    exampleType,
    showRootPanelBackButton,
  };
};

const Basic = () => {
  const initialActiveId = 'root';
  const panelIdMoreInfo = 'more-info';
  const panelIdDoesNotExist = 'panel-dne';

  const panels = Panels.useInstance();

  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <Button id='instance-go-back' onClick={() => panels.goBack()}>
        Go Back
      </Button>
      <Panels.Wrapper
        instance={panels}
        initialActiveId={initialActiveId}
        as={Surface}
        style={{
          inlineSize: 'min(300px, 30vw)',
          blockSize: 'min(500px, 50vh)',
        }}
      >
        <Panels.Panel id={initialActiveId} as={List}>
          <Surface.Header as={Panels.Header} id='panels-header-1'>
            Root
          </Surface.Header>
          <ListItem>
            <Panels.Trigger for={panelIdMoreInfo}>
              <ListItem.Action>More details</ListItem.Action>
            </Panels.Trigger>
          </ListItem>
          <ListItem>
            <Panels.Trigger for={panelIdDoesNotExist}>
              <ListItem.Action id='panel-trigger-dne'>
                Go to panel that does not exist
              </ListItem.Action>
            </Panels.Trigger>
          </ListItem>
        </Panels.Panel>

        <Panels.Panel
          id={panelIdMoreInfo}
          as={Flex}
          flexDirection='column'
          alignItems='stretch'
        >
          <Surface.Header as={Panels.Header} id='panels-header-2'>
            More details
          </Surface.Header>
          <Surface.Body isPadded>
            <Text>Content</Text>
          </Surface.Body>
        </Panels.Panel>
      </Panels.Wrapper>
    </Flex>
  );
};

const MultiPanelInformationPanel = ({
  config,
}: {
  config: ReturnType<typeof getConfigFromSearchParams>;
}) => {
  const { showRootPanelBackButton } = config;

  const initialActiveId = 'root';

  const panels = Array.from(Array(20).keys()).map((i) => ({
    id: `panel-${i}`,
    label: `Panel ${i}`,
  }));

  return (
    <Panels.Wrapper
      initialActiveId={initialActiveId}
      as={Surface}
      style={{
        inlineSize: 'min(300px, 30vw)',
        blockSize: 'min(500px, 50vh)',
      }}
    >
      <Panels.Panel
        id={initialActiveId}
        as={Flex}
        flexDirection='column'
        alignItems='stretch'
        gap='0'
      >
        <Surface.Header as={Flex}>
          {showRootPanelBackButton && (
            <Panels.BackButton
              label='Should do nothing as no prev panel'
              id='root-panel-back-button'
            >
              <SvgArrowLeft />
            </Panels.BackButton>
          )}
          Root
        </Surface.Header>
        <Surface.Body
          style={{
            overflowY: 'auto',
            flex: '1',
          }}
          as={List}
        >
          {panels.map((panel) => (
            <ListItem key={panel.id}>
              <ListItem.Content>
                <Panels.Trigger for={`${panel.id}`}>
                  <ListItem.Action>{panel.label}</ListItem.Action>
                </Panels.Trigger>
              </ListItem.Content>
            </ListItem>
          ))}
        </Surface.Body>
      </Panels.Panel>

      {panels.map((panel) => (
        <Panels.Panel
          key={panel.id}
          id={panel.id}
          as={Flex}
          flexDirection='column'
          alignItems='stretch'
        >
          <Surface.Header as={Panels.Header}>{panel.label}</Surface.Header>
          <Surface.Body
            as={Flex}
            flexDirection='column'
            style={{
              height: '100%',
            }}
          >
            <Text>{`Content for panel ${panel.id}`}</Text>
            <Flex.Spacer />
            <Divider />
            <Text>{`Footer for panel ${panel.id}`}</Text>
          </Surface.Body>
        </Panels.Panel>
      ))}
    </Panels.Wrapper>
  );
};

const NestedPanels = () => {
  const panels = Panels.useInstance();

  const initialActiveId = 'root';
  const panel1Id = 'panel-1';
  const panel1_1Id = 'panel-1-1';
  const panel1_1_1Id = 'panel-1-1-1';

  const panelIds = [initialActiveId, panel1Id, panel1_1Id, panel1_1_1Id];

  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <Button id='instance-go-back' onClick={() => panels.goBack()}>
        Go Back
      </Button>
      <Panels.Wrapper
        instance={panels}
        initialActiveId={initialActiveId}
        style={{
          width: 'min(300px, 30vw)',
          height: 'min(500px, 50vh)',
        }}
        as={Surface}
      >
        {panelIds.map((id, index) => (
          <Panels.Panel key={id} id={id}>
            <Surface.Header as={Panels.Header}>{id}</Surface.Header>
            <Surface.Body
              as={Flex}
              flexDirection='column'
              alignItems='flex-start'
              isPadded
            >
              <Panels.Trigger for={panelIds[index + 1]}>
                <Button>
                  Go to {panelIds[index + 1] ?? "panel that doesn't exist"}
                </Button>
              </Panels.Trigger>
            </Surface.Body>
          </Panels.Panel>
        ))}
      </Panels.Wrapper>
    </Flex>
  );
};
