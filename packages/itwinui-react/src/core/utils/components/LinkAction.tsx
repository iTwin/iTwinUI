/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import '@itwin/itwinui-css/css/utils.css';
import { polymorphic } from '../functions/polymorphic.js';

/**
 * Polymorphic link action component.
 * It is rendered as `a` by default.
 * @example
 * <LinkBox>
 *   <Surface>
 *     <LinkAction href='/new-page'>Whole card is clickable</LinkAction>
 *   </Surface>
 * </LinkBox>
 */
export const LinkAction = polymorphic.a('iui-link-action');
LinkAction.displayName = 'LinkAction';

/**
 * Polymorphic link box component.
 * Used to wrap around your component to use LinkAction.
 * Rendered as `div` by default
 * @example
 * <LinkBox>
 *   <Surface>
 *     <LinkAction href='/new-page'>Whole card is clickable</LinkAction>
 *   </Surface>
 * </LinkBox>
 */
export const LinkBox = polymorphic.div('iui-link-box');
LinkBox.displayName = 'LinkBox';
