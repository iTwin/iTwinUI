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
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
var itwinui_icons_react_1 = require('@itwin/itwinui-icons-react');
exports['default'] = function () {
  var _a = React.useState([
      { name: 'Option 1', active: false },
      { name: 'Option 2', active: false },
      { name: 'Option 3', active: false },
      { name: 'Option 4', active: false },
      { name: 'Option 5', active: false },
      { name: 'Option 6', active: false },
    ]),
    optionData = _a[0],
    setOptionData = _a[1];
  var _b = React.useState([{ name: 'Option 7', active: false }]),
    appliedData = _b[0],
    setAppliedData = _b[1];
  var transfer = function (fromData, setFromData, setToData, sendAll) {
    setToData(function (oldToData) {
      var newToData = __spreadArray([], oldToData, true);
      var newFromData = [];
      fromData.forEach(function (item) {
        if (sendAll || item.active === true) {
          var newItem = item;
          newItem.active = false;
          newToData.push(newItem);
        } else {
          newFromData.push(item);
        }
      });
      setFromData(newFromData);
      return newToData;
    });
  };
  return (
    <itwinui_react_1.TransferList style={{ width: 500 }}>
      <itwinui_react_1.TransferList.ListboxWrapper>
        <itwinui_react_1.TransferList.Listbox>
          {optionData === null || optionData === void 0
            ? void 0
            : optionData.map(function (item, index) {
                return (
                  <itwinui_react_1.TransferList.Item
                    actionable
                    active={item.active}
                    onActiveChange={function (isActive) {
                      setOptionData(function (oldData) {
                        var newData = __spreadArray([], oldData, true);
                        var newObject = __assign({}, newData[index]);
                        newObject.active = isActive;
                        newData[index] = newObject;
                        return newData;
                      });
                    }}
                  >
                    {item.name}
                  </itwinui_react_1.TransferList.Item>
                );
              })}
        </itwinui_react_1.TransferList.Listbox>
      </itwinui_react_1.TransferList.ListboxWrapper>
      <itwinui_react_1.TransferList.Toolbar>
        <itwinui_react_1.IconButton
          styleType={'borderless'}
          label={'Move Right All'}
          onClick={function () {
            transfer(optionData, setOptionData, setAppliedData, true);
          }}
        >
          <itwinui_icons_react_1.SvgChevronRightDouble />
        </itwinui_react_1.IconButton>
        <itwinui_react_1.IconButton
          styleType={'borderless'}
          label={'Move Right'}
          onClick={function () {
            return transfer(optionData, setOptionData, setAppliedData, false);
          }}
        >
          <itwinui_icons_react_1.SvgChevronRight />
        </itwinui_react_1.IconButton>
        <itwinui_react_1.IconButton
          styleType={'borderless'}
          label={'Move Left'}
          onClick={function () {
            return transfer(appliedData, setAppliedData, setOptionData, false);
          }}
        >
          <itwinui_icons_react_1.SvgChevronLeft />
        </itwinui_react_1.IconButton>
        <itwinui_react_1.IconButton
          styleType={'borderless'}
          label={'Move Left All'}
          onClick={function () {
            return transfer(appliedData, setAppliedData, setOptionData, true);
          }}
        >
          <itwinui_icons_react_1.SvgChevronLeftDouble />
        </itwinui_react_1.IconButton>
      </itwinui_react_1.TransferList.Toolbar>
      <itwinui_react_1.TransferList.ListboxWrapper>
        <itwinui_react_1.TransferList.Listbox>
          {appliedData.map(function (item, index) {
            return (
              <itwinui_react_1.TransferList.Item
                actionable
                active={item.active}
                onActiveChange={function (isActive) {
                  setAppliedData(function (oldData) {
                    var newData = __spreadArray([], oldData, true);
                    var newObject = __assign({}, newData[index]);
                    newObject.active = isActive;
                    newData[index] = newObject;
                    return newData;
                  });
                }}
              >
                {item.name}
              </itwinui_react_1.TransferList.Item>
            );
          })}
        </itwinui_react_1.TransferList.Listbox>
      </itwinui_react_1.TransferList.ListboxWrapper>
    </itwinui_react_1.TransferList>
  );
};
