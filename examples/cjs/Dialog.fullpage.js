'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var _a = React.useState(false),
    isOpen = _a[0],
    setIsOpen = _a[1];
  return (
    <>
      <itwinui_react_1.Button
        styleType='high-visibility'
        onClick={function () {
          return setIsOpen(true);
        }}
      >
        Open full page dialog
      </itwinui_react_1.Button>
      <itwinui_react_1.Modal
        isOpen={isOpen}
        title={'New message'}
        styleType='fullPage'
        onClose={function () {
          return setIsOpen(false);
        }}
      >
        <itwinui_react_1.ModalContent>
          <itwinui_react_1.LabeledInput label='Subject' />
          <itwinui_react_1.LabeledTextarea label='Message' />
        </itwinui_react_1.ModalContent>
        <itwinui_react_1.ModalButtonBar>
          <itwinui_react_1.Button
            styleType='high-visibility'
            onClick={function () {
              return setIsOpen(false);
            }}
          >
            Submit
          </itwinui_react_1.Button>
          <itwinui_react_1.Button
            onClick={function () {
              return setIsOpen(false);
            }}
          >
            Save draft
          </itwinui_react_1.Button>
        </itwinui_react_1.ModalButtonBar>
      </itwinui_react_1.Modal>
    </>
  );
};
