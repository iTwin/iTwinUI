/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../../utils/index.js';

/**
 * Inline code element.
 * @example
 * <p>Some <Code>inline code</Code> in a paragraph</p>
 */
export const Code = polymorphic.code('iui-code');
