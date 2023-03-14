/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Tabs, Tab, DropdownMenu, MenuItem, IconButton } from '@itwin/itwinui-react';
import SvgMoreSmall from '@itwin/itwinui-icons-react/cjs/icons/MoreSmall';

export default () => {
  const [index, setIndex] = React.useState(0);
  const getContent = () => {
    switch (index) {
      case 0:
        return 'Bentley Systems, Incorporated, is an American-based software development company that develops, manufactures, licenses, sells and supports computer software and services for the design, construction, and operation of infrastructure.';
      case 1:
        return "The company's software serves the building, plant, civil, and geospatial markets in the areas of architecture, engineering, construction (AEC) and operations.";
      case 2:
        return 'Their software products are used to design, engineer, build, and operate large constructed assets such as roadways, railways, bridges, buildings, industrial plants, power plants, and utility networks.';
      case 3:
        return 'The company re-invests 20% of their revenues in research and development.';
      case 4:
        return 'Bentley Systems is headquartered in Exton, Pennsylvania, United States, but has development, sales and other departments in over 50 countries.';
      case 5:
        return 'The company had revenues of $700 million in 2018.';
      case 6:
        return 'Keith A. Bentley and Barry J. Bentley founded Bentley Systems in 1984.';
      default:
        return 'They introduced the commercial version of PseudoStation in 1985, which allowed users of Intergraphs VAX systems to use low-cost graphics terminals to view and modify the designs on their Intergraph IGDS (Interactive Graphics Design System) installations.';
    }
  };
  const labels = [
    <Tab key={1} label='Bentley Overview' />,
    <Tab key={2} label='Markets' />,
    <Tab key={3} label='Uses' />,
    <Tab key={4} label='Reinvestment' />,
    <Tab key={5} label='Location' />,
    <Tab key={6} label='Revenue' />,
    <Tab key={7} label='Founders' />,
    <Tab key={8} label='History' />,
  ];

  const overflowButton = (visibleCount: number) => (
    <DropdownMenu
      menuItems={(close: () => void) =>
        Array(labels.length - visibleCount)
          .fill(null)
          .map((_, _index) => {
            const index = visibleCount + _index + 1;
            const onClick = () => {
              setIndex(index - 1);
              close();
            };
            return (
              <MenuItem key={index} onClick={onClick}>
                Item {index}
              </MenuItem>
            );
          })
      }
    >
      <IconButton
        role='button'
        style={{ paddingTop: '12px', margin: '4px', height: 'auto' }}
        styleType='borderless'
      >
        <SvgMoreSmall />
      </IconButton>
    </DropdownMenu>
  );

  return (
    <div style={{ maxWidth: 425, border: '1px solid lightpink', padding: 8 }}>
      <Tabs
        labels={labels}
        overflowButton={overflowButton}
        onTabSelected={setIndex}
        activeIndex={index}
      >
        {getContent()}
      </Tabs>
    </div>
  );
};
