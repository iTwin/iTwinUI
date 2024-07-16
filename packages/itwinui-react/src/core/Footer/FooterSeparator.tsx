/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../../utils/index.js';

/**
 * Footer separator. Recommended to use inside `Footer.List`.
 */
export const FooterSeparator = polymorphic.li('iui-legal-footer-separator', {
  'aria-hidden': true,
});
if (process.env.NODE_ENV === 'development') {
  FooterSeparator.displayName = 'Footer.Separator';
}
