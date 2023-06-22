'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
var itwinui_icons_react_1 = require('@itwin/itwinui-icons-react');
exports['default'] = function () {
  var items = React.useMemo(function () {
    return ['Root', 'My files', 'Documents', 'Status reports'];
  }, []);
  var _a = React.useState(items.length - 1),
    lastIndex = _a[0],
    setLastIndex = _a[1];
  var _b = React.useState(false),
    isEditing = _b[0],
    setIsEditing = _b[1];
  var breadcrumbItems = React.useMemo(
    function () {
      return items.slice(0, lastIndex + 1).map(function (item, index) {
        return (
          <itwinui_react_1.Button
            key={'Breadcrumb'.concat(index)}
            onClick={function () {
              if (lastIndex !== index) {
                setLastIndex(index);
              } else {
                setIsEditing(true);
              }
            }}
          >
            {item}
          </itwinui_react_1.Button>
        );
      });
    },
    [items, lastIndex],
  );
  return (
    <div
      style={{ display: 'inline-flex', width: 418, justifyContent: 'center' }}
    >
      <itwinui_react_1.DropdownButton
        startIcon={<itwinui_icons_react_1.SvgFolder aria-hidden />}
        styleType='borderless'
        menuItems={function (close) {
          return items.map(function (item, index) {
            return (
              <itwinui_react_1.MenuItem
                key={'Item'.concat(index)}
                onClick={function () {
                  setLastIndex(index);
                  setIsEditing(false);
                  close();
                }}
              >
                {item}
              </itwinui_react_1.MenuItem>
            );
          });
        }}
      />
      {isEditing ? (
        <itwinui_react_1.Input
          setFocus
          defaultValue={items.slice(0, lastIndex + 1).join('/')}
          onChange={function (_a) {
            var value = _a.target.value;
            var lastItem = value.substring(
              value.lastIndexOf('/', value.length - 2) + 1,
            );
            setLastIndex(
              items.findIndex(function (item) {
                return lastItem.includes(item);
              }),
            );
          }}
          onKeyDown={function (_a) {
            var key = _a.key;
            return key === 'Enter' && setIsEditing(false);
          }}
          onBlur={function () {
            return setIsEditing(false);
          }}
        />
      ) : (
        <itwinui_react_1.Breadcrumbs>
          {breadcrumbItems}
        </itwinui_react_1.Breadcrumbs>
      )}
    </div>
  );
};
