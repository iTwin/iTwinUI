import { Button, DropdownMenu, MenuItem } from '@itwin/itwinui-react';

const App = () => {
  return (
    <>
      <DropdownMenu
        menuItems={(close) => [
          // <MenuItem onClick={close}>Item 1_2</MenuItem>,
          <MenuItem
            key='Item 1_3'
            subMenuItems={[
              <MenuItem key='Item 2_1' onClick={close}>
                Item 2_1
              </MenuItem>,
              <MenuItem key='Item 2_2' onClick={close}>
                Item 2_2
              </MenuItem>,
              <MenuItem
                key='Item 2_3'
                subMenuItems={[
                  <MenuItem key='Item 3_1' onClick={close}>
                    Item 3_1
                  </MenuItem>,
                  <MenuItem key='Item 3_2' onClick={close}>
                    Item 3_2
                  </MenuItem>,
                  <MenuItem
                    key='Item 3_3'
                    subMenuItems={[
                      <MenuItem key='Item 4_1' onClick={close}>
                        Item 4_1
                      </MenuItem>,
                      <MenuItem
                        key='Item 4_2'
                        onClick={close}
                        // subMenuItems={[
                        //   <MenuItem key='Item 5_1' onClick={close}>
                        //     Item 5_1
                        //   </MenuItem>,
                        //   <MenuItem key='Item 5_2' onClick={close}>
                        //     Item 5_2
                        //   </MenuItem>,
                        //   <MenuItem
                        //     key='Item 5_3'
                        //     // onClick={() => {
                        //     //   console.log('Item 5_3 clicked');
                        //     //   close();
                        //     // }}
                        //     subMenuItems={[
                        //       <MenuItem key='Item 6_1' onClick={close}>
                        //         Item 6_1
                        //       </MenuItem>,
                        //       <MenuItem key='Item 6_2' onClick={close}>
                        //         Item 6_2
                        //       </MenuItem>,
                        //       <MenuItem key='Item 6_3'>Item 6_3</MenuItem>,
                        //     ]}
                        //   >
                        //     Item 5_3
                        //   </MenuItem>,
                        // ]}
                      >
                        Item 4_2
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
            Item 1_3
          </MenuItem>,
        ]}
      >
        <Button>Menu</Button>
      </DropdownMenu>
    </>
  );
};

export default App;
