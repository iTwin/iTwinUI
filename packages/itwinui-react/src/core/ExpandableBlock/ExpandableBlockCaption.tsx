/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box, useSafeContext, useId } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { ExpandableBlockContext } from './ExpandableBlockContext.js';

export const ExpandableBlockCaption = React.forwardRef(
  (props, forwardedRef) => {
    const fallbackId = useId();

    const { setDescriptionId } = useSafeContext(ExpandableBlockContext);

    React.useEffect(() => {
      setDescriptionId(props.id || fallbackId);
      return () => setDescriptionId(undefined);
    }, [props.id, fallbackId, setDescriptionId]);

    return (
      <Box
        ref={forwardedRef}
        id={fallbackId}
        {...props}
        className={cx('iui-expandable-block-caption', props?.className)}
      />
    );
  },
) as PolymorphicForwardRefComponent<'div'>;
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockCaption.displayName = 'ExpandableBlock.Caption';
}
