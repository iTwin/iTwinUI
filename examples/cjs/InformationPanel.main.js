'use strict';
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var itwinui_react_1 = require('@itwin/itwinui-react');
var React = require('react');
exports['default'] = function () {
  var _a = React.useState(1),
    openRowIndex = _a[0],
    setOpenRowIndex = _a[1];
  return (
    <itwinui_react_1.InformationPanelWrapper>
      <itwinui_react_1.Table
        columns={[
          { id: 'name', Header: 'Name', accessor: 'name' },
          {
            Header: 'Details',
            Cell: function (_a) {
              var row = _a.row;
              return (
                <itwinui_react_1.Button
                  onClick={function () {
                    return setOpenRowIndex(row.index);
                  }}
                >
                  Details
                </itwinui_react_1.Button>
              );
            },
          },
        ]}
        data={__spreadArray([], Array(3).fill(null), true).map(function (
          _,
          index,
        ) {
          return {
            name: 'Row'.concat(index),
          };
        })}
        emptyTableContent='No data.'
        style={{ minWidth: '450px' }}
      />

      <itwinui_react_1.InformationPanel
        isOpen={openRowIndex != undefined && openRowIndex !== -1}
      >
        <itwinui_react_1.InformationPanelHeader
          onClose={function () {
            return setOpenRowIndex(-1);
          }}
        >
          <itwinui_react_1.Text variant='subheading'>
            Row{' '}
            {openRowIndex !== null && openRowIndex !== void 0
              ? openRowIndex
              : 0}
          </itwinui_react_1.Text>
        </itwinui_react_1.InformationPanelHeader>
        <itwinui_react_1.InformationPanelBody>
          <itwinui_react_1.InformationPanelContent displayStyle='inline'>
            <itwinui_react_1.Label htmlFor='name-input'>
              File name
            </itwinui_react_1.Label>
            <itwinui_react_1.Input
              size='small'
              id='name-input'
              value={'Row '.concat(
                openRowIndex !== null && openRowIndex !== void 0
                  ? openRowIndex
                  : 0,
              )}
              readOnly
            />

            <itwinui_react_1.Label htmlFor='author-input'>
              Author
            </itwinui_react_1.Label>
            <itwinui_react_1.Input
              size='small'
              id='author-input'
              defaultValue='DJ Terry'
              readOnly
            />

            <itwinui_react_1.Label htmlFor='year-input'>
              Year
            </itwinui_react_1.Label>
            <itwinui_react_1.Input
              size='small'
              id='year-input'
              defaultValue='2021'
              readOnly
            />
          </itwinui_react_1.InformationPanelContent>
        </itwinui_react_1.InformationPanelBody>
      </itwinui_react_1.InformationPanel>
    </itwinui_react_1.InformationPanelWrapper>
  );
};
