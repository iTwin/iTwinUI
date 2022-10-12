/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Slider } from './Slider';

const createBoundingClientRect = (
  left: number,
  top: number,
  right: number,
  bottom: number,
): DOMRect => ({
  left,
  top,
  right,
  bottom,
  width: right - left,
  height: bottom - top,
  x: left,
  y: top,
  toJSON: () => '',
});

/**
 * Setup default size for slider container to be used by all slider tests
 */
const getBoundingClientRectMock = jest.spyOn(
  HTMLElement.prototype,
  'getBoundingClientRect',
);
const sliderContainerHorizontalSize = createBoundingClientRect(10, 0, 1010, 60);
const sliderContainerVerticalSize = createBoundingClientRect(10, 0, 70, 1000);

beforeEach(() => {
  getBoundingClientRectMock.mockReturnValue(sliderContainerHorizontalSize);
});

afterAll(() => {
  jest.clearAllMocks();
});

const defaultSingleValue = [50];

const assertBaseElement = (container: HTMLElement) => {
  expect(
    container.querySelector('.iui-slider-component-container'),
  ).toBeTruthy();
  expect(container.querySelector('.iui-slider-container')).toBeTruthy();
  expect(container.querySelector('.iui-slider-rail')).toBeTruthy();
  expect(container.querySelector('.iui-slider-thumb')).toBeTruthy();
};

it('should render correctly in its most basic state', () => {
  const { container } = render(<Slider values={defaultSingleValue} />);
  assertBaseElement(container);
  expect(container.querySelector('.iui-slider-track')).toBeTruthy();
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.getAttribute('aria-disabled')).toEqual('false');
});

it('should not render thumbs if no values are defined', () => {
  const { container } = render(<Slider values={[]} />);
  expect(
    container.querySelector('.iui-slider-component-container'),
  ).toBeTruthy();
  expect(container.querySelector('.iui-slider-container')).toBeTruthy();
  expect(container.querySelector('.iui-slider-rail')).toBeTruthy();
  expect(container.querySelector('.iui-slider-thumb')).toBeFalsy();
});

it('should not render track if min and max are same value', () => {
  const { container } = render(<Slider values={[10]} min={20} max={20} />);
  const element = container.querySelector('.iui-slider-thumb') as HTMLElement;
  expect(element).toBeTruthy();
  expect(element.style.left).toBe('0%');
  expect(container.querySelector('.iui-slider-track')).toBeFalsy();
});

it('should not render track if value is below specified min/max', () => {
  const { container } = render(<Slider values={[10]} min={20} max={40} />);
  const element = container.querySelector('.iui-slider-thumb') as HTMLElement;
  expect(element).toBeTruthy();
  expect(element.style.left).toBe('0%');
  expect(container.querySelector('.iui-slider-track')).toBeFalsy();
});

it('should not render track if value is above specified min/max', () => {
  const { container } = render(<Slider values={[60]} min={20} max={40} />);
  expect(
    container.querySelector('.iui-slider-component-container'),
  ).toBeTruthy();
  const element = container.querySelector('.iui-slider-thumb') as HTMLElement;
  expect(element).toBeTruthy();
  expect(element.style.left).toBe('100%');
  expect(container.querySelector('.iui-slider-track')).toBeFalsy();
});

it('should render disabled component', () => {
  const { container } = render(<Slider values={defaultSingleValue} disabled />);
  assertBaseElement(container);
  expect(
    container.querySelector('.iui-slider-component-container.iui-disabled'),
  ).toBeTruthy();
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.getAttribute('aria-disabled')).toEqual('true');
});

it('should render min max labels by default', () => {
  const { container } = render(<Slider values={defaultSingleValue} />);
  assertBaseElement(container);
  expect(container.querySelector('.iui-slider-min')?.textContent).toBe('0');
  expect(container.querySelector('.iui-slider-max')?.textContent).toBe('100');
});

it('should render specified min max labels', () => {
  const { container } = render(
    <Slider values={defaultSingleValue} min={5} max={55} />,
  );
  assertBaseElement(container);
  expect(container.querySelector('.iui-slider-min')?.textContent).toBe('5');
  expect(container.querySelector('.iui-slider-max')?.textContent).toBe('55');
});

it('should render provided min max labels', () => {
  const { container } = render(
    <Slider values={defaultSingleValue} maxLabel='big' minLabel='small' />,
  );
  assertBaseElement(container);
  expect(container.querySelector('.iui-slider-min')?.textContent).toBe('small');
  expect(container.querySelector('.iui-slider-max')?.textContent).toBe('big');
});

it('should render provided min max label nodes', () => {
  const { container } = render(
    <Slider
      values={defaultSingleValue}
      maxLabel={<span className='span-max'>big</span>}
      minLabel={<span className='span-min'>small</span>}
    />,
  );
  assertBaseElement(container);
  expect(container.querySelector('.span-min')?.textContent).toBe('small');
  expect(container.querySelector('.span-max')?.textContent).toBe('big');
});

it('should set focus', () => {
  let element: HTMLDivElement | null = null;
  const onRef = (ref: HTMLDivElement) => {
    element = ref;
  };
  const { container } = render(
    <Slider ref={onRef} values={defaultSingleValue} setFocus />,
  );
  assertBaseElement(container);
  expect(element).toBeTruthy();
  expect(document.activeElement).toEqual(
    container.querySelector('.iui-slider-thumb'),
  );
});

it('should show tooltip when focused', () => {
  const { container } = render(<Slider values={defaultSingleValue} setFocus />);
  assertBaseElement(container);
  expect(document.activeElement).toEqual(
    container.querySelector('.iui-slider-thumb'),
  );
  expect(document.querySelector('.iui-tooltip')?.textContent).toBe('50');
});

it('should not show tooltip if visibility is overridden', () => {
  const { container } = render(
    <Slider
      values={defaultSingleValue}
      setFocus
      tooltipProps={() => {
        return { visible: false };
      }}
    />,
  );
  assertBaseElement(container);
  expect(document.activeElement).toEqual(
    container.querySelector('.iui-slider-thumb'),
  );
  expect(document.querySelector('.iui-tooltip')).toBeFalsy();
});

it('should show custom tooltip when focused', () => {
  const { container } = render(
    <Slider
      values={defaultSingleValue}
      setFocus
      tooltipProps={(index, val) => {
        return {
          content: `\$${val}.00`,
        };
      }}
    />,
  );
  assertBaseElement(container);
  expect(document.activeElement).toEqual(
    container.querySelector('.iui-slider-thumb'),
  );
  expect(document.querySelector('.iui-tooltip')?.textContent).toBe('$50.00');
});

it('should take class and style', () => {
  const { container } = render(
    <Slider
      values={defaultSingleValue}
      className='my-class'
      style={{ width: '350px' }}
    />,
  );
  const slider = container.querySelector(
    '.iui-slider-component-container.my-class',
  ) as HTMLDivElement;
  expect(slider).toBeTruthy();
  expect(slider.style.width).toBe('350px');
});

it('should take railContainerProps', () => {
  // common use case is when custom thumb is bigger than default and we must change left/right margin
  const railContainerProps = { style: { margin: '0 8px' } };
  const { container } = render(
    <Slider
      values={defaultSingleValue}
      railContainerProps={railContainerProps}
    />,
  );
  const railContainer = container.querySelector(
    '.iui-slider-container',
  ) as HTMLDivElement;
  expect(railContainer.style.marginLeft).toBe('8px');
  expect(railContainer.style.marginRight).toBe('8px');
});

it('should render tick marks', () => {
  const { container } = render(
    <Slider
      values={defaultSingleValue}
      tickLabels={['0', '25', '50', '75', '100']}
    />,
  );
  assertBaseElement(container);
  expect(container.querySelectorAll('.iui-slider-tick').length).toBe(5);
});

it('should render custom tick marks as defined by ReactNode.', () => {
  const { container } = render(
    <Slider
      values={defaultSingleValue}
      tickLabels={<span className='custom-tick-mark'>Custom</span>}
    />,
  );
  assertBaseElement(container);
  expect(container.querySelector('.custom-tick-mark')).toBeTruthy();
});

it('should render single track', () => {
  const { container } = render(<Slider values={defaultSingleValue} />);
  assertBaseElement(container);
  expect(container.querySelectorAll('.iui-slider-track').length).toBe(1);
});

it('should render odd tracks based on even number of values and `auto` trackDisplayMode', () => {
  const { container } = render(<Slider values={[10, 20, 30, 40]} />);
  assertBaseElement(container);
  // segments 10-20, 30-40
  expect(container.querySelectorAll('.iui-slider-track').length).toBe(2);
});

it('should render 3 `even-segments` 0-10,20-30,40-100', () => {
  const { container } = render(
    <Slider trackDisplayMode='even-segments' values={[10, 20, 30, 40]} />,
  );
  assertBaseElement(container);
  expect(container.querySelectorAll('.iui-slider-track').length).toBe(3);
});

it('should render 2 `odd-segments` 10-20, 30-40', () => {
  const { container } = render(
    <Slider trackDisplayMode='odd-segments' values={[10, 20, 30, 40]} />,
  );
  assertBaseElement(container);
  expect(container.querySelectorAll('.iui-slider-track').length).toBe(2);
});

it('should not render track', () => {
  const { container } = render(
    <Slider trackDisplayMode='none' values={defaultSingleValue} />,
  );
  assertBaseElement(container);
  expect(container.querySelectorAll('.iui-slider-track').length).toBe(0);
});

it('should activate thumb on pointerDown', () => {
  const { container } = render(<Slider values={defaultSingleValue} />);
  assertBaseElement(container);
  let thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.classList).not.toContain('iui-active');

  act(() => {
    fireEvent.pointerDown(thumb, {
      pointerId: 5,
      buttons: 1,
      clientX: 510,
    });
  });
  thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.classList).toContain('iui-active');
});

it('should process keystrokes when thumb has focus', () => {
  const handleOnUpdate = jest.fn();
  const handleOnChange = jest.fn();
  const { container } = render(
    <Slider
      values={[50]}
      step={5}
      setFocus
      onUpdate={handleOnUpdate}
      onChange={handleOnChange}
    />,
  );
  assertBaseElement(container);
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.classList).not.toContain('iui-active');

  expect(document.activeElement).toEqual(thumb);
  expect(thumb.getAttribute('aria-valuenow')).toEqual('50');

  act(() => {
    fireEvent.keyDown(thumb, { key: 'ArrowLeft' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('45');
  expect(handleOnUpdate).toHaveBeenCalledTimes(1);
  expect(handleOnChange).toHaveBeenCalledTimes(0);

  act(() => {
    fireEvent.keyDown(thumb, { key: 'ArrowDown' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('40');
  expect(handleOnUpdate).toHaveBeenCalledTimes(2);
  expect(handleOnChange).toHaveBeenCalledTimes(0);

  act(() => {
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
    fireEvent.keyUp(thumb, { key: 'ArrowRight' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('45');
  expect(handleOnUpdate).toHaveBeenCalledTimes(3);
  expect(handleOnChange).toHaveBeenCalledTimes(1); // onChange called only after all keys released

  act(() => {
    fireEvent.keyDown(thumb, { key: 'ArrowUp' });
    fireEvent.keyUp(thumb, { key: 'ArrowRight' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('50');
  expect(handleOnUpdate).toHaveBeenCalledTimes(4);
  expect(handleOnChange).toHaveBeenCalledTimes(2);

  act(() => {
    fireEvent.keyDown(thumb, { key: 'Home' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('0');
  expect(handleOnUpdate).toHaveBeenCalledTimes(5);
  expect(handleOnChange).toHaveBeenCalledTimes(2);

  act(() => {
    fireEvent.keyDown(thumb, { key: 'End' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('100');
  expect(document.activeElement).toEqual(thumb);
  expect(handleOnUpdate).toHaveBeenCalledTimes(6);
  expect(handleOnChange).toHaveBeenCalledTimes(2);

  act(() => {
    fireEvent.keyUp(thumb, { key: 'End' });
  });
  expect(handleOnUpdate).toHaveBeenCalledTimes(6); // onUpdate not called when key released
  expect(handleOnChange).toHaveBeenCalledTimes(3);
});

it('should limit keystrokes processing to adjacent points by default', () => {
  const { container } = render(<Slider values={[40, 80]} step={5} setFocus />);
  assertBaseElement(container);
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.classList).not.toContain('iui-active');

  expect(document.activeElement).toEqual(thumb);
  expect(thumb.getAttribute('aria-valuenow')).toEqual('40');

  act(() => {
    fireEvent.keyDown(thumb, { key: 'ArrowLeft' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('35');

  act(() => {
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('40');

  act(() => {
    fireEvent.keyDown(thumb, { key: 'Home' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('0');

  act(() => {
    fireEvent.keyDown(thumb, { key: 'End' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('75');
});

it('should limit keystrokes processing by min max when allow-crossing is set', () => {
  const handleOnChange = jest.fn();
  const { container } = render(
    <Slider
      values={[40, 80]}
      step={5}
      setFocus
      thumbMode='allow-crossing'
      onChange={handleOnChange}
    />,
  );
  assertBaseElement(container);
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.classList).not.toContain('iui-active');

  expect(document.activeElement).toEqual(thumb);
  expect(thumb.getAttribute('aria-valuenow')).toEqual('40');

  act(() => {
    fireEvent.keyDown(thumb, { key: 'ArrowLeft' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('35');

  act(() => {
    fireEvent.keyDown(thumb, { key: 'ArrowRight' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('40');

  act(() => {
    fireEvent.keyDown(thumb, { key: 'Home' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('0');

  act(() => {
    fireEvent.keyDown(thumb, { key: 'End' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('100');
  expect(handleOnChange).toHaveBeenCalledTimes(0);

  // triggering an update with same value should not trigger callback
  act(() => {
    fireEvent.keyDown(thumb, { key: 'End' });
  });
  expect(handleOnChange).toHaveBeenCalledTimes(0);

  act(() => {
    fireEvent.keyUp(thumb, { key: 'End' });
  });
  expect(handleOnChange).toHaveBeenCalledTimes(1); // onChange called only after all keys released
});

it('should not process keystrokes when slider is disabled', () => {
  const { container } = render(<Slider values={[50]} step={5} disabled />);
  assertBaseElement(container);
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb).toBeTruthy();
  expect(thumb.classList).not.toContain('iui-active');

  act(() => {
    fireEvent.keyDown(thumb, { key: 'ArrowLeft' });
  });
  expect(thumb.getAttribute('aria-valuenow')).toEqual('50');
});

it('should show tooltip on thumb hover', () => {
  const { container } = render(<Slider values={defaultSingleValue} />);
  assertBaseElement(container);
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.classList).not.toContain('iui-active');
  expect(document.querySelector('.iui-tooltip')).toBeFalsy();

  act(() => {
    fireEvent.mouseEnter(thumb);
  });
  expect(document.querySelector('.iui-tooltip')?.textContent).toBe('50');

  const tippy = document.querySelector('[data-tippy-root]') as HTMLElement;
  act(() => {
    fireEvent.mouseLeave(thumb);
  });
  expect(tippy).not.toBeVisible();
});

it('should show tooltip on thumb focus', () => {
  const { container } = render(<Slider values={defaultSingleValue} />);
  assertBaseElement(container);
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.classList).not.toContain('iui-active');
  expect(document.querySelector('.iui-tooltip')).toBeFalsy();

  act(() => {
    thumb.focus();
  });
  expect(
    (document.querySelector('.iui-tooltip') as HTMLDivElement).textContent,
  ).toBe('50');

  const tippy = document.querySelector('[data-tippy-root]') as HTMLElement;
  act(() => {
    thumb.blur();
  });
  expect(tippy).not.toBeVisible();
});

it('should apply thumb props', () => {
  const thumbProps = () => {
    return {
      className: 'thumb-test-class',
      style: { backgroundColor: 'red' },
    };
  };
  const { container } = render(
    <Slider values={defaultSingleValue} thumbProps={thumbProps} />,
  );
  assertBaseElement(container);
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.classList).toContain('thumb-test-class');
  expect(thumb.style.backgroundColor).toEqual('red');
});

it('should move thumb when pointer down on rail', () => {
  const handleOnChange = jest.fn();
  const handleOnUpdate = jest.fn();

  const { container } = render(
    <Slider
      values={defaultSingleValue}
      tickLabels={<span className='custom-tick-mark'>Custom</span>}
      onChange={handleOnChange}
      onUpdate={handleOnUpdate}
    />,
  );

  assertBaseElement(container);
  const sliderContainer = container.querySelector(
    '.iui-slider-container',
  ) as HTMLDivElement;
  expect(sliderContainer.getBoundingClientRect().left).toBe(10);
  expect(sliderContainer.getBoundingClientRect().right).toBe(1010);
  expect(sliderContainer.getBoundingClientRect().width).toBe(1000);

  /* fire a pointer down event 30% down the slider */
  act(() => {
    fireEvent.pointerDown(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientX: 310,
    });
  });

  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.getAttribute('aria-valuenow')).toEqual('30');

  expect(handleOnChange).toHaveBeenCalledWith([30]);
  expect(handleOnUpdate).toHaveBeenCalledWith([30]);
});

it('should move thumb when pointer down on rail (vertical)', () => {
  getBoundingClientRectMock.mockReturnValue(sliderContainerVerticalSize); // This is to make getBoundingClientRect() return the mocked vertical container dimensions

  const handleOnChange = jest.fn();
  const handleOnUpdate = jest.fn();

  const { container } = render(
    <Slider
      values={defaultSingleValue}
      tickLabels={<span className='custom-tick-mark'>Custom</span>}
      onChange={handleOnChange}
      onUpdate={handleOnUpdate}
      orientation='vertical'
    />,
  );

  assertBaseElement(container);
  const sliderContainer = container.querySelector(
    '.iui-slider-container',
  ) as HTMLDivElement;
  expect(sliderContainer.getBoundingClientRect().top).toBe(0);
  expect(sliderContainer.getBoundingClientRect().bottom).toBe(1000);
  expect(sliderContainer.getBoundingClientRect().height).toBe(1000);

  /* fire a pointer down event 30% down the slider */
  act(() => {
    fireEvent.pointerDown(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientY: 1000 - 300,
    });
  });

  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.getAttribute('aria-valuenow')).toEqual('30');

  expect(handleOnChange).toHaveBeenCalledWith([30]);
  expect(handleOnUpdate).toHaveBeenCalledWith([30]);
});

it('should move to closest step when pointer down on rail', () => {
  const { container } = render(
    <Slider
      min={0}
      max={1}
      values={[0.5]}
      step={0.25}
      tickLabels={<span className='custom-tick-mark'>Custom</span>}
    />,
  );

  assertBaseElement(container);
  const sliderContainer = container.querySelector(
    '.iui-slider-container',
  ) as HTMLDivElement;
  /* fire a pointer down event 30% down the slider
   * 0 - .25 - .5 - .75 - 1 so closet to .3 is .25
   */
  act(() => {
    fireEvent.pointerDown(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientX: 310,
    });
  });

  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.getAttribute('aria-valuenow')).toEqual('0.25');
});

it('should move to closest step when pointer down on rail (vertical)', () => {
  getBoundingClientRectMock.mockReturnValue(sliderContainerVerticalSize);

  const { container } = render(
    <Slider
      min={0}
      max={1}
      values={[0.5]}
      step={0.25}
      tickLabels={<span className='custom-tick-mark'>Custom</span>}
      orientation='vertical'
    />,
  );

  assertBaseElement(container);
  const sliderContainer = container.querySelector(
    '.iui-slider-container',
  ) as HTMLDivElement;
  /* fire a pointer down event 30% down the slider
   * 0 - .25 - .5 - .75 - 1 so closet to .3 is .25
   */
  act(() => {
    fireEvent.pointerDown(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientY: 1000 - 300,
    });
  });

  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.getAttribute('aria-valuenow')).toEqual('0.25');
});

it('should move closest thumb when pointer down on rail', () => {
  const { container } = render(
    <Slider
      values={[10, 80]}
      tickLabels={<span className='custom-tick-mark'>Custom</span>}
    />,
  );

  assertBaseElement(container);
  const sliderContainer = container.querySelector(
    '.iui-slider-container',
  ) as HTMLDivElement;
  /* fire a pointer down event 70% down the the slider */
  act(() => {
    fireEvent.pointerDown(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientX: 710,
    });
  });

  const thumbs = container.querySelectorAll('.iui-slider-thumb');
  expect(thumbs.length).toBe(2);
  expect(thumbs[0].getAttribute('aria-valuenow')).toEqual('10');
  expect(thumbs[1].getAttribute('aria-valuenow')).toEqual('70');
});

it('should move closest thumb when pointer down on rail (vertical)', () => {
  getBoundingClientRectMock.mockReturnValue(sliderContainerVerticalSize);

  const { container } = render(
    <Slider
      values={[10, 80]}
      tickLabels={<span className='custom-tick-mark'>Custom</span>}
      orientation='vertical'
    />,
  );

  assertBaseElement(container);
  const sliderContainer = container.querySelector(
    '.iui-slider-container',
  ) as HTMLDivElement;
  /* fire a pointer down event 70% down the the slider */
  act(() => {
    fireEvent.pointerDown(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientY: 1000 - 700,
    });
  });

  const thumbs = container.querySelectorAll('.iui-slider-thumb');
  expect(thumbs.length).toBe(2);
  expect(thumbs[0].getAttribute('aria-valuenow')).toEqual('10');
  expect(thumbs[1].getAttribute('aria-valuenow')).toEqual('70');
});

it('should activate thumb on pointerDown and move to closest step on move', () => {
  const handleOnUpdate = jest.fn();
  const handleOnChange = jest.fn();

  const { container } = render(
    <Slider
      min={0}
      max={100}
      values={[20, 80]}
      step={1}
      tickLabels={<span className='custom-tick-mark'>Custom</span>}
      onUpdate={handleOnUpdate}
      onChange={handleOnChange}
    />,
  );

  assertBaseElement(container);
  const sliderContainer = container.querySelector(
    '.iui-slider-container',
  ) as HTMLDivElement;
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.classList).not.toContain('iui-active');

  act(() => {
    fireEvent.pointerDown(thumb, {
      pointerId: 5,
      buttons: 1,
      clientX: 210,
    });
  });
  expect(thumb.classList).toContain('iui-active');

  // moving to same location should not trigger update
  act(() => {
    fireEvent.pointerMove(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientX: 210,
    });
  });

  /* move thumb to 40 value on slider */
  act(() => {
    fireEvent.pointerMove(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientX: 410,
    });
  });
  expect(handleOnUpdate).toHaveBeenCalledTimes(1);

  act(() => {
    fireEvent.pointerUp(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientX: 410,
    });
  });

  expect(handleOnChange).toHaveBeenCalledTimes(1);

  const thumbs = container.querySelectorAll('.iui-slider-thumb');
  expect(thumbs.length).toBe(2);
  expect(thumbs[0].getAttribute('aria-valuenow')).toEqual('40');
  expect(thumbs[1].getAttribute('aria-valuenow')).toEqual('80');
});

it('should activate thumb on pointerDown and move to closest step on move (vertical)', () => {
  getBoundingClientRectMock.mockReturnValue(sliderContainerVerticalSize);

  const handleOnUpdate = jest.fn();
  const handleOnChange = jest.fn();

  const { container } = render(
    <Slider
      min={0}
      max={100}
      values={[20, 80]}
      step={1}
      tickLabels={<span className='custom-tick-mark'>Custom</span>}
      onUpdate={handleOnUpdate}
      onChange={handleOnChange}
      orientation='vertical'
    />,
  );

  assertBaseElement(container);
  const sliderContainer = container.querySelector(
    '.iui-slider-container',
  ) as HTMLDivElement;
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb.classList).not.toContain('iui-active');

  act(() => {
    fireEvent.pointerDown(thumb, {
      pointerId: 5,
      buttons: 1,
      clientY: 1000 - 200,
    });
  });
  expect(thumb.classList).toContain('iui-active');

  // moving to same location should not trigger update
  act(() => {
    fireEvent.pointerMove(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientY: 1000 - 200,
    });
  });

  /* move thumb to 40 value on slider */
  act(() => {
    fireEvent.pointerMove(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientY: 1000 - 400,
    });
  });
  expect(handleOnUpdate).toHaveBeenCalledTimes(1);

  act(() => {
    fireEvent.pointerUp(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientY: 1000 - 400,
    });
  });

  expect(handleOnChange).toHaveBeenCalledTimes(1);

  const thumbs = container.querySelectorAll('.iui-slider-thumb');
  expect(thumbs.length).toBe(2);
  expect(thumbs[0].getAttribute('aria-valuenow')).toEqual('40');
  expect(thumbs[1].getAttribute('aria-valuenow')).toEqual('80');
});

it('should activate thumb on pointerDown and move to closest step on move/ no update handler', () => {
  const { container } = render(
    <Slider
      min={0}
      max={100}
      values={[20, 80]}
      step={1}
      tickLabels={<span className='custom-tick-mark'>Custom</span>}
    />,
  );

  assertBaseElement(container);
  const sliderContainer = container.querySelector(
    '.iui-slider-container',
  ) as HTMLDivElement;
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb).toBeTruthy();
  expect(thumb.classList).not.toContain('iui-active');

  act(() => {
    fireEvent.pointerDown(thumb, {
      pointerId: 5,
      buttons: 1,
      clientX: 210,
    });
  });
  expect(thumb.classList).toContain('iui-active');
  expect(sliderContainer.classList).toContain('iui-grabbing');

  // moving to same location should not trigger update
  act(() => {
    fireEvent.pointerMove(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientX: 210,
    });
  });

  /* move thumb to 40 value on slider */
  act(() => {
    fireEvent.pointerMove(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientX: 410,
    });
  });

  act(() => {
    fireEvent.pointerUp(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientX: 410,
    });
  });

  const thumbs = container.querySelectorAll('.iui-slider-thumb');
  expect(thumbs.length).toBe(2);
  expect(thumbs[0].getAttribute('aria-valuenow')).toEqual('40');
  expect(thumbs[1].getAttribute('aria-valuenow')).toEqual('80');
});

it('should activate thumb on pointerDown and move to closest step on move/ no update handler (vertical)', () => {
  getBoundingClientRectMock.mockReturnValue(sliderContainerVerticalSize);

  const { container } = render(
    <Slider
      min={0}
      max={100}
      values={[20, 80]}
      step={1}
      tickLabels={<span className='custom-tick-mark'>Custom</span>}
      orientation='vertical'
    />,
  );

  assertBaseElement(container);
  const sliderContainer = container.querySelector(
    '.iui-slider-container',
  ) as HTMLDivElement;
  const thumb = container.querySelector('.iui-slider-thumb') as HTMLDivElement;
  expect(thumb).toBeTruthy();
  expect(thumb.classList).not.toContain('iui-active');

  act(() => {
    fireEvent.pointerDown(thumb, {
      pointerId: 5,
      buttons: 1,
      clientY: 1000 - 200,
    });
  });
  expect(thumb.classList).toContain('iui-active');
  expect(sliderContainer.classList).toContain('iui-grabbing');

  // moving to same location should not trigger update
  act(() => {
    fireEvent.pointerMove(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientY: 1000 - 200,
    });
  });

  /* move thumb to 40 value on slider */
  act(() => {
    fireEvent.pointerMove(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientY: 1000 - 400,
    });
  });

  act(() => {
    fireEvent.pointerUp(sliderContainer, {
      pointerId: 5,
      buttons: 1,
      clientY: 1000 - 400,
    });
  });

  const thumbs = container.querySelectorAll('.iui-slider-thumb');
  expect(thumbs.length).toBe(2);
  expect(thumbs[0].getAttribute('aria-valuenow')).toEqual('40');
  expect(thumbs[1].getAttribute('aria-valuenow')).toEqual('80');
});
