/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Carousel } from '@itwin/itwinui-react';

export default () => {
  const gradients = [
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

  const [currentIndex, setCurrentIndex] = React.useState(5);

  return (
    <Carousel
      activeSlideIndex={currentIndex}
      onSlideChange={(index) => setCurrentIndex(index)}
      className='controlled-carousel'
    >
      <Carousel.Navigation />
      <Carousel.Slider>
        {gradients.map(({ from, to }, index) => (
          <Carousel.Slide key={index}>
            <div
              className='controlled-carousel-gradient'
              style={{
                background: `linear-gradient(to right, ${from}, ${to})`,
              }}
            >
              <div className='controlled-carousel-number'>{index + 1}</div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel.Slider>
    </Carousel>
  );
};
