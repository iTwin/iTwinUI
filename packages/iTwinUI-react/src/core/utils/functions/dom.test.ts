/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { getContainer, getDocument, getWindow } from './dom';

describe('getContainer', () => {
  it('should create container', () => {
    const container = getContainer('test-id');
    expect(document.getElementById('test-id')).toBeTruthy();
    expect(getContainer('test-id')).toBe(container);
  });

  it('should respect ownerDocument arg', () => {
    const mockDocument = new DOMParser().parseFromString(
      `<!DOCTYPE html><html><body></body></html>`,
      'text/html',
    );

    const container = getContainer('test-id', mockDocument);
    expect(mockDocument.getElementById('test-id')).toBeTruthy();
    expect(getContainer('test-id', mockDocument)).toBe(container);
    expect(getContainer('test-id', document)).not.toBe(container);
  });

  it('should append to iui-root if it exists', () => {
    document.body.innerHTML = `<div class="iui-root"></div>`;
    getContainer('test-id');
    expect(document.querySelector('.iui-root > #test-id')).toBeTruthy();
  });
});

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
