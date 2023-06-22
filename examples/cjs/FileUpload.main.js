'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var _a = React.useState([]),
    files = _a[0],
    setFiles = _a[1];
  return (
    <itwinui_react_1.FileUpload
      onFileDropped={function (files) {
        setFiles(files);
      }}
    >
      <itwinui_react_1.FileUploadCard
        files={files}
        onFilesChange={function (files) {
          return setFiles(files);
        }}
      />
    </itwinui_react_1.FileUpload>
  );
};
