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
                  <MenuItem
                    key='Item 3_2'
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
                      // <MenuItem key='Item 4_3' onClick={close}>
                      //   Item 4_3
                      // </MenuItem>,
                    ]}
                  >
                    Item 3_3
                  </MenuItem>,
                ]}
              >
                Item 2_3
              </MenuItem>,
              // <MenuItem
              //   key='Item 4_4'
              //   onClick={close}
              //   subMenuItems={[
              //     <MenuItem key='Item 5_1' onClick={close}>
              //       Item 5_1
              //     </MenuItem>,
              //     <MenuItem key='Item 5_2' onClick={close}>
              //       Item 5_2
              //     </MenuItem>,
              //     <MenuItem
              //       key='Item 5_3'
              //       // onClick={() => {
              //       //   console.log('Item 5_3 clicked');
              //       //   close();
              //       // }}
              //       subMenuItems={[
              //         <MenuItem key='Item 6_1' onClick={close}>
              //           Item 6_1
              //         </MenuItem>,
              //         <MenuItem key='Item 6_2' onClick={close}>
              //           Item 6_2
              //         </MenuItem>,
              //         <MenuItem key='Item 6_3'>Item 6_3</MenuItem>,
              //       ]}
              //     >
              //       Item 5_3
              //     </MenuItem>,
              //   ]}
              // >
              //   Item 4_4
              // </MenuItem>,
            ]}
          >
            Item 1_3
          </MenuItem>,
        ]}
      >
        <Button>Menu</Button>
      </DropdownMenu>
      <DropdownMenu
        menuItems={(close) => [
          <MenuItem key='Item 1_1' onClick={close}>
            Item 1_1
          </MenuItem>,
          <MenuItem key='Item 1_2' onClick={close}>
            Item 1_2
          </MenuItem>,
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
                        subMenuItems={[
                          <MenuItem key='Item 5_1' onClick={close}>
                            Item 5_1
                          </MenuItem>,
                          <MenuItem key='Item 5_2' onClick={close}>
                            Item 5_2
                          </MenuItem>,
                          <MenuItem
                            key='Item 5_3'
                            // onClick={() => {
                            //   console.log('Item 5_3 clicked');
                            //   close();
                            // }}
                            subMenuItems={[
                              <MenuItem key='Item 6_1' onClick={close}>
                                Item 6_1
                              </MenuItem>,
                              <MenuItem key='Item 6_2' onClick={close}>
                                Item 6_2
                              </MenuItem>,
                              <MenuItem key='Item 6_3'>Item 6_3</MenuItem>,
                            ]}
                          >
                            Item 5_3
                          </MenuItem>,
                        ]}
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
      <DropdownMenu
        menuItems={(close) => [
          <MenuItem key='Item 1_1' onClick={close}>
            Item 1_1
          </MenuItem>,
          <MenuItem key='Item 1_2' onClick={close}>
            Item 1_2
          </MenuItem>,
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
                        subMenuItems={[
                          <MenuItem key='Item 5_1' onClick={close}>
                            Item 5_1
                          </MenuItem>,
                          <MenuItem key='Item 5_2' onClick={close}>
                            Item 5_2
                          </MenuItem>,
                          <MenuItem
                            key='Item 5_3'
                            // onClick={() => {
                            //   console.log('Item 5_3 clicked');
                            //   close();
                            // }}
                            subMenuItems={[
                              <MenuItem key='Item 6_1' onClick={close}>
                                Item 6_1
                              </MenuItem>,
                              <MenuItem key='Item 6_2' onClick={close}>
                                Item 6_2
                              </MenuItem>,
                              <MenuItem key='Item 6_3'>Item 6_3</MenuItem>,
                            ]}
                          >
                            Item 5_3
                          </MenuItem>,
                        ]}
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
      <DropdownMenu
        menuItems={(close) => [
          // <MenuItem onClick={close}>Item 1_2</MenuItem>,
          <MenuItem key='Item 1_1'>Item 1_1</MenuItem>,
          <MenuItem key='Item 1_2'>Item 1_2</MenuItem>,
          <MenuItem key='Item 1_3'>Item 1_3</MenuItem>,
        ]}
      >
        <Button>Menu</Button>
      </DropdownMenu>
      {/* <MenuItem
        value='test_value'
        data-testid='parent'
        // ref={(el) => {
        //   el?.focus();
        // }}
        subMenuItems={[
          <MenuItem
            key={1}
            // onClick={mockedSubOnClick}
            value='test_value_sub'
            data-testid='sub'
            subMenuItems={[
              <MenuItem key={7} onClick={() => {}}>
                Item #7
              </MenuItem>,
              <MenuItem key={8} onClick={() => {}}>
                Item #8
              </MenuItem>,
            ]}
          >
            Test sub 1
          </MenuItem>,
          <MenuItem
            key={2}
            // onClick={mockedSubOnClick}
            value='test_value_sub'
            data-testid='sub'
            subMenuItems={[
              <MenuItem key={7} onClick={() => {}}>
                Item #7
              </MenuItem>,
              <MenuItem key={8} onClick={() => {}}>
                Item #8
              </MenuItem>,
            ]}
          >
            Test sub 2
          </MenuItem>,
          <MenuItem
            value='test_value'
            data-testid='parent'
            subMenuItems={[
              <MenuItem
                key={1}
                value='test_value_sub'
                data-testid='sub'
                subMenuItems={[
                  <MenuItem
                    key={2}
                    data-testid='sub-sub'
                    value='test_value_sub_sub'
                  >
                    Test sub sub
                  </MenuItem>,
                ]}
              >
                Test sub
              </MenuItem>,
              <MenuItem
                key={3}
                value='test_value_sub'
                data-testid='sub'
                subMenuItems={[
                  <MenuItem
                    key={3}
                    data-testid='sub-sub'
                    value='test_value_sub_sub'
                  >
                    Test sub sub
                  </MenuItem>,
                ]}
              >
                Test sub
              </MenuItem>,
            ]}
          >
            Test item
          </MenuItem>,
        ]}
      >
        Test item
      </MenuItem>
      <MenuItem
        key={0}
        data-testid='parent'
        ref={(el) => {
          el?.focus();
        }}
        subMenuItems={[
          <MenuItem
            key={1}
            data-testid='sub-1'
            subMenuItems={[
              <MenuItem key={2} data-testid='sub-2'>
                Test sub sub
              </MenuItem>,
            ]}
          >
            Test sub
          </MenuItem>,
          <MenuItem
            key={3}
            data-testid='sub-3'
            subMenuItems={[
              <MenuItem key={4} data-testid='sub-4'>
                Test sub sub
              </MenuItem>,
            ]}
          >
            Test sub
          </MenuItem>,
        ]}
      >
        Test item
      </MenuItem> */}
    </>
  );
};

export default App;
