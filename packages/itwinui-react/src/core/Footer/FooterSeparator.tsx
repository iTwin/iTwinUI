/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../utils/index.js';
import '@itwin/itwinui-css/css/footer.css';

/**
 * Footer separator. Recommended to use inside `Footer.List`.
 */
export const FooterSeparator = polymorphic.li('iui-legal-footer-separator', {
  'aria-hidden': true,
});

export default FooterSeparator;
