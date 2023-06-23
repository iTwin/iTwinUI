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
    { label: 'Home', icon: React.createElement(SvgHome, null) },
    { label: 'Issues', icon: React.createElement(SvgFlag, null) },
    { label: 'Documents', icon: React.createElement(SvgFolderOpened, null) },
    { label: 'Settings', icon: React.createElement(SvgSettings, null) },
  ];
  const [activeItem, setActiveItem] = React.useState(2);
  const [isSubmenuOpen, setIsSubmenuOpen] = React.useState(true);
  const [activeSubItem, setActiveSubItem] = React.useState(0);
  const items = itemsData.map(({ label, icon }, index) =>
    React.createElement(
      SidenavButton,
      {
        key: index,
        startIcon: icon,
        isActive: activeItem === index,
        isSubmenuOpen: label === 'Documents' && isSubmenuOpen,
        onClick: () => {
          if (label !== 'Documents') {
            setActiveItem(index);
            setActiveSubItem(-1);
            setIsSubmenuOpen(false);
          } else {
            setIsSubmenuOpen((open) => !open);
          }
        },
      },
      label,
    ),
  );
  return React.createElement(
    'div',
    { style: { display: 'flex', height: '100%' } },
    React.createElement(SideNavigation, {
      expanderPlacement: 'bottom',
      items: items.slice(0, 3),
      secondaryItems: [items[3]],
      isSubmenuOpen: isSubmenuOpen,
      submenu: React.createElement(
        SidenavSubmenu,
        null,
        React.createElement(
          SidenavSubmenuHeader,
          {
            actions: React.createElement(
              IconButton,
              { styleType: 'borderless' },
              React.createElement(SvgSettings, null),
            ),
          },
          React.createElement('span', null, 'Documents'),
        ),
        React.createElement(Text, { variant: 'leading' }, 'All documents'),
        React.createElement(
          'ul',
          null,
          [...Array(10).fill(null)].map((_, index) =>
            React.createElement(
              'li',
              { key: index },
              React.createElement(
                Anchor,
                {
                  onClick: () => {
                    setActiveItem(2);
                    setActiveSubItem(index);
                  },
                },
                'Folder ',
                index,
              ),
            ),
          ),
        ),
      ),
    }),
    React.createElement(
      'div',
      {
        style: {
          background: 'var(--iui-color-background-disabled)',
          padding: 16,
          flexGrow: 1,
          display: 'grid',
          placeContent: 'center',
          placeItems: 'center',
        },
      },
      React.createElement(Text, null, itemsData[activeItem]?.label, ' page'),
      React.createElement(
        Text,
        { isMuted: true },
        activeSubItem >= 0 && `Contents of Folder ${activeSubItem}`,
      ),
    ),
  );
};
