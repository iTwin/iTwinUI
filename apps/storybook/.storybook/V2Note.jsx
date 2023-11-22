import React from 'react';
import { Anchor } from '@itwin/itwinui-react';

export const V2Note = () => {
  return (
    <div
      style={{
        position: 'fixed',
        maxWidth: '60ch',
        borderRadius: 4,
        bottom: 16,
        right: 8,
        padding: 8,
        border: '1px solid',
        backgroundColor: 'var(--iui-color-background)',
      }}
      hidden={window.top?.location.pathname.includes('iframe')}
    >
      ⚠️ This is the storybook for iTwinUI-react v2.
      <br />
      For the latest version, please visit{' '}
      <Anchor href='https://itwin.github.io/iTwinUI'>
        itwin.github.io/iTwinUI
      </Anchor>
    </div>
  );
};

export default V2Note;
