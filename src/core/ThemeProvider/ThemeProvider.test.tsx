// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { render } from '@testing-library/react';

import { ThemeProvider } from './ThemeProvider';

const expectLightTheme = () => {
  expect(document.documentElement.classList).toContain('iui-theme-light');
  expect(document.documentElement.classList).not.toContain('iui-theme-dark');
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
