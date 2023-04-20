/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme, useOverflow, useMergedRefs } from '../utils';
import SelectTag from './SelectTag';

export type SelectTagContainerProps = {
  /**
   * Select tags.
   */
  tags: React.ReactNode[];
} & Omit<React.ComponentPropsWithoutRef<'ul'>, 'children'>;

/**
 */
export const SelectTagContainer = React.forwardRef(
  (props: SelectTagContainerProps, ref: React.RefObject<HTMLDivElement>) => {
    const { tags, className, ...rest } = props;

    useTheme();
    const [containerRef, visibleCount] = useOverflow(tags);
    const refs = useMergedRefs(ref, containerRef);

    return (
      <ul
        className={cx('iui-select-tag-container', className)}
        aria-live='assertive'
        aria-atomic='false'
        aria-relevant='additions removals'
        ref={refs}
        {...rest}
      >
        <>
          {visibleCount < tags.length ? tags.slice(0, visibleCount - 1) : tags}
          {visibleCount < tags.length && (
            <SelectTag label={`+${tags.length - visibleCount + 1} item(s)`} />
          )}
        </>
      </ul>
    );
  },
);

export default SelectTagContainer;
