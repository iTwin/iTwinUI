/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs, Button, Tooltip, IconButton } from '@itwin/itwinui-react';
import { SvgMore } from '@itwin/itwinui-icons-react';

export default () => {
  const items = Array(10)
    .fill(null)
    .map((_, index) => <Button key={index}>Item {index}</Button>);

  return (
    <div style={{ maxWidth: '50%', border: '1px solid lightpink', padding: 8 }}>
      <Breadcrumbs
        overflowButton={(visibleCount: number) => {
          const previousBreadcrumb =
            visibleCount > 1 ? items.length - visibleCount : items.length - 2;
          return (
            <Tooltip content={`Item ${previousBreadcrumb}`} placement='bottom'>
              <IconButton
                onClick={() => {
                  // open previous breadcrumb
                }}
              >
                <SvgMore />
              </IconButton>
            </Tooltip>
          );
        }}
      >
        {items}
      </Breadcrumbs>
    </div>
  );
};
