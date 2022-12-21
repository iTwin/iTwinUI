/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import addons from '@storybook/addons';

// Rename "Story" tab to "Code"
setTimeout(() => {
  const storySourceId = 'storybook/source-loader/panel';
  const storyTab = addons.getElements('panel')?.[storySourceId];
  if (storyTab) {
    storyTab.title = 'Code';
  }
});
