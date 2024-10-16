/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { useOverflow, useMergedRefs, Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { SelectTag } from './SelectTag.js';

type SelectTagContainerProps = {
  /**
   * Select tags.
   */
  tags: React.ReactNode[];
};

/**
 */
export const SelectTagContainer = React.forwardRef((props, ref) => {
  const { tags, className, ...rest } = props;

  const [containerRef, visibleCount] = useOverflow(tags.length);
  const refs = useMergedRefs(ref, containerRef);

  return (
    <Box
      className={cx('iui-select-tag-container', className)}
      ref={refs}
      {...rest}
    >
      <>
        {visibleCount < tags.length ? tags.slice(0, visibleCount - 1) : tags}
        {visibleCount < tags.length && (
          <SelectTag label={`+${tags.length - visibleCount + 1} item(s)`} />
        )}
      </>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', SelectTagContainerProps>;
