import { DropdownButton, MenuItem } from '@itwin/itwinui-react';

export default () => {
  return (
    <DropdownButton
      menuItems={(close) => [
        <MenuItem key={0} onClick={close}>
          Test0
        </MenuItem>,
        <MenuItem key={1} onClick={close}>
          Test1
        </MenuItem>,
        <MenuItem key={2} onClick={close}>
          Test2
        </MenuItem>,
      ]}
    >
      test-label
    </DropdownButton>
  );
};
