/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../../utils/index.js';
import '@itwin/itwinui-css/css/code.css';

/**
 * Inline code element.
 * @example
 * <p>Some <Code>inline code</Code> in a paragraph</p>
 */
export const Code = polymorphic.code('iui-code');

export default Code;
