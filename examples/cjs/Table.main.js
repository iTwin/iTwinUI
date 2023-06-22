'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var generateItem = React.useCallback(function (index, parentRow, depth) {
    if (parentRow === void 0) {
      parentRow = '';
    }
    if (depth === void 0) {
      depth = 0;
    }
    var keyValue = parentRow
      ? ''.concat(parentRow, '.').concat(index + 1)
      : ''.concat(index + 1);
    var rating = Math.round(Math.random() * 5);
    return {
      product: 'Product '.concat(keyValue),
      price: ((index % 10) + 1) * 15,
      quantity: ((index % 10) + 1) * 150,
      rating: rating,
      status: rating >= 4 ? 'positive' : rating === 3 ? 'warning' : 'negative',
      subRows:
        depth < 1
          ? Array(Math.round(index % 2))
              .fill(null)
              .map(function (_, index) {
                return generateItem(index, keyValue, depth + 1);
              })
          : [],
    };
  }, []);
  var data = React.useMemo(
    function () {
      return Array(3)
        .fill(null)
        .map(function (_, index) {
          return generateItem(index);
        });
    },
    [generateItem],
  );
  var columns = React.useMemo(function () {
    return [
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
        width: '40%',
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
        Cell: function (props) {
          return <>${props.value}</>;
        },
      },
      {
        id: 'rating',
        Header: 'Rating',
        accessor: 'rating',
        cellRenderer: function (props) {
          return (
            <itwinui_react_1.DefaultCell
              {...props}
              status={props.cellProps.row.original.status}
            >
              {props.cellProps.row.original.rating}/5
            </itwinui_react_1.DefaultCell>
          );
        },
      },
    ];
  }, []);
  var rowProps = React.useCallback(function (row) {
    return {
      status: row.original.status,
    };
  }, []);
  return (
    <div style={{ minWidth: 'min(100%, 350px)' }}>
      <itwinui_react_1.Table
        columns={columns}
        emptyTableContent='No data.'
        data={data}
        rowProps={rowProps}
        density='condensed'
      />
    </div>
  );
};
