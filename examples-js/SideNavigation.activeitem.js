/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  SidenavButton,
  SideNavigation,
  SideNavigationProps,
} from '@itwin/itwinui-react';
import { SvgPlaceholder, SvgSettings } from '@itwin/itwinui-icons-react';
export default () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const mainItems = [...Array(3).fill(null)].map((_, index) =>
    React.createElement(
      SidenavButton,
      {
        startIcon: React.createElement(SvgPlaceholder, null),
        key: index,
        isActive: activeIndex === index,
        onClick: () => setActiveIndex(index),
      },
      `App ${index}`,
    ),
  );
  return React.createElement(SideNavigation, {
    items: mainItems,
    secondaryItems: [
      React.createElement(
        SidenavButton,
        { startIcon: React.createElement(SvgSettings, null), key: 3 },
        'Settings',
      ),
    ],
  });
};
