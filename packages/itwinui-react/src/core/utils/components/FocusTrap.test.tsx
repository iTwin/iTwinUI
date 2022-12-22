/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { render } from '@testing-library/react';
import React from 'react';
import FocusTrap from './FocusTrap';

it('should focus trap in element', () => {
  const { container } = render(
    <div>
      <button id='test-button'>test button</button>
      <FocusTrap>
        <div>
          <button id='focus-button'>focus test</button>
          <a href='#'>some link</a>
          <span tabIndex={0}>tabbable span</span>
          <div>simple div</div>
        </div>
      </FocusTrap>
    </div>,
  );

  const testButton = container.querySelector('#test-button') as HTMLElement;
  testButton.focus();
  expect(document.activeElement).toEqual(testButton);

  const focusTrapDivs = container.querySelectorAll(
    'div[tabindex]',
  ) as NodeListOf<HTMLElement>;

  // go forward (tab)
  focusTrapDivs[0].focus();
  const focusButton = container.querySelector('#focus-button');
  expect(document.activeElement).toEqual(focusButton);

  // go forward (tab)
  const anchor = container.querySelector('a') as HTMLElement;
  anchor.focus();
  expect(document.activeElement).toEqual(anchor);

  // go forward (tab)
  const span = container.querySelector('span') as HTMLElement;
  span.focus();
  expect(document.activeElement).toEqual(span);

  // go forward (tab)
  focusTrapDivs[1].focus();
  expect(document.activeElement).toEqual(focusButton);

  // go backwards (shift + tab)
  focusTrapDivs[0].focus();
  expect(document.activeElement).toEqual(span);

  // go out of focus trap by focusing the test button
  testButton.focus();
  expect(document.activeElement).toEqual(testButton);

  // go backwards (shift + tab)
  focusTrapDivs[1].focus();
  expect(document.activeElement).toEqual(span);
});

it('should focus trap in element when only one focusable child is present', () => {
  const { container } = render(
    <div>
      <button id='test-button'>test button</button>
      <FocusTrap>
        <div>
          <span tabIndex={0}>tabbable span</span>
        </div>
      </FocusTrap>
    </div>,
  );

  const testButton = container.querySelector('#test-button') as HTMLElement;
  testButton.focus();
  expect(document.activeElement).toEqual(testButton);

  const focusTrapDivs = container.querySelectorAll(
    'div[tabindex]',
  ) as NodeListOf<HTMLElement>;
  focusTrapDivs[0].focus();
  const span = container.querySelector('span') as HTMLElement;
  expect(document.activeElement).toEqual(span);

  focusTrapDivs[1].focus();
  expect(document.activeElement).toEqual(span);

  focusTrapDivs[1].focus();
  expect(document.activeElement).toEqual(span);
});
