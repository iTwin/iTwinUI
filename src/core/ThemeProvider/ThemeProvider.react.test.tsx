import React from 'react';
import { render } from '@testing-library/react';

import { ThemeProvider } from './ThemeProvider';

afterEach(() => {
  document.documentElement.classList.remove('iui-theme-light');
  document.documentElement.classList.remove('iui-theme-dark');
});

it('should not set any theme', () => {
  render(<ThemeProvider />);

  expect(document.documentElement.classList).not.toContain('iui-theme-light');
  expect(document.documentElement.classList).not.toContain('iui-theme-dark');
});

it('should set light theme', () => {
  render(<ThemeProvider theme='light' />);

  expect(document.documentElement.classList).toContain('iui-theme-light');
  expect(document.documentElement.classList).not.toContain('iui-theme-dark');
});

it('should set dark theme', () => {
  render(<ThemeProvider theme='dark' />);

  expect(document.documentElement.classList).not.toContain('iui-theme-light');
  expect(document.documentElement.classList).toContain('iui-theme-dark');
});
