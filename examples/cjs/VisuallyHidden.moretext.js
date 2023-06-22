'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  return (
    <ul>
      <li>
        Item 1{' '}
        <button>
          Delete{' '}
          <itwinui_react_1.VisuallyHidden>
            item 1
          </itwinui_react_1.VisuallyHidden>
        </button>
      </li>

      <li>
        Item 2{' '}
        <button>
          Delete{' '}
          <itwinui_react_1.VisuallyHidden>
            item 2
          </itwinui_react_1.VisuallyHidden>
        </button>
      </li>

      <li>
        Item 3{' '}
        <button>
          Delete{' '}
          <itwinui_react_1.VisuallyHidden>
            item 3
          </itwinui_react_1.VisuallyHidden>
        </button>
      </li>
    </ul>
  );
};
