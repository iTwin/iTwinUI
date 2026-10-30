/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';

import { Surface } from './Surface.js';

it('should render in its most basic state', () => {
  const { container } = render(<Surface>Surface Content</Surface>);
  const surface = container.querySelector('.iui-surface') as HTMLElement;
  expect(surface).toBeTruthy();
  expect(surface.textContent).toBe('Surface Content');
});

it.each(['undefined', 'custom'] as const)(
  'should render elevation surface (elevation: %s)',
  (elevationArg) => {
    const elevation = elevationArg === 'undefined' ? undefined : 1;

    const { container } = render(
      <Surface elevation={elevation}>Surface Content</Surface>,
    );
    const surface = container.querySelector('.iui-surface') as HTMLElement;

    if (elevation === undefined) {
      expect(surface.getAttribute('data-iui-elevation')).toBeNull();
    } else {
      expect(surface.getAttribute('data-iui-elevation')).toEqual(
        `${elevation}`,
      );
    }
  },
);

it('should allow customizing border', () => {
  const { container: container1 } = render(
    <Surface border={false}>lalala</Surface>,
  );
  expect(container1.querySelector('div')).toHaveStyle(
    '--iui-surface-border: none;',
  );

  const { container: container2 } = render(
    <Surface border={'1px solid hotpink'}>lalala</Surface>,
  );
  expect(container2.querySelector('div')).toHaveStyle(
    '--iui-surface-border: 1px solid hotpink;',
  );
});

it('should add className and style correctly', () => {
  const { container } = render(
    <Surface className='test-class' style={{ color: 'grey' }}>
      Surface Content
    </Surface>,
  );
  const surface = container.querySelector(
    '.iui-surface.test-class',
  ) as HTMLElement;
  expect(surface).toBeTruthy();
  expect(surface.style.color).toBe('grey');
});

it('should render custom surface', () => {
  const { container } = render(
    <Surface>
      <Surface.Header>TestHeader</Surface.Header>
      <Surface.Body isPadded={true}>TestBody</Surface.Body>
    </Surface>,
  );
  const surface = container.querySelector('.iui-surface') as HTMLElement;
  expect(surface).toBeTruthy();
  expect(surface.getAttribute('data-iui-layout')).toBeTruthy();

  const surfaceHeader = container.querySelector(
    '.iui-surface-header',
  ) as HTMLElement;
  expect(surfaceHeader).toBeTruthy();
  expect(surfaceHeader.textContent).toBe('TestHeader');

  const surfaceBody = container.querySelector(
    '.iui-surface-body',
  ) as HTMLElement;
  expect(surfaceBody).toBeTruthy();
  expect(surfaceBody.getAttribute('data-iui-padded')).toBeTruthy();
  expect(surfaceBody.textContent).toBe('TestBody');
});
it('should support polymorphic `as` prop', () => {
  const { container } = render(
    <Surface>
      <Surface.Header as='h1'>TestHeader</Surface.Header>
      <Surface.Body as='h2'>TestBody</Surface.Body>
    </Surface>,
  );

  expect(container.querySelector('h1')).toHaveClass('iui-surface-header');
  expect(container.querySelector('h2')).toHaveClass('iui-surface-body');
});
