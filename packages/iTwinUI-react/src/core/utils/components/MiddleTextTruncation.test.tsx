/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import MiddleTextTruncation from './MiddleTextTruncation';
import * as UseOverflow from '../hooks/useOverflow';

it('should truncate the text', () => {
  jest.spyOn(UseOverflow, 'useOverflow').mockReturnValue([jest.fn(), 20]);
  const { container } = render(
    <div>
      <MiddleTextTruncation text='This is some very long text to truncate and expect ellipsis' />
    </div>,
  );

  const containerSpan = container.querySelector('span') as HTMLSpanElement;
  expect(containerSpan.textContent).toBe('This is some …lipsis');
});

it('should truncate the text and leave 20 symbols at the end', () => {
  jest.spyOn(UseOverflow, 'useOverflow').mockReturnValue([jest.fn(), 50]);
  const { container } = render(
    <div>
      <MiddleTextTruncation
        endCharsCount={20}
        text='This is some very long text to truncate and you never know what could happen, because we have twenty characters expectation at the end of the truncated text'
      />
    </div>,
  );

  const containerSpan = container.querySelector('span') as HTMLSpanElement;
  expect(containerSpan.textContent).toBe(
    'This is some very long text t…f the truncated text',
  );
});

it('should leave original text (same length)', () => {
  jest.spyOn(UseOverflow, 'useOverflow').mockReturnValue([jest.fn(), 20]);
  const { container } = render(
    <div>
      <MiddleTextTruncation text='This is a short text' />
    </div>,
  );

  const containerSpan = container.querySelector('span') as HTMLSpanElement;
  expect(containerSpan.textContent).toBe('This is a short text');
});

it('should leave original text', () => {
  jest.spyOn(UseOverflow, 'useOverflow').mockReturnValue([jest.fn(), 20]);
  const { container } = render(
    <div>
      <MiddleTextTruncation text='No trunc' />
    </div>,
  );

  const containerSpan = container.querySelector('span') as HTMLSpanElement;
  expect(containerSpan.textContent).toBe('No trunc');
});

it('should render custom text', () => {
  jest.spyOn(UseOverflow, 'useOverflow').mockReturnValue([jest.fn(), 20]);
  const text = 'This is some very long text to truncate and expect ellipsis';
  const { container } = render(
    <MiddleTextTruncation
      text={text}
      textRenderer={(truncatedText) => (
        <span data-testid='custom-text'>
          {truncatedText} - some additional text
        </span>
      )}
    />,
  );

  const containerSpan = container.querySelector('span') as HTMLSpanElement;
  expect(containerSpan.textContent).toBe(
    'This is some …lipsis - some additional text',
  );
  expect(
    containerSpan.querySelector('[data-testid="custom-text"]'),
  ).toBeTruthy();
});
