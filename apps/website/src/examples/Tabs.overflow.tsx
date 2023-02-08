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
        return 'Tab Content One';
      case 1:
        return 'Tab Content Two';
      case 2:
        return 'Tab Content Three';
      case 3:
        return 'Tab Content Four';
      case 4:
        return 'Tab Content Five';
      case 5:
        return 'Tab Content Six';
      case 6:
        return 'Tab Content Seven';
      case 7:
        return 'Tab Content Eight';
      case 8:
        return 'Tab Content Nine';
      case 9:
        return 'Tab Content Ten';
      case 10:
        return 'Tab Content Eleven';
      case 11:
        return 'Tab Content Twelve';
      default:
        return 'Tab Content Thirteen';
    }
  };
  const labels = [
    <Tab key={1} label='Item 1' />,
    <Tab key={2} label='Item 2' />,
    <Tab key={3} label='Item 3' />,
    <Tab key={4} label='Item 4' />,
    <Tab key={5} label='Item 5' />,
    <Tab key={6} label='Item 6' />,
    <Tab key={7} label='Item 7' />,
    <Tab key={8} label='Item 8' />,
    <Tab key={9} label='Item 9' />,
    <Tab key={10} label='Item 10' />,
    <Tab key={11} label='Item 11' />,
    <Tab key={12} label='Item 12' />,
    <Tab key={13} label='Item 13' />,
  ];

  return (
    <div style={{ maxWidth: 425, border: '1px solid lightpink', padding: 8 }}>
      <Tabs
        labels={labels}
        overflowButton={(visibleCount: number) => (
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
              style={{ paddingTop: '12px', margin: '4px', height: 'auto' }}
              styleType='borderless'
            >
              <SvgMoreSmall />
            </IconButton>
          </DropdownMenu>
        )}
        onTabSelected={setIndex}
        activeIndex={index}
      >
        {getContent()}
      </Tabs>
    </div>
  );
};
