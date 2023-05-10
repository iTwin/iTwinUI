/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SidenavButton, SideNavigation, SideNavigationProps } from '@itwin/itwinui-react';
import { SvgPlaceholder, SvgSettings } from '@itwin/itwinui-icons-react';

export default () => {
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
