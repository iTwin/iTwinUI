/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { TagContainer, Tag } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    TagContainer,
    { overflow: 'scroll', background: 'filled', style: { maxWidth: '70%' } },
    React.createElement(Tag, { onRemove: () => {} }, 'Tag 1'),
    React.createElement(Tag, { onRemove: () => {} }, 'Tag 2'),
    React.createElement(Tag, { onRemove: () => {} }, 'Tag 3'),
    React.createElement(Tag, { onRemove: () => {} }, 'Medium tag 4'),
    React.createElement(Tag, { onRemove: () => {} }, 'Very long tag 5'),
    React.createElement(Tag, { onRemove: () => {} }, 'Tag 6'),
    React.createElement(Tag, { onRemove: () => {} }, 'Tag 7'),
    React.createElement(Tag, { onRemove: () => {} }, 'Long tag 8'),
    React.createElement(Tag, { onRemove: () => {} }, 'Tag 9'),
  );
};
