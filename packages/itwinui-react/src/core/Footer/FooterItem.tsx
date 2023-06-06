/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../utils/index.js';

/**
 * Footer item. Recommended to use inside `Footer.List`.
 */
export const FooterItem = polymorphic.li('iui-legal-footer-item');

export default FooterItem;
