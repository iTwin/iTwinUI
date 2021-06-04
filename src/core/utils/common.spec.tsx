/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { getContainer, getUserColor } from './common';

it('should return color for given user name', () => {
  expect(getUserColor('Terry Rivers')).toEqual('#6AB9EC');
});

it('should return color for given user email', () => {
  expect(getUserColor('Terry.Rivers@email.com')).toEqual('#73C7C1');
});

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
