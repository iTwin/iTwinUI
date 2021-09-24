/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  getBoundedValue,
  getContainer,
  getDocument,
  getFocusableElements,
  getTabbableElements,
  getUserColor,
  getWindow,
} from './common';

describe('getUserColor', () => {
  it('should return color for given user name', () => {
    expect(getUserColor('Terry Rivers')).toEqual('#6AB9EC');
  });

  it('should return color for given user email', () => {
    expect(getUserColor('Terry.Rivers@email.com')).toEqual('#73C7C1');
  });
});

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

describe('getBoundedValue', () => {
  it('should get bounded values', () => {
    expect(getBoundedValue(20, 0, 100)).toBe(20);
    expect(getBoundedValue(20, 30, 100)).toBe(30);
    expect(getBoundedValue(20, 0, 10)).toBe(10);
  });
});

describe('getTabbableElements', () => {
  it('should get tabbable elements', () => {
    const container = document.createElement('div');

    container.append(document.createElement('button'));

    const tabbableDiv = document.createElement('div');
    tabbableDiv.setAttribute('tabindex', '0');
    tabbableDiv.append(document.createElement('textarea'));
    container.append(tabbableDiv);

    const disabledSelect = document.createElement('select');
    disabledSelect.disabled = true;
    container.append(disabledSelect);

    container.append(document.createElement('input'));

    const disabledDiv = document.createElement('div');
    disabledDiv.setAttribute('tabindex', '0');
    disabledDiv.className = 'iui-disabled';
    container.append(disabledDiv);

    expect(getTabbableElements(container).length).toBe(4);
  });

  it('should return empty array of tabbable elements', () => {
    expect(getTabbableElements(undefined).length).toBe(0);
    expect(getTabbableElements(null).length).toBe(0);
    expect(getTabbableElements(document.createElement('div')).length).toBe(0);
  });
});

describe('getFocusableElements', () => {
  it('should get focusable elements', () => {
    const container = document.createElement('div');

    container.append(document.createElement('button'));

    const tabbableDiv = document.createElement('div');
    tabbableDiv.setAttribute('tabindex', '0');
    tabbableDiv.append(document.createElement('textarea'));
    container.append(tabbableDiv);

    const disabledSelect = document.createElement('select');
    disabledSelect.disabled = true;
    container.append(disabledSelect);

    container.append(document.createElement('input'));

    const disabledDiv = document.createElement('div');
    disabledDiv.setAttribute('tabindex', '0');
    disabledDiv.className = 'iui-disabled';
    container.append(disabledDiv);

    const focusableSpan = document.createElement('span');
    focusableSpan.setAttribute('tabindex', '-1');
    container.append(focusableSpan);

    expect(getFocusableElements(container).length).toBe(5);
  });

  it('should return empty array of focusable elements', () => {
    expect(getFocusableElements(undefined).length).toBe(0);
    expect(getFocusableElements(null).length).toBe(0);
    expect(getFocusableElements(document.createElement('div')).length).toBe(0);
  });
});
