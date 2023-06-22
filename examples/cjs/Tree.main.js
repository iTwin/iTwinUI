'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
var itwinui_icons_react_1 = require('@itwin/itwinui-icons-react');
exports['default'] = function () {
  var _a = React.useState({
      'Node-2': true,
      'Node-2-1': true,
      'Node-3': true,
    }),
    expandedNodes = _a[0],
    setExpandedNodes = _a[1];
  var onNodeExpanded = React.useCallback(function (nodeId, isExpanded) {
    if (isExpanded) {
      setExpandedNodes(function (oldExpanded) {
        var _a;
        return __assign(
          __assign({}, oldExpanded),
          ((_a = {}), (_a[nodeId] = true), _a),
        );
      });
    } else {
      setExpandedNodes(function (oldExpanded) {
        var _a;
        return __assign(
          __assign({}, oldExpanded),
          ((_a = {}), (_a[nodeId] = false), _a),
        );
      });
    }
  }, []);
  var generateItem = React.useCallback(function (index, parentNode, depth) {
    if (parentNode === void 0) {
      parentNode = '';
    }
    if (depth === void 0) {
      depth = 0;
    }
    var keyValue = parentNode
      ? ''.concat(parentNode, '-').concat(index)
      : ''.concat(index);
    return {
      id: 'Node-'.concat(keyValue),
      label: 'Node '.concat(keyValue),
      sublabel: 'Sublabel for Node '.concat(keyValue),
      subItems:
        depth < 10
          ? Array(Math.round(index % 5))
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
  var getNode = React.useCallback(
    function (node) {
      return {
        subNodes: node.subItems,
        nodeId: node.id,
        node: node,
        isExpanded: expandedNodes[node.id],
        hasSubNodes: node.subItems.length > 0,
      };
    },
    [expandedNodes],
  );
  return (
    <itwinui_react_1.Tree
      style={{ width: 'min(100%, 260px)' }}
      data={data}
      getNode={getNode}
      nodeRenderer={React.useCallback(
        function (_a) {
          var node = _a.node,
            rest = __rest(_a, ['node']);
          return (
            <itwinui_react_1.TreeNode
              label={node.label}
              sublabel={node.sublabel}
              onExpanded={onNodeExpanded}
              icon={<itwinui_icons_react_1.SvgPlaceholder />}
              {...rest}
            />
          );
        },
        [onNodeExpanded],
      )}
    />
  );
};
