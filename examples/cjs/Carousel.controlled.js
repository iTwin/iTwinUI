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
  var _a = React.useState(5),
    currentIndex = _a[0],
    setCurrentIndex = _a[1];
  return (
    <itwinui_react_1.Carousel
      style={{ maxWidth: '100%' }}
      activeSlideIndex={currentIndex}
      onSlideChange={function (index) {
        return setCurrentIndex(index);
      }}
    >
      <itwinui_react_1.Carousel.Slider>
        {gradients.map(function (_a, index) {
          var from = _a.from,
            to = _a.to;
          return (
            <itwinui_react_1.Carousel.Slide key={index}>
              <div
                style={{
                  background: 'linear-gradient(to right, '
                    .concat(from, ', ')
                    .concat(to, ')'),
                  height: '200px',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <div style={{ fontSize: 48, color: 'hsl(0deg 0% 100% / 0.7)' }}>
                  {index + 1}
                </div>
              </div>
            </itwinui_react_1.Carousel.Slide>
          );
        })}
      </itwinui_react_1.Carousel.Slider>
      <itwinui_react_1.Carousel.Navigation />
    </itwinui_react_1.Carousel>
  );
};
