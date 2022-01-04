/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { ThemeProvider } from './ThemeProvider';

const expectLightTheme = (ownerDocument = document) => {
  expect(ownerDocument.documentElement.classList).toContain('iui-theme-light');
  expect(ownerDocument.documentElement.classList).not.toContain(
    'iui-theme-dark',
  );
};

const expectDarkTheme = () => {
  expect(document.documentElement.classList).not.toContain('iui-theme-light');
  expect(document.documentElement.classList).toContain('iui-theme-dark');
};

afterEach(() => {
  document.documentElement.classList.remove('iui-theme-light');
  document.documentElement.classList.remove('iui-theme-dark');
});

it('should respect os theme (light)', () => {
  window.matchMedia = jest.fn().mockReturnValueOnce({ matches: false });

  render(<ThemeProvider theme='os' />);
  expectLightTheme();
});

it('should respect os theme (dark)', () => {
  window.matchMedia = jest.fn().mockReturnValueOnce({ matches: true });

  render(<ThemeProvider theme='os' />);
  expectDarkTheme();
});

describe('media query', () => {
  const originalMatchMedia = window.matchMedia;
  let listeners: Array<(e: { matches: boolean }) => void> = [];
  let matches = false;

  const changeOSTheme = jest
    .fn()
    .mockImplementation((theme: 'dark' | 'light') => {
      listeners.forEach((listener) => {
        matches = theme === 'dark';
        listener({ matches: matches });
      });
      return true;
    });

  beforeEach(() => {
    window.matchMedia = jest.fn().mockReturnValueOnce({
      matches: matches,
      addEventListener: (
        _: 'change',
        listener: (e: { matches: boolean }) => void,
      ) => {
        listeners.push(listener);
      },
      removeEventListener: (
        _: 'change',
        listener: (e: { matches: boolean }) => void,
      ) => {
        const i = listeners.indexOf(listener);
        if (i > -1) {
          listeners.splice(i);
        }
      },
    });
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    listeners = [];
    matches = false;
  });

  it('should observe changes to os theme', () => {
    render(<ThemeProvider theme='os' />);
    expectLightTheme();

    changeOSTheme('dark');
    expectDarkTheme();

    changeOSTheme('light');
    expectLightTheme();

    changeOSTheme('dark');
    expectDarkTheme();
  });

  it('should stop observing when theme is not os anymore', () => {
    const { rerender } = render(<ThemeProvider theme='os' />);
    expectLightTheme();

    changeOSTheme('dark');
    expectDarkTheme();

    rerender(<ThemeProvider theme='dark' />);
    expectDarkTheme();

    changeOSTheme('light');
    expectDarkTheme();
  });
});

it('should set light theme', () => {
  render(<ThemeProvider theme='light' />);
  expectLightTheme();
});

it('should set light theme specifying ownerDocument', () => {
  const testDocument = new DOMParser().parseFromString(
    `<!DOCTYPE html><body><p>Test</p></body>`,
    'text/html',
  );
  render(
    <ThemeProvider
      theme='light'
      themeOptions={{ ownerDocument: testDocument }}
    />,
  );
  expectLightTheme(testDocument);
});

it('should set dark theme', () => {
  render(<ThemeProvider theme='dark' />);
  expectDarkTheme();
});

it('should set default theme', () => {
  render(<ThemeProvider />);
  expectLightTheme();

  render(<ThemeProvider theme='dark' />);
  expectDarkTheme();

  // should preserve dark theme since it was set before
  render(<ThemeProvider />);
  expectDarkTheme();
});

it('should set body class', () => {
  render(<ThemeProvider />);
  expect(document.body.classList).toContain('iui-body');
});
