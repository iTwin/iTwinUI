/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { addons, types, useGlobals } from '@storybook/manager-api';
import { IconButton, Icons } from '@storybook/components';

const ADDON_ID = 'storybook/hc-theme';

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    type: types.TOOL,
    render: () => {
      const [globals, updateGlobals] = useGlobals();

      const isHC = globals['hc'] || false;

      const toggleTheme = React.useCallback(
        () => updateGlobals({ ['hc']: !isHC }),
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
