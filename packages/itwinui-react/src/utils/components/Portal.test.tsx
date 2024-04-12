/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Portal } from './Portal.js';
import { ThemeProvider } from '../../core/ThemeProvider/ThemeProvider.js';

it('should work', () => {
  render(
    <ThemeProvider data-testid='root'>
      <main>
        <Portal>thing</Portal>
      </main>
    </ThemeProvider>,
  );

  expect(document.querySelector('main')).toBeEmptyDOMElement();
  expect(
    screen.getByTestId('root').querySelector(':scope > div'),
  ).toHaveTextContent('thing');
});

it('should allow turning off', () => {
  render(
    <ThemeProvider data-testid='root'>
      <main>
        <Portal portal={false}>thing</Portal>
      </main>
    </ThemeProvider>,
  );

  expect(document.querySelector('main')).toHaveTextContent('thing');
  expect(
    screen.getByTestId('root').querySelector(':scope > div'),
  ).toHaveTextContent('');
});

it('should accept an element', () => {
  render(
    <ThemeProvider data-testid='root'>
      <main>
        <Portal portal={{ to: document.body }}>thing</Portal>
      </main>
    </ThemeProvider>,
  );

  expect(document.querySelector('main')).toBeEmptyDOMElement();
  expect(screen.getByTestId('root')).toHaveTextContent('');
  expect(document.body).toHaveTextContent('thing');
});

it('should accept a function which returns an element', () => {
  render(
    <ThemeProvider data-testid='root'>
      <main>
        <Portal portal={{ to: () => document.querySelector('footer') }}>
          my foot
        </Portal>
      </main>
      <footer />
    </ThemeProvider>,
  );

  expect(document.querySelector('main')).toBeEmptyDOMElement();
  expect(document.querySelector('footer')).toHaveTextContent('my foot');
});

it.each([null, undefined, () => null, () => undefined])(
  'should use the appropriate default behavior if portal.to is %s',
  (to) => {
    render(
      <ThemeProvider data-testid='root'>
        <main>
          <Portal portal={{ to }}>thing</Portal>
        </main>
      </ThemeProvider>,
    );

    expect(document.querySelector('main')).toBeEmptyDOMElement();
    expect(
      screen.getByTestId('root').querySelector(':scope > div'),
    ).toHaveTextContent('thing');
  },
);

it('should respect ThemeProvider.portalContainer', () => {
  const TestComp = () => {
    const [footer, setFooter] = React.useState<HTMLElement>();
    return (
      <ThemeProvider portalContainer={footer}>
        <main>
          <Portal>my foot</Portal>
        </main>
        <footer ref={(node) => node && setFooter(node)} />
      </ThemeProvider>
    );
  };
  render(<TestComp />);

  expect(document.querySelector('main')).toBeEmptyDOMElement();
  expect(document.querySelector('footer')).toHaveTextContent('my foot');
});
