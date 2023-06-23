/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  ExpandableBlock,
  Label,
  Input,
  InputGroup,
  Radio,
} from '@itwin/itwinui-react';
export default () => {
  const nameSection = React.createElement(
    React.Fragment,
    null,
    React.createElement(Label, { htmlFor: 'name', required: true }, 'Name'),
    React.createElement(Input, {
      id: 'name',
      key: 'name',
      placeholder: 'Enter name',
    }),
    React.createElement(Label, { htmlFor: 'occupation' }, 'Occupation'),
    React.createElement(Input, {
      id: 'occupation',
      key: 'occupation',
      placeholder: 'Enter occupation',
    }),
  );
  const colorSection = React.createElement(
    InputGroup,
    { key: 'color', label: 'Choose your favorite color', required: true },
    React.createElement(Radio, { name: 'color', value: 'Red', label: 'Red' }),
    React.createElement(Radio, {
      name: 'color',
      value: 'Orange',
      label: 'Orange',
    }),
    React.createElement(Radio, {
      name: 'color',
      value: 'Yellow',
      label: 'Yellow',
    }),
    React.createElement(Radio, {
      name: 'color',
      value: 'Green',
      label: 'Green',
    }),
    React.createElement(Radio, { name: 'color', value: 'Blue', label: 'Blue' }),
    React.createElement(Radio, {
      name: 'color',
      value: 'Purple',
      label: 'Purple',
    }),
  );
  const reasonSection = React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Label,
      { htmlFor: 'explanation', required: true },
      'Why is this your favorite color',
    ),
    React.createElement(Input, {
      id: 'explanation',
      key: 'explanation',
      placeholder: 'Enter text here...',
    }),
  );
  return React.createElement(
    'div',
    { style: { width: 'min(100%, 300px)' } },
    React.createElement(ExpandableBlock, { title: 'Name' }, nameSection),
    React.createElement(
      ExpandableBlock,
      { title: 'Favorite Color' },
      colorSection,
    ),
    React.createElement(ExpandableBlock, { title: 'Reasoning' }, reasonSection),
  );
};
