import * as React from 'react';
import { LinkAction, LinkBox, Surface } from '@itwin/itwinui-react';

export default () => {
  return (
    <LinkBox>
      <Surface>
        <Surface.Header>
          <LinkAction href='https://www.example.com'>Stadium</LinkAction>
        </Surface.Header>
        <Surface.Body isPadded style={{ maxWidth: '40ch' }}>
          National stadium in Singapore. Features landscape details and a metro
          station.
        </Surface.Body>
      </Surface>
    </LinkBox>
  );
};
