import * as React from 'react';
import { Tile, ProgressRadial, MenuItem, Divider } from '@itwin/itwinui-react';

export default function App() {
  const defaultContent = 'Naaaaaaaaaammmmmmmeeeeeee';

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, auto)',
        alignItems: 'flex-start',
        gap: '16px',
      }}
    >
      <TileExamples content={defaultContent} />
      <TileExamples content={defaultContent + 'e'} />

      <Divider style={{ gridColumn: '1 / -1' }} />

      <TileExamples content={defaultContent} shouldTruncateOrWrap='wrap' />
      <TileExamples
        content={defaultContent + 'e'}
        shouldTruncateOrWrap='wrap'
      />
      <TileExamples
        content={defaultContent + 'eeeeee abcde'}
        shouldTruncateOrWrap='wrap'
      />
    </div>
  );
}

function TileExamples(props: {
  content: string;
  shouldTruncateOrWrap?: 'truncate' | 'wrap';
}) {
  const { content, shouldTruncateOrWrap } = props;

  return (
    <>
      <Tile.Wrapper>
        <Tile.Name name={content} shouldTruncateOrWrap={shouldTruncateOrWrap} />
        <Tile.ThumbnailArea>
          <ProgressRadial />
        </Tile.ThumbnailArea>
        <Tile.ContentArea>
          <Tile.MoreOptions>
            <MenuItem key={1}>Item 1</MenuItem>
            <MenuItem key={2}>Item 2</MenuItem>
          </Tile.MoreOptions>
        </Tile.ContentArea>
      </Tile.Wrapper>

      <Tile.Wrapper>
        <Tile.Name shouldTruncateOrWrap={shouldTruncateOrWrap}>
          <Tile.NameLabel>{content}</Tile.NameLabel>
        </Tile.Name>
        <Tile.ThumbnailArea>
          <ProgressRadial />
        </Tile.ThumbnailArea>
        <Tile.ContentArea>
          <Tile.MoreOptions>
            <MenuItem key={1}>Item 1</MenuItem>
            <MenuItem key={2}>Item 2</MenuItem>
          </Tile.MoreOptions>
        </Tile.ContentArea>
      </Tile.Wrapper>

      <Tile.Wrapper>
        <Tile.Name shouldTruncateOrWrap={shouldTruncateOrWrap}>
          <Tile.NameLabel>
            <Tile.Action href='#'>{content}</Tile.Action>
          </Tile.NameLabel>
        </Tile.Name>
        <Tile.ThumbnailArea>
          <ProgressRadial />
        </Tile.ThumbnailArea>
        <Tile.ContentArea>
          <Tile.MoreOptions>
            <MenuItem key={1}>Item 1</MenuItem>
            <MenuItem key={2}>Item 2</MenuItem>
          </Tile.MoreOptions>
        </Tile.ContentArea>
      </Tile.Wrapper>
    </>
  );
}
