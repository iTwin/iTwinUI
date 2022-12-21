/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SidenavButton, SideNavigation } from '@itwin/itwinui-react';
import { SvgHome, SvgFlag, SvgFolderOpened, SvgSettings } from '@itwin/itwinui-icons-react';

export default () => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  return (
    <SideNavigation
      style={{ height: '90%' }}
      items={[
        <SidenavButton
          startIcon={<SvgHome />}
          key={0}
          isActive={activeIndex === 0}
          onClick={() => setActiveIndex(0)}
        >
          Home
        </SidenavButton>,
        <SidenavButton
          startIcon={<SvgFlag />}
          key={1}
          isActive={activeIndex === 1}
          onClick={() => setActiveIndex(1)}
        >
          Issues
        </SidenavButton>,
        <SidenavButton startIcon={<SvgFolderOpened />} key={2} disabled>
          Documents
        </SidenavButton>,
      ]}
      secondaryItems={[
        <SidenavButton
          startIcon={<SvgSettings />}
          key={3}
          isActive={activeIndex === 3}
          onClick={() => setActiveIndex(3)}
        >
          Settings
        </SidenavButton>,
      ]}
    />
  );
};
