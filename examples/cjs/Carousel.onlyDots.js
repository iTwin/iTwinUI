'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var gradients = [
    { from: '#cc2b5e', to: '#753a88' },
    { from: '#00467f', to: '#a5cc82' },
    { from: '#2193b0', to: '#6dd5ed' },
    { from: '#ffe000', to: '#799f0c' },
    { from: '#e65c00', to: '#f9d423' },
    { from: '#1488cc', to: '#2b32b2' },
    { from: '#bbd2c5', to: '#536976' },
    { from: '#9796f0', to: '#fbc7d4' },
    { from: '#b79891', to: '#94716b' },
    { from: '#acb6e5', to: '#86fde8' },
  ];
  var id = 'my-custom-carousel';
  var _a = React.useState(0),
    current = _a[0],
    setCurrent = _a[1];
  return (
    <section
      aria-roledescription='carousel'
      tabIndex={0}
      onKeyUp={function (_a) {
        var key = _a.key;
        var diff = key === 'ArrowRight' ? 1 : key === 'ArrowLeft' ? -1 : 0;
        setCurrent(function (prev) {
          return (gradients.length + prev + diff) % gradients.length;
        });
      }}
      style={{ display: 'inline-grid', width: 'min(200px, 50vw)' }}
    >
      <ol
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'grid',
          grid: '[slide] 1fr / [slide] 1fr',
        }}
      >
        {gradients.map(function (_a, index) {
          var from = _a.from,
            to = _a.to;
          return (
            <li
              key={index}
              role='tabpanel'
              id={''.concat(id, '-slide-').concat(index)}
              onClick={function (_a) {
                var clientWidth = _a.currentTarget.clientWidth,
                  offsetX = _a.nativeEvent.offsetX;
                var diff = clientWidth - offsetX > clientWidth / 2 ? -1 : +1;
                setCurrent(function (prev) {
                  return (gradients.length + prev + diff) % gradients.length;
                });
              }}
              style={{
                gridArea: 'slide',
                opacity: current === index ? 1 : 0,
                pointerEvents: current === index ? 'auto' : 'none',
                transition: 'opacity 0.5s',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(to right, '
                    .concat(from, ', ')
                    .concat(to, ')'),
                  height: 'min(200px, 50vw)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 48,
                  color: 'hsl(0deg 0% 100% / 0.7)',
                }}
              >
                {index + 1}
              </div>
            </li>
          );
        })}
      </ol>
      <itwinui_react_1.Carousel.DotsList
        id={id}
        length={gradients.length}
        currentIndex={current}
        onSlideChange={function (_i) {
          return setCurrent(_i);
        }}
        style={{ justifySelf: 'center', maxWidth: 'min(200px, 50vw)' }}
      />
    </section>
  );
};
