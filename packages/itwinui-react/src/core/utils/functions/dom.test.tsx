/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { getDocument, getWindow, mergeEventHandlers } from './dom.js';

describe('getDocument', () => {
  it('should get document when it is defined', () => {
    expect(getDocument()).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(global as any, 'document', 'get').mockReturnValue(undefined);
    expect(getDocument()).toBeFalsy();
    jest.restoreAllMocks();
  });
});

describe('getWindow', () => {
  it('should get window when it is defined', () => {
    expect(getWindow()).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jest.spyOn(global as any, 'window', 'get').mockReturnValue(undefined);
    expect(getWindow()).toBeFalsy();
    jest.restoreAllMocks();
  });
});

describe('mergeEventHandlers', () => {
  it('should respect preventDefault', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn((e) => e.preventDefault());
    const handler3 = jest.fn();
    render(
      <button onClick={mergeEventHandlers(handler1, handler2, handler3)}>
        hi
      </button>,
    );
    screen.getByText('hi').click();
    expect(handler1).toHaveBeenCalled();
    expect(handler2).toHaveBeenCalled();
    expect(handler3).not.toHaveBeenCalled();
  });
});
