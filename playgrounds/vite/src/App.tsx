import { SvgMore } from '@itwin/itwinui-icons-react';
import {
  // Button,
  DropdownMenu,
  IconButton,
  MenuItem,
} from '@itwin/itwinui-react';

const App = () => {
  const onClick = (index: number, close: () => void) => () => {
    console.log(`Item #${index} clicked!`);
    close();
  };
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={onClick(1, close)}>
      Item #1
    </MenuItem>,
    <MenuItem key={2} onClick={onClick(2, close)}>
      Item #2
    </MenuItem>,
    <MenuItem
      key={3}
      subMenuItems={[
        <MenuItem
          key={4}
          subMenuItems={[
            <MenuItem key={7} onClick={onClick(7, close)}>
              Item #7
            </MenuItem>,
            <MenuItem key={8} onClick={onClick(8, close)}>
              Item #8
            </MenuItem>,
          ]}
        >
          Item #4
        </MenuItem>,
        <MenuItem key={5} onClick={onClick(5, close)}>
          Item #5
        </MenuItem>,
        <MenuItem
          key={6}
          subMenuItems={[
            <MenuItem key={9} onClick={onClick(9, close)}>
              Item #9
            </MenuItem>,
            <MenuItem key={10} onClick={onClick(10, close)}>
              Item #10
            </MenuItem>,
          ]}
        >
          Item #6
        </MenuItem>,
      ]}
    >
      Item #3
    </MenuItem>,
  ];
  return (
    <DropdownMenu menuItems={dropdownMenuItems}>
      <IconButton>
        <SvgMore />
      </IconButton>
    </DropdownMenu>
  );
};

export default App;
