/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Flex, SkipToContentLink, Text } from '@itwin/itwinui-react';

export default () => {
  return (
    <Flex flexDirection='column'>
      <SkipToContentLink href='#main-content' />
      <Text variant='headline'>Page Header</Text>

      <Flex.Item className='demo-section' id='introduction'>
        <Text variant='subheading'>Introduction</Text>
        <Text variant='body'>
          Some introduction text that explains what this page is about.
        </Text>
      </Flex.Item>
      <Flex.Item className='demo-section' id='main-content'>
        <Text variant='subheading'>Main Content</Text>
        <Text variant='body'>
          Some main content that the user is interested in, which should be
          focused on when the skip link is clicked.
        </Text>
      </Flex.Item>
      <Flex.Item className='demo-section' id='conclusion'>
        <Text variant='subheading'>Conclusion</Text>
        <Text variant='body'>
          Some conclusion text that summarizes what the user has learned from
          this page.
        </Text>
      </Flex.Item>
    </Flex>
  );
};
