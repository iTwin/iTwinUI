/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Checkbox, InputGroup } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    InputGroup,
    { label: 'What are your hobbies?' },
    React.createElement(Checkbox, { label: 'Sports', defaultChecked: true }),
    React.createElement(Checkbox, { label: 'Writing' }),
    React.createElement(Checkbox, { label: 'Cooking' }),
    React.createElement(Checkbox, { label: 'Arts and crafts' }),
  );
};
