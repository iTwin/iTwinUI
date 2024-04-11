/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ColorSwatch } from './ColorSwatch.js';
import { ColorValue } from '../../utils/index.js';

it('should render in its most basic state with ColorValue', () => {
  const { container } = render(
    <ColorSwatch color={ColorValue.create('hsla(210, 11%, 65%, 1.00)')} />,
  );
  const swatch = container.querySelector('span.iui-color-swatch');
  expect(swatch).toBeTruthy();
  // required due to precision error going from hsl -> tbgr -> hsl
  expect(swatch).toHaveStyle({
    '--iui-color-swatch-background': 'hsla(210, 11.2%, 65.1%, 1)',
  });
});

it('should render in its most basic state with color string', () => {
  const { container } = render(<ColorSwatch color='#9BA5AF' />);

  const swatch = container.querySelector('.iui-color-swatch');
  expect(swatch).toBeTruthy();
  expect(swatch).toHaveStyle({ '--iui-color-swatch-background': '#9BA5AF' });
});

it('should render in its most basic state with transparent color', () => {
  const { container } = render(<ColorSwatch color='transparent' />);

  const swatch = container.querySelector('.iui-color-swatch');
  expect(swatch).toBeTruthy();
  expect(swatch).toHaveStyle({
    '--iui-color-swatch-background': 'transparent',
  });
});

it('should add className and style correctly', () => {
  const { container } = render(
    <ColorSwatch
      color={ColorValue.create('#9BA5AF')}
      className='test-class'
      style={{ width: '100px' }}
    />,
  );

  const swatch = container.querySelector(
    '.iui-color-swatch.test-class',
  ) as HTMLElement;
  expect(swatch).toBeTruthy();
  expect(swatch.style.width).toBe('100px');
});

it('should render active color swatch', () => {
  const { container } = render(
    <ColorSwatch color={ColorValue.create('#9BA5AF')} isActive={true} />,
  );

  const swatch = container.querySelector('.iui-color-swatch');
  expect(swatch?.classList).toContain('iui-active');
});

it('should set --iui-color-swatch-background', () => {
  const { container } = render(<ColorSwatch color={'#9BA5AF'} />);
  const swatch = container.querySelector('.iui-color-swatch') as HTMLElement;
  expect(swatch).toBeTruthy();
  expect(
    swatch.style.getPropertyValue('--iui-color-swatch-background'),
  ).toEqual('#9BA5AF');
});

it('should handle color swatch onClick', () => {
  const onColorClick = vi.fn();

  const { container } = render(
    <ColorSwatch color={ColorValue.create('#D4F4BD')} onClick={onColorClick} />,
  );

  const swatch = container.querySelector('.iui-color-swatch') as HTMLElement;
  fireEvent.click(swatch);
  expect(onColorClick).toHaveBeenCalledTimes(1);
});

it('should render button when onClick is passed', () => {
  const { container } = render(
    <ColorSwatch color='#9BA5AF' onClick={vi.fn()} />,
  );
  const swatch = container.querySelector('button.iui-color-swatch');
  expect(swatch).toHaveTextContent('#9BA5AF');
  expect(swatch).not.toHaveAttribute('aria-pressed');
});

it('should set aria-pressed when isActive and onClick are passed', () => {
  const { container } = render(
    <ColorSwatch color='#9BA5AF' onClick={vi.fn()} isActive />,
  );
  expect(container.querySelector('button')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});
