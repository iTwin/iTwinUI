/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { TagContainer, Tag } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    TagContainer,
    null,
    React.createElement(Tag, null, 'Tag 1'),
    React.createElement(Tag, { onRemove: () => {} }, 'Tag 2'),
    React.createElement(Tag, { onRemove: () => {} }, 'Tag 3'),
  );
};
