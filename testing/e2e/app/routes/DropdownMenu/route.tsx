import { Button, DropdownMenu, MenuItem } from '@itwin/itwinui-react';

export default () => {
  return (
    <>
      <DropdownMenu
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
                  <MenuItem
                    key='Item 3_1'
                    data-testid='Item 3_1'
                    onClick={close}
                  >
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
        ]}
      >
        <Button data-testid='trigger'>Menu</Button>
      </DropdownMenu>
      <Button>Outside</Button>
    </>
  );
};
