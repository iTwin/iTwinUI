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
      <Panels.Wrapper
        as={Surface}
        defaultActiveId={basePanelId}
        style={{ display: 'inline-block' }}
      >
        <Panels.Panel as={List} id={basePanelId}>
          <ListItem>Repeat</ListItem>
          <ListItem>
            <Panels.Trigger for={qualityPanelId}>
              <ListItem.Action>Quality</ListItem.Action>
            </Panels.Trigger>
          </ListItem>
          <ListItem>
            <Panels.Trigger for={speedPanelId}>
              <ListItem.Action>Speed</ListItem.Action>
            </Panels.Trigger>
          </ListItem>
          <ListItem>
            <Panels.Trigger for={accessibilityPanelId}>
              <ListItem.Action>Accessibility</ListItem.Action>
            </Panels.Trigger>
          </ListItem>
        </Panels.Panel>

        <Panels.Panel as={List} id={qualityPanelId}>
          <Surface.Header as={Panels.Header}>Quality</Surface.Header>
          <ListItem>240p</ListItem>
          <ListItem>360p</ListItem>
          <ListItem>480p</ListItem>
          <ListItem>720p</ListItem>
          <ListItem>1080p</ListItem>
        </Panels.Panel>

        {/* TODO: Remove the temp _iui3-menu class */}
        <Panels.Panel as={List} id={speedPanelId} className='_iui3-menu'>
          <Surface.Header as={Panels.Header}>Speed</Surface.Header>
          <ListItem>0.2x</ListItem>
          <ListItem>0.3x</ListItem>
          <ListItem>0.4x</ListItem>
          <ListItem>0.5x</ListItem>
          <ListItem>0.6x</ListItem>
          <ListItem>0.7x</ListItem>
          <ListItem>0.8x</ListItem>
          <ListItem>0.9x</ListItem>
          <ListItem>1.0x</ListItem>
          <ListItem>1.1x</ListItem>
          <ListItem>1.2x</ListItem>
          <ListItem>1.3x</ListItem>
          <ListItem>1.4x</ListItem>
          <ListItem>1.5x</ListItem>
          <ListItem>1.6x</ListItem>
          <ListItem>1.7x</ListItem>
          <ListItem>1.8x</ListItem>
          <ListItem>1.9x</ListItem>
          <ListItem>2.0x</ListItem>
        </Panels.Panel>

        <Panels.Panel as={List} id={accessibilityPanelId}>
          <Surface.Header as={Panels.Header}>Accessibility</Surface.Header>
          <ListItem>High contrast</ListItem>
          <ListItem>Large text</ListItem>
          <ListItem>Screen reader</ListItem>
        </Panels.Panel>
      </Panels.Wrapper>
    </>
  );
}
