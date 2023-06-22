'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var nameSection = (
    <>
      <itwinui_react_1.Label htmlFor='name' required>
        Name
      </itwinui_react_1.Label>
      <itwinui_react_1.Input id='name' key='name' placeholder='Enter name' />
      <itwinui_react_1.Label htmlFor='occupation'>
        Occupation
      </itwinui_react_1.Label>
      <itwinui_react_1.Input
        id='occupation'
        key='occupation'
        placeholder='Enter occupation'
      />
    </>
  );
  var colorSection = (
    <itwinui_react_1.InputGroup
      key='color'
      label='Choose your favorite color'
      required
    >
      <itwinui_react_1.Radio name='color' value='Red' label='Red' />
      <itwinui_react_1.Radio name='color' value='Orange' label='Orange' />
      <itwinui_react_1.Radio name='color' value='Yellow' label='Yellow' />
      <itwinui_react_1.Radio name='color' value='Green' label='Green' />
      <itwinui_react_1.Radio name='color' value='Blue' label='Blue' />
      <itwinui_react_1.Radio name='color' value='Purple' label='Purple' />
    </itwinui_react_1.InputGroup>
  );
  var reasonSection = (
    <>
      <itwinui_react_1.Label htmlFor='explanation' required>
        Why is this your favorite color
      </itwinui_react_1.Label>
      <itwinui_react_1.Input
        id='explanation'
        key='explanation'
        placeholder='Enter text here...'
      />
    </>
  );
  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <itwinui_react_1.ExpandableBlock title='Name'>
        {nameSection}
      </itwinui_react_1.ExpandableBlock>
      <itwinui_react_1.ExpandableBlock title='Favorite Color'>
        {colorSection}
      </itwinui_react_1.ExpandableBlock>
      <itwinui_react_1.ExpandableBlock title='Reasoning'>
        {reasonSection}
      </itwinui_react_1.ExpandableBlock>
    </div>
  );
};
