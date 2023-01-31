import { Avatar, Button, Icon } from '@itwin/itwinui-react';
import { SvgAdd } from '@itwin/itwinui-icons-react';

export default function Home() {
  return (
    <>
      {/* child = .iui-svg-icon */}
      <Avatar
        size='large'
        abbreviation='TR'
        backgroundColor={'orange'}
        child={
          <Icon>
            <SvgAdd />
          </Icon>
        }
        title='Terry Rivers'
      />

      {/* child = svg */}
      <Avatar
        size='large'
        abbreviation='TR'
        backgroundColor={'orange'}
        child={<SvgAdd />}
        title='Terry Rivers'
      />

      {/* child = .iui-icon */}
      <Avatar
        size='large'
        abbreviation='TR'
        backgroundColor={'orange'}
        child={<SvgAdd className='iui-icon' />}
        title='Terry Rivers'
      />

      {/* No breaking change when passing in image*/}
      <Avatar
        size='large'
        abbreviation='TR'
        backgroundColor={'orange'}
        image={
          <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
        }
        title='Terry Rivers'
      />

      {/* Passing old `<img>` tag in child instead of image prop */}
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
