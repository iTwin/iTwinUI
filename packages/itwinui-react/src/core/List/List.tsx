/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../../utils/index.js';

export const List = polymorphic.ul('iui-list', { role: 'list' });
if (process.env.NODE_ENV === 'development') {
  List.displayName = 'List';
}
