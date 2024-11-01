/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { SkipToContentLink, Text, Kbd, Anchor } from '@itwin/itwinui-react';

export default () => {
  return (
    <>
      <SkipToContentLink href='http://localhost:1700/docs/skiptocontentlink#props' />
      <Text as='p'>
        This is not the main content. Press&nbsp;
        <Kbd>tab</Kbd>&nbsp;to see skip-to-content-link component. You might
        need to click on the top of the page or the URL first. Press&nbsp;
        <Kbd>&crarr;</Kbd>
        &nbsp;after focusing on skip-to-content-link to skip to the main content
        below. <Anchor href='#'>This link will be skipped.</Anchor> <br />
      </Text>
      <div
        style={{
          border: 'solid 1px var(--iui-color-border)',
          height: 300,
          marginTop: 10,
          padding: 12,
        }}
        tabIndex={0}
        id='main-content'
      >
        <Text as='p'>
          This is the main content. Focus will be directed here from the
          skip-to-content-link component.&nbsp;
          <Anchor href='#'>Tab again to focus on this link.</Anchor>
          &nbsp;
        </Text>
      </div>
    </>
  );
};
