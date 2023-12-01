/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { useOverflow, useMergedRefs, Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
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

  const [containerRef, visibleCount] = useOverflow(tags);
  const refs = useMergedRefs(ref, containerRef);

  const visibleTags = (() => {
    // - If visibleCount is 0
    //   - tags.length === 1, show the first tag.
    //     This is because although the *entire* tag is not visible,
    //     we truncate the tag using CSS, so the first part of the tag is visible.
    //   - tags.length > 1 or tags.length === 0, show no tags.
    // - Else, show the first visibleCount tags.
    const lastVisibleTagIndex = (() => {
      if (visibleCount === 0) {
        return tags.length === 1 ? 1 : 0;
      }
      return visibleCount;
    })();

    if (visibleCount < tags.length) {
      return tags.slice(0, lastVisibleTagIndex);
    } else {
      return tags;
    }
  })();

  return (
    <Box
      className={cx('iui-select-tag-container', className)}
      ref={refs}
      {...rest}
    >
      <>
        {visibleTags}
        {visibleCount < tags.length && (
          <SelectTag label={`+${tags.length - visibleCount} item(s)`} />
        )}
      </>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', SelectTagContainerProps>;

export default SelectTagContainer;
