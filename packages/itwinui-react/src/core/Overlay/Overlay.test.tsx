/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from '@testing-library/react';

import { Overlay } from './Overlay.js';

it('should render in its most basic state', () => {
  const { container } = render(<Overlay />);

  const overlay = container.querySelector(
    '.iui-overlay-wrapper',
  ) as HTMLElement;
  expect(overlay).toBeTruthy();
});

it('should work with subcomponents', () => {
  render(
    <Overlay.Wrapper>
      wrapper
      <Overlay.Overlay>loading</Overlay.Overlay>
      <Overlay.HiddenContent>content</Overlay.HiddenContent>
    </Overlay.Wrapper>,
  );

  expect(screen.getByText('wrapper')).toHaveClass('iui-overlay-wrapper');
  expect(screen.getByText('loading')).toHaveClass('iui-overlay');
  expect(screen.getByText('content')).toHaveAttribute('inert');
});
