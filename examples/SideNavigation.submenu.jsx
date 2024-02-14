/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Anchor,
  IconButton,
  SidenavButton,
  SideNavigation,
  Text,
  SidenavSubmenu,
  SidenavSubmenuHeader,
} from '@itwin/itwinui-react';
import {
  SvgHome,
  SvgFlag,
  SvgFolderOpened,
  SvgSettings,
} from '@itwin/itwinui-icons-react';

export default () => {
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
    <div className='submenu-side-navigation-container'>
      <SideNavigation
        expanderPlacement='bottom'
        items={items.slice(0, 3)}
        secondaryItems={[items[3]]}
        isSubmenuOpen={isSubmenuOpen}
        submenu={
          <SidenavSubmenu>
            <SidenavSubmenuHeader
              actions={
                <IconButton label='Submenu settings' styleType='borderless'>
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
      <div className='submenu-side-navigation-item-label-container'>
        <Text>{itemsData[activeItem]?.label} page</Text>
        <Text isMuted>
          {activeSubItem >= 0 && `Contents of Folder ${activeSubItem}`}
        </Text>
      </div>
    </div>
  );
};
