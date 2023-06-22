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
    <itwinui_react_1.RadioTileGroup style={{ width: 'min(100%, 350px)' }}>
      <itwinui_react_1.RadioTile
        label='Google Maps'
        icon={
          <svg aria-hidden='true' viewBox='0 0 24 24'>
            <path
              d='m12 0a7.98189 7.98189 0 0 0 -6.9688 11.906c.1079.192.221.381.3438.563l6.625 11.531 6.625-11.531c.102-.151.19-.311.281-.469l.063-.094a7.98217 7.98217 0 0 0 -6.969-11.906zm0 4a4 4 0 1 1 -4 4 4.00011 4.00011 0 0 1 4-4z'
              fill='#e74c3c'
            />
            <path
              d='m12 3a5 5 0 1 0 5 5 5 5 0 0 0 -5-5zm0 2a3 3 0 1 1 -3 3 2.99988 2.99988 0 0 1 3-3z'
              fill='#c0392b'
            />
          </svg>
        }
        name='map'
        value='Google Maps'
      />
      <itwinui_react_1.RadioTile
        label='Bentley Blue'
        icon={
          <svg aria-hidden='true' viewBox='0 0 24 24'>
            <path
              d='m12 0a8.12188 8.12188 0 0 0 -8.18182 7.95c0 1.8 1.235 4.65 3.55066 8.85 1.698 3 4.6311 7.2 4.6311 7.2s2.93308-4.35 4.63122-7.35c2.31571-4.2 3.55066-7.05 3.55066-8.85a8.09618 8.09618 0 0 0 -8.18188-7.8z'
              fill='#fff'
            />
            <path
              d='m12 1.10962a7.05246 7.05246 0 0 0 -7.0722 6.84038c0 1.88313 1.8238 5.43244 3.41275 8.31426 1.06435 1.88039 2.649 4.27827 3.64493 5.75084.99723-1.518 2.60183-4.00688 3.68-5.91171 1.58292-2.87099 3.40672-6.42031 3.40672-8.30339a6.98162 6.98162 0 0 0 -7.0722-6.69038zm.002 9.79947a3.27273 3.27273 0 1 1 3.27272-3.27273 3.27268 3.27268 0 0 1 -3.27272 3.27273z'
              fill='#6ab9ec'
            />
          </svg>
        }
        name='map'
        value='Bentley Blue'
        defaultChecked
      />
      <itwinui_react_1.RadioTile
        label='Bentley Green'
        icon={
          <svg aria-hidden='true' viewBox='0 0 24 24'>
            <path
              d='m12 0a8.12188 8.12188 0 0 0 -8.18182 7.95c0 1.8 1.235 4.65 3.55066 8.85 1.698 3 4.6311 7.2 4.6311 7.2s2.93308-4.35 4.63122-7.35c2.31571-4.2 3.55066-7.05 3.55066-8.85a8.09618 8.09618 0 0 0 -8.18188-7.8z'
              fill='#fff'
            />
            <path
              d='m12 1.10962a7.05246 7.05246 0 0 0 -7.0722 6.84038c0 1.88313 1.8238 5.43244 3.41275 8.31426 1.06435 1.88039 2.649 4.27827 3.64493 5.75084.99723-1.518 2.60183-4.00688 3.68-5.91171 1.58292-2.87099 3.40672-6.42031 3.40672-8.30339a6.98162 6.98162 0 0 0 -7.0722-6.69038zm.002 9.79947a3.27273 3.27273 0 1 1 3.27272-3.27273 3.27268 3.27268 0 0 1 -3.27272 3.27273z'
              fill='#b1c854'
            />
          </svg>
        }
        name='map'
        value='Bentley Green'
      />
      <itwinui_react_1.RadioTile
        label='Bentley Purple'
        icon={
          <svg aria-hidden='true' viewBox='0 0 24 24'>
            <path
              d='m12 0a8.12188 8.12188 0 0 0 -8.18182 7.95c0 1.8 1.235 4.65 3.55066 8.85 1.698 3 4.6311 7.2 4.6311 7.2s2.93308-4.35 4.63122-7.35c2.31571-4.2 3.55066-7.05 3.55066-8.85a8.09618 8.09618 0 0 0 -8.18188-7.8z'
              fill='#fff'
            />
            <path
              d='m12 1.10962a7.05246 7.05246 0 0 0 -7.0722 6.84038c0 1.88313 1.8238 5.43244 3.41275 8.31426 1.06435 1.88039 2.649 4.27827 3.64493 5.75084.99723-1.518 2.60183-4.00688 3.68-5.91171 1.58292-2.87099 3.40672-6.42031 3.40672-8.30339a6.98162 6.98162 0 0 0 -7.0722-6.69038zm.002 9.79947a3.27273 3.27273 0 1 1 3.27272-3.27273 3.27268 3.27268 0 0 1 -3.27272 3.27273z'
              fill='#A3779F'
            />
          </svg>
        }
        disabled
        name='map'
        value='Bentley Purple'
      />
    </itwinui_react_1.RadioTileGroup>
  );
};
