/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../../utils/index.js';
import '@itwin/itwinui-css/css/anchor.css';

/**
 * A consistently styled anchor component.
 *
 * Supports polymorphic `as` prop for use with `Link` components from routers,
 * or to render as a button.
 *
 * @example
 * <Anchor href='/'>Home</Anchor>
 * <Anchor href='/projects'>Projects</Anchor>
 *
 * @example
 * <Anchor as={Link} to='/'>Home</Anchor>
 * <Anchor as='button' onClick={() => {}}>click me</Anchor>
 */
export const Anchor = polymorphic.a('iui-anchor');

export default Anchor;
