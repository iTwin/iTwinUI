/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../../utils/index.js';

/**
 * InformationPanelWrapper should contain the `InformationPanel`
 * and the component over which the panel will overlay.
 * @example
 * <InformationPanelWrapper>
 *   <Table ... />
 *   <InformationPanel ... />
 * </InformationPanelWrapper>
 */
export const InformationPanelWrapper = polymorphic.div(
  'iui-information-panel-wrapper',
);
if (process.env.NODE_ENV === 'development') {
  InformationPanelWrapper.displayName = 'InformationPanelWrapper';
}
