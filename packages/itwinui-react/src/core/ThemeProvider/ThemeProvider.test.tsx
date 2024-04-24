/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import * as UseMediaQuery from '../../utils/hooks/useMediaQuery.js';

import { ThemeProvider } from './ThemeProvider.js';
import type { MockInstance } from 'vitest';

let useMediaSpy: MockInstance;

beforeEach(() => {
  useMediaSpy = vi.spyOn(UseMediaQuery, 'useMediaQuery').mockReturnValue(false);
});

afterEach(() => useMediaSpy.mockRestore());

it.each(['light', 'dark'] as const)(
  'should render correctly with %s theme',
  (theme) => {
    const { container } = render(
      <ThemeProvider theme={theme}>Test</ThemeProvider>,
    );
    const element = container.querySelector('div');
    expect(element).toBeTruthy();
    expect(element).toHaveClass('iui-root');
    expect(element).toHaveAttribute(
      'data-iui-theme',
      theme == 'dark' ? 'dark' : 'light',
    );
    expect(element).toHaveAttribute('data-iui-contrast', 'default');
  },
);

it.each(['default', 'high'] as const)(
  'should render correctly with %s contrast',
  (contrast) => {
    const { container } = render(
      <ThemeProvider themeOptions={{ highContrast: contrast === 'high' }}>
        Test
      </ThemeProvider>,
    );
    const element = container.querySelector('.iui-root');
    expect(element).toHaveAttribute('data-iui-theme', 'light');
    expect(element).toHaveAttribute('data-iui-contrast', contrast);
  },
);

it('should inherit parent theme when using theme=inherit', () => {
  const { container } = render(
    <ThemeProvider theme='dark'>
      outer
      <ThemeProvider theme='inherit' data-test='inner'>
        inner
      </ThemeProvider>
    </ThemeProvider>,
  );

  const innerRoot = container.querySelector('[data-test="inner"]');
  expect(innerRoot).toHaveClass('iui-root');
  expect(innerRoot).toHaveAttribute('data-iui-theme', 'dark');
  expect(innerRoot).toHaveAttribute('data-iui-contrast', 'default');
});

it('should respect OS preferences', () => {
  useMediaSpy.mockReturnValue(true);
  const { container } = render(<ThemeProvider theme='os'>Test</ThemeProvider>);
  const element = container.querySelector('.iui-root');
  expect(element).toHaveAttribute('data-iui-theme', 'dark');
  expect(element).toHaveAttribute('data-iui-contrast', 'high');
});

it('should respect prefers-contrast even with theme set', () => {
  useMediaSpy.mockReturnValue(true);
  const { container } = render(
    <ThemeProvider theme='dark'>Test</ThemeProvider>,
  );
  const element = container.querySelector('.iui-root');
  expect(element).toHaveAttribute('data-iui-theme', 'dark');
  expect(element).toHaveAttribute('data-iui-contrast', 'high');
});

it('should prioritize user props over OS preferences', () => {
  useMediaSpy.mockReturnValue(true);
  const { container } = render(
    <ThemeProvider theme='light' themeOptions={{ highContrast: false }}>
      Test
    </ThemeProvider>,
  );
  const element = container.querySelector('.iui-root');
  expect(element).toHaveAttribute('data-iui-theme', 'light');
  expect(element).toHaveAttribute('data-iui-contrast', 'default');
});

it('should render the correct element with `as` prop', () => {
  const { container } = render(
    <ThemeProvider as='section'>Test</ThemeProvider>,
  );
  const element = container.querySelector('section');
  expect(element).toHaveClass('iui-root');
  expect(element).toHaveAttribute('data-iui-theme', 'light');
  expect(element).toHaveAttribute('data-iui-contrast', 'default');
});

it('should allow nesting ThemeProviders', () => {
  const { container } = render(
    <ThemeProvider theme='dark' id='parent'>
      <ThemeProvider theme='light' id='child'>
        Test
      </ThemeProvider>
    </ThemeProvider>,
  );
  const element1 = container.querySelector('#parent');
  expect(element1).toHaveClass('iui-root');
  expect(element1).toHaveAttribute('data-iui-theme', 'dark');

  const element2 = container.querySelector('#child');
  expect(element2).toHaveClass('iui-root');
  expect(element2).toHaveAttribute('data-iui-theme', 'light');
});

it('should apply iui-root-background to the topmost ThemeProvider', () => {
  const { container } = render(
    <ThemeProvider data-test='outer'>
      Hello from the outside
      <ThemeProvider data-test='inner'>Hello from the inside</ThemeProvider>
    </ThemeProvider>,
  );

  const outerRoot = container.querySelector('[data-test="outer"]');
  expect(outerRoot).toHaveClass('iui-root-background');

  const innerRoot = container.querySelector('[data-test="inner"]');
  expect(innerRoot).not.toHaveClass('iui-root-background');
});

it('should default applyBackground to false when inheriting theme', () => {
  const { container, rerender } = render(
    <ThemeProvider theme='inherit'>Hello</ThemeProvider>,
    { wrapper: ({ children }) => <div data-iui-theme='light'>{children}</div> },
  );
  const element = container.querySelector('.iui-root');
  expect(element).not.toHaveClass('iui-root-background');

  // should prefer value passed by user
  rerender(
    <ThemeProvider theme='inherit' themeOptions={{ applyBackground: true }}>
      Hello
    </ThemeProvider>,
  );
  expect(element).toHaveClass('iui-root-background');
});

it('should inherit theme by default', () => {
  const { container } = render(
    <ThemeProvider theme='dark' themeOptions={{ highContrast: true }}>
      <ThemeProvider id='nested'>Test</ThemeProvider>
    </ThemeProvider>,
  );

  const nested = container.querySelector('#nested');
  expect(nested).toHaveAttribute('data-iui-theme', 'dark');
  expect(nested).toHaveAttribute('data-iui-contrast', 'high');
});

it('should inherit theme from data attribute if no context found', () => {
  const { container } = render(
    <ThemeProvider id='nested'>Test</ThemeProvider>,
    { wrapper: ({ children }) => <div data-iui-theme='dark'>{children}</div> },
  );

  const nested = container.querySelector('#nested');
  expect(nested).toHaveAttribute('data-iui-theme', 'dark');
});

it('should default to light theme if no parent theme found', () => {
  render(<ThemeProvider>Test</ThemeProvider>);
  expect(screen.getByText('Test')).toHaveAttribute('data-iui-theme', 'light');
});
