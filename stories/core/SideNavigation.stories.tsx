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
import { useState } from '@storybook/addons';
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  SideNavigation,
  SidenavButton,
  SideNavigationProps,
} from '../../src/core';

export default {
  component: SideNavigation,
  subcomponents: { SidenavButton },
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    items: { control: { disable: true } },
    secondaryItems: { control: { disable: true } },
  },
  args: { style: { height: 'calc(100vh - 24px) ' } },
  title: 'Core/SideNavigation',
} as Meta<SideNavigationProps>;

export const Basic: Story<SideNavigationProps> = (args) => {
  return (
    <SideNavigation
      {...args}
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

export const ActiveItem: Story<SideNavigationProps> = (args) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

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
      {...args}
      items={mainItems}
      secondaryItems={[
        <SidenavButton startIcon={<SvgSettings />} key={3}>
          Settings
        </SidenavButton>,
      ]}
    />
  );
};
