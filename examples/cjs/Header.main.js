'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var menuItems = function (close) {
    return [
      <itwinui_react_1.MenuItem key={1} value={'Item #1'} onClick={close}>
        Item #1
      </itwinui_react_1.MenuItem>,
      <itwinui_react_1.MenuItem key={2} value={'Item #2'} onClick={close}>
        Item #2
      </itwinui_react_1.MenuItem>,
      <itwinui_react_1.MenuItem key={3} value={'Item #3'} onClick={close}>
        Item #3
      </itwinui_react_1.MenuItem>,
    ];
  };
  return (
    <itwinui_react_1.Header
      appLogo={
        <itwinui_react_1.HeaderLogo
          logo={
            <svg viewBox='0 0 16 16' aria-hidden='true'>
              <path d='m12.6 13.4c-1.2-1.5-2.1-3.1-2.4-5.5-2.7 3.9-4.6 4.2-5.7 2.4l-1.2 5.7h-2.2l3.5-14.1 1.8-.4c-.1.5-1.4 6.2.6 7 2 .7 4.6-8.5 4.6-8.5l2.2.4c-1.6 3.7-1.6 7.6 1.1 10.9l-2.3 2.1' />
            </svg>
          }
        />
      }
      breadcrumbs={
        <itwinui_react_1.HeaderBreadcrumbs
          items={[
            <itwinui_react_1.HeaderButton
              key='project'
              name='Project A (Super Size Edition)'
              description='YJC-2249'
              onClick={function () {}}
              menuItems={menuItems}
            />,
            <itwinui_react_1.HeaderButton
              key='iModel'
              name='iModel B'
              startIcon={
                <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png' />
              }
              onClick={function () {}}
            />,
            <itwinui_react_1.HeaderButton
              key='version'
              name='Version C'
              menuItems={menuItems}
              isActive={true}
            />,
          ]}
        />
      }
      actions={[
        <itwinui_react_1.IconButton
          styleType='borderless'
          aria-label='View profile'
        >
          <itwinui_react_1.Avatar
            size='medium'
            abbreviation='TR'
            image={
              <img src='https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png' />
            }
            title='Terry Rivers'
          />
        </itwinui_react_1.IconButton>,
      ]}
    />
  );
};
