/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../utils/index.js';
import '@itwin/itwinui-css/css/information-panel.css';

/**
 * Body of the `InformationPanel` containing the main content.
 */
export const InformationPanelBody = polymorphic.div('iui-information-body');

export default InformationPanelBody;
