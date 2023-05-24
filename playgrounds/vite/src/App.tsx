import React from 'react';
import {
  Badge,
  Button,
  getUserColor,
  IconButton,
  MenuItem,
  Tag,
  TagContainer,
  Tile,
  TileProps,
  Avatar,
  TileNew,
  TileNewProps,
} from '@itwin/itwinui-react';
import SvgFolder from '@itwin/itwinui-icons-react/cjs/icons/Folder';
import SvgImodelHollow from '@itwin/itwinui-icons-react/cjs/icons/ImodelHollow';
import SvgInfo from '@itwin/itwinui-icons-react/cjs/icons/Info';
import SvgStar from '@itwin/itwinui-icons-react/cjs/icons/Star';
import SvgTag from '@itwin/itwinui-icons-react/cjs/icons/Tag';

const App = (props: TileNewProps) => {
  const { status, ...rest } = props;
  const [selected, setSelected] = React.useState(false);
  return (
    <TileNew
      // status='positive'
      // variant='folder'
      // isNew={true}
      // isSelected={selected}
      // onClick={() => setSelected((prev) => !prev)}
      // isActionable={true}
      // isDisabled={false}
      {...rest}
    >
      <TileNew.ThumbnailArea>
        {/* <TileNew.ThumbnailPicture>
        </TileNew.ThumbnailPicture> */}
        <TileNew.ThumbnailAvatar>
          <Avatar
            size='x-large'
            status='online'
            abbreviation='TR'
            backgroundColor={getUserColor('Terry Rivers')}
            image={
              <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
            }
            title='Terry Rivers'
          />
        </TileNew.ThumbnailAvatar>

        {/* <TileNew.Badge>
          <Badge backgroundColor='hsl(197, 71%, 83%)'>Badge</Badge>,
        </TileNew.Badge> */}
        {/* <TileNew.TypeIndicator>
          <IconButton styleType='borderless'>
            <SvgInfo />
          </IconButton>
        </TileNew.TypeIndicator>
        <TileNew.QuickAction>
          <IconButton styleType='borderless'>
            <SvgStar />
          </IconButton>
        </TileNew.QuickAction> */}
      </TileNew.ThumbnailArea>
      {/* <TileNew.Name>
        <TileNew.Action href='https://inclusive-components.design/cards/'>
          Stadium
        </TileNew.Action> */}
      {/* {'Stadium'} */}
      {/* </TileNew.Name>
      <TileNew.ContentArea>
        <TileNew.Description description='`National stadium in Singapore. Features landscape details and a metro station. This is the largest sample iModel.' />
        <TileNew.Metadata>
          <span>Folder metadata</span>
        </TileNew.Metadata> */}
      {/* <TileNew.MoreOptions>
          {[
            <MenuItem key={1} onClick={() => {}}>
              Item 1
            </MenuItem>,
            <MenuItem key={2} onClick={() => {}}>
              Item 2
            </MenuItem>,
          ]}
        </TileNew.MoreOptions>
      </TileNew.ContentArea> */}
      {/* <TileNew.Buttons>
        {[
          <Button key={1} onClick={() => {}}>
            Manage
          </Button>,
          <Button key={2} onClick={() => {}}>
            Projects
          </Button>,
        ]}
      </TileNew.Buttons> */}
    </TileNew>
  );
};

export default App;
