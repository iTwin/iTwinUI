import { useSearchParams } from '@remix-run/react';
import { Menu } from 'node_modules/@itwin/itwinui-react/esm/core/Menu/Menu.js';
import {
  Button,
  Checkbox,
  MenuDivider,
  MenuExtraContent,
  MenuItem,
} from '@itwin/itwinui-react';
import React from 'react';

const testLabels = ['Test0', 'Test1', 'Test2'];

export default () => {
  const [searchParams] = useSearchParams();
  // Open menu by default
  const initialVisibility =
    searchParams.get('visible') === 'false' ? false : true;
  const role = searchParams.get('role');
  const selectedIndex = searchParams.get('selectedIndex');

  const children =
    searchParams.get('children') === 'complex'
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

  const [visible, setVisible] = React.useState(initialVisibility);

  const popoverProps = { visible: visible };

  const trigger = (
    <Button
      data-testid='toggle-menu-button'
      onClick={() => setVisible((v) => !v)}
    >
      Open menu
    </Button>
  );

  return (
    <>
      <Menu
        trigger={trigger}
        className='Menu'
        role={role != null ? role : undefined}
        popoverProps={popoverProps}
      >
        {children}
      </Menu>
    </>
  );
};
