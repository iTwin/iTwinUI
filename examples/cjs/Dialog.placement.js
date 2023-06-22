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
        Open dialog
      </itwinui_react_1.Button>
      <itwinui_react_1.Dialog
        isOpen={isOpen}
        onClose={function () {
          return setIsOpen(false);
        }}
        closeOnEsc
        closeOnExternalClick
        preventDocumentScroll
        trapFocus
        setFocus
        isDismissible
        portal
        placement='top-left'
      >
        <itwinui_react_1.Dialog.Backdrop />
        <itwinui_react_1.Dialog.Main>
          <itwinui_react_1.Dialog.TitleBar titleText='Dialog' />
          <itwinui_react_1.Dialog.Content></itwinui_react_1.Dialog.Content>
          <itwinui_react_1.Dialog.ButtonBar>
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
          </itwinui_react_1.Dialog.ButtonBar>
        </itwinui_react_1.Dialog.Main>
      </itwinui_react_1.Dialog>
    </>
  );
};
