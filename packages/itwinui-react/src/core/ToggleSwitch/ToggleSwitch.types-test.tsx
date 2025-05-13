/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { ToggleSwitch } from './ToggleSwitch.js';
import * as React from 'react';

() => {
  return (
    <>
      <ToggleSwitch wrapperProps={{} as React.ComponentProps<'div'>} />
      <ToggleSwitch
        label='label'
        wrapperProps={{} as React.ComponentProps<'label'>}
      />

      {/* @ts-expect-error: wrapper is a <label> when label is provided */}
      <ToggleSwitch
        label='label'
        wrapperProps={{} as React.ComponentProps<'div'>}
      />
      {/* @ts-expect-error: wrapper is a <div> when label is not provided */}
      <ToggleSwitch wrapperProps={{} as React.ComponentProps<'label'>} />
    </>
  );
};
