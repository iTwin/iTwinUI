/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Textarea } from '@itwin/itwinui-react';
export default () => {
  const [value, setValue] = React.useState(
    'If the area is shrunk to a size smaller than the amount of text within, a scrollbar appears to keep navigation possible. This behavior is especially important for textarea without a resizing handle, to avoid making text editing tedious.',
  );
  return React.createElement(Textarea, {
    id: 'text-area',
    value: value,
    onChange: (event) => setValue(event.target.value),
    style: { width: '70%' },
  });
};
