/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { SkipToContentLink, Text, Kbd, Anchor } from '@itwin/itwinui-react';

export default {
  title: 'SkipToContentLink',
};

export const Basic = () => {
  return (
    <>
      <SkipToContentLink href='#main-content' />
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
          border: 'solid 1px var(--iui-color-background-border)',
          height: 1000,
          padding: 12,
        }}
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

export const CustomText = () => {
  return (
    <>
      <SkipToContentLink href='#main-content'>
        Skip to main content (translated)
      </SkipToContentLink>
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
          border: 'solid 1px var(--iui-color-background-border)',
          height: 1000,
          padding: 12,
        }}
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
