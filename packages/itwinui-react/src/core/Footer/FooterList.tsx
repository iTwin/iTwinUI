/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../../utils/index.js';

/**
 * Footer list. Recommended to use inside `Footer` with `Footer.Item` and `Footer.Separator`.
 */
export const FooterList = polymorphic.ul('iui-legal-footer-list');
if (process.env.NODE_ENV === 'development') {
  FooterList.displayName = 'Footer.List';
}
