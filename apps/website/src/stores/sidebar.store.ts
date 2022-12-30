/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { atom } from 'nanostores';

export const isSidebarOpen = atom(false);

isSidebarOpen.subscribe((_isOpen) => {
  document
    .querySelector('sidebar-toggle button')
    ?.setAttribute('aria-expanded', _isOpen ? 'true' : 'false');
  document.querySelector('left-sidebar')?.setAttribute('visible', _isOpen ? 'true' : 'false');
  document.querySelector('main').toggleAttribute('inert', _isOpen);
});
