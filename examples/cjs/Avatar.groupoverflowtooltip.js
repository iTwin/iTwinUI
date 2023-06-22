'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var userNames = [
    'Terry Rivers',
    'Robin Mercer',
    'Morgan Vera',
    'Ashley Miles',
    'Jean Mullins',
    'Charlie Mayfield',
    'Peyton Pennington',
    'Justice Harrington',
    'Alex Gonzales',
    'Jordan Baker',
  ];
  /**
   * Ref is set on the last avatar for tooltip positioning.
   */
  var avatarRef = React.useRef(null);
  var maxIcons = 3;
  var arrayLength = maxIcons;
  var usersSubArray = userNames.slice(arrayLength);
  var tooltipContent = usersSubArray.join('\n');
  return (
    <>
      <itwinui_react_1.AvatarGroup
        iconSize='x-large'
        maxIcons={maxIcons}
        countIconProps={{ ref: avatarRef }}
      >
        {userNames.map(function (name, index) {
          return (
            <itwinui_react_1.Avatar
              key={''.concat(name, '-').concat(index)}
              abbreviation={name
                .split(' ')
                .map(function (token) {
                  return token[0];
                })
                .join('')}
              backgroundColor={(0, itwinui_react_1.getUserColor)(name)}
              title={name}
            />
          );
        })}
      </itwinui_react_1.AvatarGroup>
      <itwinui_react_1.Tooltip
        reference={avatarRef}
        content={tooltipContent}
        placement='right'
        style={{ whiteSpace: 'pre' }}
      />
    </>
  );
};
