/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SidenavButton, SideNavigation } from '@itwin/itwinui-react';
import {
  SvgHome,
  SvgFlag,
  SvgFolderOpened,
  SvgSettings,
} from '@itwin/itwinui-icons-react';
export default () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  return React.createElement(SideNavigation, {
    items: [
      React.createElement(
        SidenavButton,
        {
          startIcon: React.createElement(SvgHome, null),
          key: 0,
          isActive: activeIndex === 0,
          onClick: () => setActiveIndex(0),
        },
        'Home',
      ),
      React.createElement(
        SidenavButton,
        {
          startIcon: React.createElement(SvgFlag, null),
          key: 1,
          isActive: activeIndex === 1,
          onClick: () => setActiveIndex(1),
        },
        'Issues',
      ),
      React.createElement(
        SidenavButton,
        {
          startIcon: React.createElement(SvgFolderOpened, null),
          key: 2,
          disabled: true,
        },
        'Documents',
      ),
    ],
    secondaryItems: [
      React.createElement(
        SidenavButton,
        {
          startIcon: React.createElement(SvgSettings, null),
          key: 3,
          isActive: activeIndex === 3,
          onClick: () => setActiveIndex(3),
        },
        'Settings',
      ),
    ],
  });
};
