/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Overlay, ProgressLinear, ProgressRadial } from '@itwin/itwinui-react';

const wrapperStyle = {
  border: '1px solid var(--iui-color-border)',
  position: 'relative',
  marginBottom: '12px',
  maxWidth: '600px',
  maxHeight: '400px',
} as React.CSSProperties;

export default () => {
  return (
    <Overlay.Wrapper style={wrapperStyle}>
      <Overlay.Message>
        <ProgressLinear indeterminate={true} />
      </Overlay.Message>
      <Overlay.HiddenContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Overlay.HiddenContent>
    </Overlay.Wrapper>
  );
};
