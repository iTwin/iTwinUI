import {
  Badge,
  Button,
  MenuItem,
  Tag,
  TagContainer,
  Tile,
} from '@itwin/itwinui-react';
import { SvgInfo, SvgStar, SvgTag } from '@itwin/itwinui-icons-react';

export default function TileTest() {
  return (
    <Tile.Wrapper isSelected data-testid='tile'>
      <Tile.Name>
        <Tile.NameIcon />
        <Tile.NameLabel>Stadium</Tile.NameLabel>
      </Tile.Name>
      <Tile.ThumbnailArea>
        <Tile.BadgeContainer>
          <Badge backgroundColor='skyblue'>Badge</Badge>
        </Tile.BadgeContainer>
        <Tile.ThumbnailPicture url='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
        <Tile.TypeIndicator>
          <Tile.IconButton>
            <SvgStar />
          </Tile.IconButton>
        </Tile.TypeIndicator>
        <Tile.QuickAction>
          <Tile.IconButton>
            <SvgInfo />
          </Tile.IconButton>
        </Tile.QuickAction>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>
          National stadium in Singapore. Features landscape details and a metro
          station. This is the largest sample iModel.
        </Tile.Description>
        <Tile.MoreOptions data-testid='tile-more-options'>
          <MenuItem onClick={() => console.log('clicked item 1')}>
            Item 1
          </MenuItem>
          <MenuItem onClick={() => console.log('clicked item 2')}>
            Item 2
          </MenuItem>
          <MenuItem
            onClick={() => console.log('clicked item 3')}
            subMenuItems={[
              <MenuItem onClick={() => console.log('clicked sub item 1')}>
                Sub Item 1
              </MenuItem>,
              <MenuItem
                onClick={() => console.log('clicked sub item 2')}
                subMenuItems={[
                  <MenuItem
                    onClick={() => console.log('clicked sub sub item 1')}
                  >
                    Sub Sub Item 1
                  </MenuItem>,
                  <MenuItem
                    onClick={() => console.log('clicked sub sub item 2')}
                  >
                    Sub Sub Item 2
                  </MenuItem>,
                ]}
              >
                Sub Item 2
              </MenuItem>,
            ]}
          >
            Item 3
          </MenuItem>
        </Tile.MoreOptions>
        <Tile.Metadata>
          <SvgTag />
          <TagContainer>
            <Tag variant='basic'>tag 1</Tag>
            <Tag variant='basic'>tag 2</Tag>
          </TagContainer>
        </Tile.Metadata>
      </Tile.ContentArea>
      <Tile.Buttons>
        <Button onClick={() => console.log('clicked left button')}>
          Manage
        </Button>
        <Button onClick={() => console.log('clicked right button')}>
          Projects
        </Button>
      </Tile.Buttons>
    </Tile.Wrapper>
  );
}
