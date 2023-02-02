/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { act, render } from '@testing-library/react';
import * as UseMediaQuery from '../utils/hooks/useMediaQuery';

import { ThemeProvider } from './ThemeProvider';

describe('When rendering an element (with children)', () => {
  let useMediaSpy: jest.SpyInstance;

  beforeEach(() => {
    useMediaSpy = jest
      .spyOn(UseMediaQuery, 'useMediaQuery')
      .mockReturnValue(false);
  });

  afterEach(() => useMediaSpy.mockRestore());

  it.each(['default', 'light', 'dark'] as const)(
    'should render correctly with %s theme',
    (theme) => {
      const { container } = render(
        <ThemeProvider theme={theme === 'default' ? undefined : theme}>
          Test
        </ThemeProvider>,
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

  it('should respect OS preferences', () => {
    useMediaSpy.mockReturnValue(true);
    const { container } = render(
      <ThemeProvider theme='os'>Test</ThemeProvider>,
    );
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
});

describe('Fallback (without children)', () => {
  const originalMatchMedia = window.matchMedia;

  const expectLightTheme = (ownerDocument = document) => {
    expect(ownerDocument.documentElement.dataset.iuiTheme).toEqual('light');
  };

  const expectDarkTheme = () => {
    expect(document.documentElement.dataset.iuiTheme).toEqual('dark');
  };

  afterEach(() => {
    document.body.classList.remove('iui-root');
    document.documentElement.removeAttribute('data-iui-theme');
    document.documentElement.removeAttribute('data-iui-contrast');
    window.matchMedia = originalMatchMedia;
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
    let listeners: Array<(e: { matches: boolean }) => void> = [];

    const matchMediaObject = {
      matches: false,
      addEventListener: (_: 'change', listener: (e: unknown) => void) => {
        listeners.push(listener);
      },
      removeEventListener: (_: 'change', listener: (e: unknown) => void) => {
        const i = listeners.indexOf(listener);
        if (i > -1) {
          listeners.splice(i);
        }
      },
    };

    const changeOSTheme = (theme: 'dark' | 'light') => {
      matchMediaObject.matches = theme === 'dark';
      listeners.forEach((listener) => {
        listener({ matches: matchMediaObject.matches });
      });
    };

    beforeEach(() => {
      window.matchMedia = jest.fn().mockReturnValue(matchMediaObject);
    });

    afterEach(() => {
      window.matchMedia = originalMatchMedia;
      listeners = [];
      matchMediaObject.matches = false;
    });

    it('should observe changes to os theme', () => {
      render(<ThemeProvider theme='os' />);
      expectLightTheme();

      act(() => changeOSTheme('dark'));
      expectDarkTheme();

      act(() => changeOSTheme('light'));
      expectLightTheme();

      act(() => changeOSTheme('dark'));
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

  it('should set iui-root class on body', () => {
    render(<ThemeProvider />);
    expect(document.body.classList).toContain('iui-root');
  });

  it.each(['light', 'dark'] as const)(
    'should respect prefers-contrast query (%s)',
    (theme) => {
      window.matchMedia = jest.fn().mockReturnValue({ matches: true });
      render(<ThemeProvider theme={theme} />);
      expect(document.documentElement.dataset.iuiTheme).toEqual(theme);
      expect(document.documentElement.dataset.iuiContrast).toEqual(`high`);
    },
  );

  it.each(['light', 'dark'] as const)(
    'should support `themeOptions.highContrast` (%s)',
    (theme) => {
      render(
        <ThemeProvider theme={theme} themeOptions={{ highContrast: true }} />,
      );
      expect(document.documentElement.dataset.iuiContrast).toEqual(`high`);
    },
  );

  it.each([true, false])(
    'should override prefers-contrast query when `themeOptions.highContrast` is %s',
    (highContrast) => {
      window.matchMedia = jest.fn().mockReturnValue({ matches: true });
      render(<ThemeProvider theme={'light'} themeOptions={{ highContrast }} />);
      expect(document.documentElement.dataset.iuiContrast).toEqual(
        highContrast ? `high` : 'default',
      );
    },
  );

  it('should not modify root or <body> if a parent ThemeProvider exists', () => {
    render(
      <ThemeProvider theme='dark'>
        <ThemeProvider theme='dark' />
      </ThemeProvider>,
    );

    const element = document.querySelector('.iui-root');
    expect(element).toHaveAttribute('data-iui-theme', 'dark');
    expect(element).toHaveAttribute('data-iui-contrast', 'default');

    expect(document.documentElement.dataset.iuiTheme).toBeUndefined();
    expect(document.documentElement.dataset.iuiContrast).toBeUndefined();
    expect(document.body.classList).not.toContain('iui-root');
  });

  it('should not modify root if <body> has theme', () => {
    render(
      <body data-iui-theme='dark'>
        <ThemeProvider theme='light' />
      </body>,
      { container: document.documentElement },
    );
    expect(document.documentElement.dataset.iuiTheme).toBeUndefined();
    expect(document.documentElement.dataset.iuiContrast).toBeUndefined();
    expect(document.body.dataset.iuiTheme).toEqual('dark');
  });
});
