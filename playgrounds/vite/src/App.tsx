import {
  Button,
  Checkbox,
  MenuDivider,
  MenuExtraContent,
  MenuItem,
} from '@itwin/itwinui-react';
import React from 'react';
import {
  useListNavigationProps,
  usePopover,
  // } from '../../../packages/itwinui-react/esm/core/Popover/Popover.js';
} from '../../../packages/itwinui-react/src/core/Popover/Popover.js';
import {
  Menu,
  MenuContext,
  // } from '../../../packages/itwinui-react/esm/core/Menu/Menu.js';
} from '../../../packages/itwinui-react/src/core/Menu/Menu.js';

const testLabels = ['Test0', 'Test1', 'Test2'];

const App = () => {
  // Open menu by default
  const initialVisibility = true;
  const role = undefined;
  const selectedIndex = '1';
  const isListNavigation = true;

  const children = false
    ? [
        <MenuExtraContent key={0}>Test content</MenuExtraContent>,
        <MenuItem data-testid={`FocusTarget-0`} key={1}>
          Test0
        </MenuItem>,
        <MenuItem data-testid={`FocusTarget-1`} key={2}>
          <Checkbox />
          Test1
        </MenuItem>,
        <MenuDivider key={3} />,
        <MenuItem key={4} disabled>
          Test2
        </MenuItem>,
        <MenuItem data-testid={`FocusTarget-2`} key={5}>
          Test3
        </MenuItem>,
        <MenuExtraContent key={6}>
          <Button data-testid={`FocusTarget-3`}>Test4</Button>
        </MenuExtraContent>,
      ]
    : testLabels.map((label, index) => (
        <MenuItem
          data-testid={`MenuItem-${index}`}
          key={index}
          isSelected={
            selectedIndex != null
              ? index === parseInt(selectedIndex)
              : undefined
          }
        >
          {label}
        </MenuItem>
      ));

  const _listNavigationProps = useListNavigationProps();
  const listNavigationProps = isListNavigation
    ? _listNavigationProps
    : undefined;

  const [visible, setVisible] = React.useState(initialVisibility);

  const popover = usePopover({
    visible: visible,
    interactions: {
      listNavigation: listNavigationProps,
    },
  });

  return (
    <>
      <Button
        data-testid='toggle-menu-button'
        ref={popover.refs.setPositionReference}
        {...popover.getReferenceProps({
          onClick: () => setVisible((v) => !v),
        })}
      >
        Open menu
      </Button>
      <MenuContext.Provider
        value={{
          popover,
          listNavigationProps: listNavigationProps,
        }}
      >
        <Menu className='Menu' role={role != null ? role : undefined}>
          {children}
        </Menu>
      </MenuContext.Provider>
    </>
  );
};

export default App;
