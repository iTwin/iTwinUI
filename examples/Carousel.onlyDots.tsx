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

  const id = 'my-custom-carousel';
  const [current, setCurrent] = React.useState(0);

  return (
    <section
      aria-roledescription='carousel'
      tabIndex={0}
      onKeyUp={({ key }) => {
        const diff = key === 'ArrowRight' ? 1 : key === 'ArrowLeft' ? -1 : 0;
        setCurrent(
          (prev) => (gradients.length + prev + diff) % gradients.length,
        );
      }}
      style={{ display: 'inline-grid', width: 'min(200px, 50vw)' }}
    >
      <ol
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'grid',
          grid: `[slide] 1fr / [slide] 1fr`,
        }}
      >
        {gradients.map(({ from, to }, index) => (
          <li
            key={index}
            id={`${id}-slide-${index}`}
            onClick={({
              currentTarget: { clientWidth },
              nativeEvent: { offsetX },
            }) => {
              const diff = clientWidth - offsetX > clientWidth / 2 ? -1 : +1;
              setCurrent(
                (prev) => (gradients.length + prev + diff) % gradients.length,
              );
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
                background: `linear-gradient(to right, ${from}, ${to})`,
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
        ))}
      </ol>
      <Carousel.DotsList
        id={id}
        length={gradients.length}
        currentIndex={current}
        onSlideChange={(_i) => setCurrent(_i)}
        style={{ justifySelf: 'center', maxWidth: 'min(200px, 50vw)' }}
      />
    </section>
  );
};
