/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  SvgFlag,
  SvgFolderOpened,
  SvgHome,
  SvgPlaceholder,
  SvgSettings,
} from '@itwin/itwinui-icons-react';
import React from 'react';
import {
  SideNavigation,
  SidenavButton,
  SidenavSubmenu,
  SidenavSubmenuHeader,
  Text,
  IconButton,
  Anchor,
} from '@itwin/itwinui-react';
import type { StoryDefault } from '@ladle/react';

export default {
  decorators: [
    (Story) => (
      <div style={{ height: 'calc(100vh - 24px)' }}>
        <Story />
      </div>
    ),
  ],
  title: 'SideNavigation',
} satisfies StoryDefault;

export const Basic = () => {
  return (
    <SideNavigation
      items={[
        <SidenavButton startIcon={<SvgHome />} key={0}>
          Home
        </SidenavButton>,
        <SidenavButton startIcon={<SvgFlag />} key={1}>
          Issues
        </SidenavButton>,
        <SidenavButton startIcon={<SvgFolderOpened />} key={2} disabled>
          Documents
        </SidenavButton>,
      ]}
      secondaryItems={[
        <SidenavButton startIcon={<SvgSettings />} key={3}>
          Settings
        </SidenavButton>,
      ]}
    />
  );
};

export const ActiveItem = () => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const mainItems = [...Array(3).fill(null)].map((_, index) => (
    <SidenavButton
      startIcon={<SvgPlaceholder />}
      key={index}
      isActive={activeIndex === index}
      onClick={() => setActiveIndex(index)}
    >
      {`App ${index}`}
    </SidenavButton>
  ));

  return (
    <SideNavigation
      items={mainItems}
      secondaryItems={[
        <SidenavButton startIcon={<SvgSettings />} key={3}>
          Settings
        </SidenavButton>,
      ]}
    />
  );
};

export const Submenu = () => {
  const itemsData = [
    { label: 'Home', icon: <SvgHome /> },
    { label: 'Issues', icon: <SvgFlag /> },
    { label: 'Documents', icon: <SvgFolderOpened /> },
    { label: 'Settings', icon: <SvgSettings /> },
  ];

  const [activeItem, setActiveItem] = React.useState(2);
  const [isSubmenuOpen, setIsSubmenuOpen] = React.useState(true);
  const [activeSubItem, setActiveSubItem] = React.useState(0);

  const items = itemsData.map(({ label, icon }, index) => (
    <SidenavButton
      key={index}
      startIcon={icon}
      isActive={activeItem === index}
      isSubmenuOpen={label === 'Documents' && isSubmenuOpen} // needed for proper styling when submenu is open but page is not active
      onClick={() => {
        if (label !== 'Documents') {
          setActiveItem(index);
          setActiveSubItem(-1);
          setIsSubmenuOpen(false);
        } else {
          setIsSubmenuOpen((open) => !open);
        }
      }}
    >
      {label}
    </SidenavButton>
  ));

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <SideNavigation
        expanderPlacement='bottom'
        items={items.slice(0, 3)}
        secondaryItems={[items[3]]}
        isSubmenuOpen={isSubmenuOpen}
        submenu={
          <SidenavSubmenu>
            <SidenavSubmenuHeader
              actions={
                <IconButton styleType='borderless' aria-label='Settings'>
                  <SvgSettings />
                </IconButton>
              }
            >
              <span>Documents</span>
            </SidenavSubmenuHeader>
            <Text variant='leading'>All documents</Text>
            <ul>
              {[...Array(10).fill(null)].map((_, index) => (
                <li key={index}>
                  <Anchor
                    onClick={() => {
                      setActiveItem(2);
                      setActiveSubItem(index);
                    }}
                  >
                    Folder {index}
                  </Anchor>
                </li>
              ))}
            </ul>
          </SidenavSubmenu>
        }
      />
      <div
        style={{
          background: 'var(--iui-color-background-disabled)',
          padding: 16,
          flexGrow: 1,
          display: 'grid',
          placeContent: 'center',
          placeItems: 'center',
        }}
      >
        <Text>{itemsData[activeItem]?.label} page</Text>
        <Text isMuted>
          {activeSubItem >= 0 && `Contents of Folder ${activeSubItem}`}
        </Text>
      </div>
    </div>
  );
};
