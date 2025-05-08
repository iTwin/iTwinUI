/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { atom } from 'nanostores';

export const demoTheme = atom<'light' | 'dark'>('dark');

export const toggleDemoTheme = () => {
  demoTheme.set(demoTheme.get() === 'light' ? 'dark' : 'light');
};
