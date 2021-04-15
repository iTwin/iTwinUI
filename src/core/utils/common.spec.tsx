/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { getUserColor } from './common';

it('should return color for given user name', () => {
  expect(getUserColor('Terry Rivers')).toEqual('#6AB9EC');
});

it('should return color for given user email', () => {
  expect(getUserColor('Terry.Rivers@email.com')).toEqual('#73C7C1');
});
