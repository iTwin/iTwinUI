/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { SkipToContentLink, Text, Kbd, Anchor } from '@itwin/itwinui-react';

export default () => {
  return (
    <>
      <SkipToContentLink href='#props'>Go to Props</SkipToContentLink>
      <Text variant='body'>
        This is not the main content. Press&nbsp;
        <Kbd>tab</Kbd>&nbsp;to see skip-to-content-link component. You might
        need to click on the top of the page or the URL first. Press&nbsp;
        <Kbd>&crarr;</Kbd>
        &nbsp;after focusing on skip-to-content-link to skip to the Props
        section.
        <br />
      </Text>
    </>
  );
};
