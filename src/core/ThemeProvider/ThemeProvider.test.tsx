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
  window.matchMedia = jest.fn().mockReturnValue({ matches: false });

  render(<ThemeProvider theme='os' />);
  expectLightTheme();
});

it('should respect os theme (dark)', () => {
  window.matchMedia = jest.fn().mockReturnValue({ matches: true });

  render(<ThemeProvider theme='os' />);
  expectDarkTheme();
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

  render(<ThemeProvider />);
  expectDarkTheme();
});

it('should set body class', () => {
  render(<ThemeProvider />);
  expect(document.body.classList).toContain('iui-body');
});
