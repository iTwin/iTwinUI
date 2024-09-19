import { Header, MenuItem } from '@itwin/itwinui-react';

export default () => {
  return (
    <Header
      appLogo={<div>AppTitle</div>}
      menuItems={(close) => [
        <MenuItem
          key={0}
          onClick={() => {
            console.log('CLICKED');
            close();
          }}
        >
          Test0
        </MenuItem>,
        <MenuItem key={1} onClick={close}>
          Test1
        </MenuItem>,
        <MenuItem key={2} onClick={close}>
          Test2
        </MenuItem>,
      ]}
    />
  );
};
