import { List, ListItem, Panels, Surface } from '@itwin/itwinui-react';
import React from 'react';

export default function Home() {
  const basePanelId = React.useId();
  const repeatId = React.useId();
  const qualityPanelId = React.useId();
  const speedPanelId = React.useId();
  const accessibilityPanelId = React.useId();

  return (
    <>
      <Panels.Wrapper as={Surface} defaultActiveId={basePanelId}>
        <Panels.Panel as={List} id={basePanelId}>
          <ListItem>Repeat</ListItem>
          <ListItem>
            <Panels.Trigger for={qualityPanelId}>
              <ListItem.Action>Quality</ListItem.Action>
            </Panels.Trigger>
          </ListItem>
          <ListItem>Speed</ListItem>
          <ListItem>Accessibility</ListItem>
        </Panels.Panel>

        <Panels.Panel as={List} id={qualityPanelId}>
          <ListItem>240p</ListItem>
          <ListItem>360p</ListItem>
          <ListItem>480p</ListItem>
          <ListItem>720p</ListItem>
          <ListItem>1080p</ListItem>
        </Panels.Panel>
      </Panels.Wrapper>
    </>
  );
}
