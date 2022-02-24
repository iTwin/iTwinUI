/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { getFocusableElements, getTabbableElements } from './focusable';

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

    const focusableDisabledDiv = document.createElement('div');
    focusableDisabledDiv.setAttribute('tabindex', '0');
    focusableDisabledDiv.setAttribute('aria-disabled', 'true');
    container.append(focusableDisabledDiv);

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

    const focusableDisabledDiv = document.createElement('div');
    focusableDisabledDiv.setAttribute('tabindex', '-1');
    focusableDisabledDiv.setAttribute('aria-disabled', 'true');
    container.append(focusableDisabledDiv);

    expect(getFocusableElements(container).length).toBe(5);
  });

  it('should return empty array of focusable elements', () => {
    expect(getFocusableElements(undefined).length).toBe(0);
    expect(getFocusableElements(null).length).toBe(0);
    expect(getFocusableElements(document.createElement('div')).length).toBe(0);
  });
});
