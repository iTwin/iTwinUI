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
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <itwinui_react_1.Button
          styleType='high-visibility'
          onClick={function () {
            return setIsOpen(true);
          }}
        >
          Open modal dialog
        </itwinui_react_1.Button>
      </div>

      <itwinui_react_1.Modal
        isOpen={isOpen}
        title={'Modal'}
        onClose={function () {
          return setIsOpen(false);
        }}
      >
        <itwinui_react_1.ModalContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </itwinui_react_1.ModalContent>
        <itwinui_react_1.ModalButtonBar>
          <itwinui_react_1.Button
            styleType='high-visibility'
            onClick={function () {
              return setIsOpen(false);
            }}
          >
            Primary
          </itwinui_react_1.Button>
          <itwinui_react_1.Button
            onClick={function () {
              return setIsOpen(false);
            }}
          >
            Secondary
          </itwinui_react_1.Button>
        </itwinui_react_1.ModalButtonBar>
      </itwinui_react_1.Modal>
    </>
  );
};
