/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../utils/index.js';
import '@itwin/itwinui-css/css/menu.css';

export const List = polymorphic.ul('iui-list', { role: 'list' });
List.displayName = 'List';
