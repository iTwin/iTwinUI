/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { addons, types } from '@storybook/addons';
import { IconButton, Icons } from '@storybook/components';
import { useGlobals } from '@storybook/api';

const ADDON_ID = 'storybook/hc-theme';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    type: types.TOOL,
    match: ({ viewMode }) => !!viewMode?.match(/^(story|docs)$/),
    render: () => {
      const [globals, updateGlobals] = useGlobals();

      const isHC = globals['hc'] || false;

      const toggleTheme = React.useCallback(
        () =>
          updateGlobals({
            ['hc']: !isHC,
          }),
        [isHC],
      );
      return (
        <IconButton
          onClick={toggleTheme}
          active={isHC}
          title='Toggle high contrast theme'
        >
          <Icons icon='contrast' />
        </IconButton>
      );
    },
  });
});
