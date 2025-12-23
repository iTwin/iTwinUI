/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Root as SkRoot } from '@stratakit/foundations';

export const ThemeBridge = () => {
  const themeBridgeEnabled = useThemeBridge();

  if (!themeBridgeEnabled) {
    return null;
  }

  // TODO: Synchronize colorScheme here instead of hardcoding 'dark'
  return <SkRoot colorScheme='dark' />;
};

function useThemeBridge() {
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const updateState = (event: CustomEvent) => {
      setEnabled(event.detail);
    };

    // This theme-bridge event gets emitted by <theme-button>
    window.addEventListener('theme-bridge', updateState);

    return () => {
      window.removeEventListener('theme-bridge', updateState);
    };
  }, []);

  return enabled;
}
