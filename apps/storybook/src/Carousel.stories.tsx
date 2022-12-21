/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Carousel, CarouselProps, Text, Code } from '@itwin/itwinui-react';

export default {
  component: Carousel,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
  title: 'Core/Carousel',
  parameters: {
    docs: { source: { excludeDecorators: true } },
  },
} as Meta<CarouselProps>;

export const Basic: Story<CarouselProps> = (args) => {
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

  return (
    <Carousel style={{ width: 'min(800px, 90vw)' }} {...args}>
      <Carousel.Slider>
        {gradients.map(({ from, to }, index) => (
          <Carousel.Slide key={index}>
            <div
              style={{
                background: `linear-gradient(to right, ${from}, ${to})`,
                height: 350,
                width: '100%',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <div style={{ fontSize: 48, color: 'hsl(0deg 0% 100% / 0.7)' }}>
                {index + 1}
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel.Slider>
      <Carousel.Navigation />
    </Carousel>
  );
};

export const Controlled: Story<CarouselProps> = (args) => {
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
      {...args}
      style={{ width: 'min(800px, 90vw)' }}
      activeSlideIndex={currentIndex}
      onSlideChange={(index) => setCurrentIndex(index)}
    >
      <Carousel.Slider>
        {gradients.map(({ from, to }, index) => (
          <Carousel.Slide key={index}>
            <div
              style={{
                background: `linear-gradient(to right, ${from}, ${to})`,
                height: 350,
                width: '100%',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <div style={{ fontSize: 48, color: 'hsl(0deg 0% 100% / 0.7)' }}>
                {index + 1}
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel.Slider>
      <Carousel.Navigation />
    </Carousel>
  );
};
Controlled.args = {};
Controlled.argTypes = {
  activeSlideIndex: { control: { disable: true } },
};

const useId = () => 'my-custom-carousel';
export const OnlyDots: Story<CarouselProps> = () => {
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

  const id = useId();
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
      style={{ display: 'inline-grid', width: 'min(90vw, 40vh)' }}
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
            role='tabpanel'
            id={`${id}-slide-${index}`}
            onClick={({ currentTarget: { clientWidth }, clientX }) => {
              const diff = clientWidth - clientX > clientWidth / 2 ? -1 : +1;
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
                height: 'min(600px, 70vh)',
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
        style={{ justifySelf: 'center', maxWidth: 'min(100%, 200px)' }}
      />
    </section>
  );
};
OnlyDots.args = {};
OnlyDots.parameters = { controls: { hideNoControlsWarning: true } };
OnlyDots.argTypes = { activeSlideIndex: { control: { disable: true } } };
OnlyDots.decorators = [
  (Story) => (
    <div style={{ display: 'inline-grid', gap: '1rem' }}>
      <Text isMuted style={{ fontStyle: 'italic' }}>
        This example shows how <Code>Carousel.DotsList</Code> can be used
        outside <Code>Carousel</Code>.
        <br />
        Clicking on the right half of the slide will advance the carousel to the
        next slide, whereas clicking on the left half will go to the previous
        slide.
      </Text>
      <Story />
    </div>
  ),
];
