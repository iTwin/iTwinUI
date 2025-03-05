/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { polymorphic } from '../../utils/index.js';

export const ExpandableBlockLabelArea = polymorphic.span(
  'iui-expandable-block-label',
);
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockLabelArea.displayName = 'ExpandableBlock.LabelArea';
}
