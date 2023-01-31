import { Avatar, Button, Icon } from '@itwin/itwinui-react';
import { SvgAdd } from '@itwin/itwinui-icons-react';

export default function Home() {
  return (
    <>
      <Avatar
        size='large'
        abbreviation='TR'
        backgroundColor={'orange'}
        child={
          // <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
          // <SvgAdd className='iui-icon' />
          <Icon>
            <SvgAdd />
          </Icon>
        }
        // image={
        //   // <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
        //   // <Icon>
        //   <SvgAdd />
        //   // </Icon>
        // }
        title='Terry Rivers'
      />
      <Avatar
        size='large'
        abbreviation='TR'
        backgroundColor={'orange'}
        child={
          // <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
          // <SvgAdd className='iui-icon' />
          <SvgAdd />
        }
        // image={
        //   // <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
        //   // <Icon>
        //   <SvgAdd />
        //   // </Icon>
        // }
        title='Terry Rivers'
      />
      <Avatar
        size='large'
        abbreviation='TR'
        backgroundColor={'orange'}
        child={<SvgAdd className='iui-icon' />}
        title='Terry Rivers'
      />
      <Avatar
        size='large'
        abbreviation='TR'
        backgroundColor={'orange'}
        child={
          <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
        }
        title='Terry Rivers'
      />
    </>
  );
}
