import {
  Button,
  Checkbox,
  DropdownMenu,
  MenuDivider,
  MenuExtraContent,
  MenuItem,
} from '@itwin/itwinui-react';
import { useSearchParams } from '@remix-run/react';

export default () => {
  const [searchParams] = useSearchParams();

  const menuType = (searchParams.get('menuType') || 'withSubmenu') as
    | 'withSubmenu'
    | 'withExtraContent';

  return (
    <>
      {menuType === 'withExtraContent' ? (
        <DropdownMenuWithExtraContent />
      ) : (
        <DropdownMenuWithSubmenus />
      )}
    </>
  );
};

// ----------------------------------------------------------------------------

const DropdownMenuWithSubmenus = () => {
  return (
    <DropdownMenu
      className='DropdownMenu'
      menuItems={(close) => [
        <MenuItem
          key='Item 1_1'
          data-testid='Item 1_1'
          subMenuItems={[
            <MenuItem key='Item 2_1' data-testid='Item 2_1' onClick={close}>
              Item 2_1
            </MenuItem>,
            <MenuItem key='Item 2_2' data-testid='Item 2_2' onClick={close}>
              Item 2_2
            </MenuItem>,
            <MenuItem
              key='Item 2_3'
              data-testid='Item 2_3'
              subMenuItems={[
                <MenuItem key='Item 3_1' data-testid='Item 3_1' onClick={close}>
                  Item 3_1
                </MenuItem>,
                <MenuItem
                  key='Item 3_2'
                  data-testid='Item 3_2'
                  onClick={close}
                  subMenuItems={[
                    <MenuItem
                      key='Item 3_2_1'
                      data-testid='Item 3_2_1'
                      onClick={close}
                    >
                      Item 3_2_1
                    </MenuItem>,
                  ]}
                >
                  Item 3_2
                </MenuItem>,
                <MenuItem
                  key='Item 3_3'
                  data-testid='Item 3_3'
                  subMenuItems={[
                    <MenuItem
                      key='Item 3_3_1'
                      data-testid='Item 3_3_1'
                      onClick={close}
                    >
                      Item 3_3_1
                    </MenuItem>,
                  ]}
                >
                  Item 3_3
                </MenuItem>,
              ]}
            >
              Item 2_3
            </MenuItem>,
          ]}
        >
          Item 1_1
        </MenuItem>,
        <MenuItem key='Item 1_2' data-testid='Item 1_2' onClick={close}>
          Item 1_2
        </MenuItem>,
        <MenuItem key='Item 1_3' data-testid='Item 1_3' onClick={close}>
          Item 1_3
        </MenuItem>,
      ]}
    >
      <Button data-testid='trigger'>Menu with submenu</Button>
    </DropdownMenu>
  );
};

const DropdownMenuWithExtraContent = () => {
  return (
    <DropdownMenu
      className='DropdownMenu'
      menuItems={() => [
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
      ]}
    >
      <Button data-testid='trigger'>Menu with extra content</Button>
    </DropdownMenu>
  );
};
