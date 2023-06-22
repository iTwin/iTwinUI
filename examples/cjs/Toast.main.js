'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var toaster = (0, itwinui_react_1.useToaster)();
  return (
    <itwinui_react_1.Button
      onClick={function () {
        toaster.setSettings({
          placement: 'bottom-end',
          order: 'ascending',
        });
        toaster.positive('Job processing completed.', {
          hasCloseButton: true,
          link: {
            onClick: function () {},
            title: 'View the report',
          },
        });
      }}
    >
      Open toast
    </itwinui_react_1.Button>
  );
};
