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
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

/**
 */
export const SelectTagContainer = React.forwardRef(
  (props: SelectTagContainerProps, ref: React.RefObject<HTMLDivElement>) => {
    const { tags, className, ...rest } = props;

    useTheme();
    const [containerRef, visibleCount] = useOverflow(tags);
    const refs = useMergedRefs(ref, containerRef);

    return (
      <div
        className={cx('iui-select-tag-container', className)}
        ref={refs}
        aria-live='polite'
        aria-atomic='true'
        {...rest}
      >
        <React.Fragment
          key={tags.length} // key on the length so that the whole container is replaced each time
        >
          {visibleCount < tags.length ? tags.slice(0, visibleCount - 1) : tags}
          {visibleCount < tags.length && (
            <SelectTag label={`+${tags.length - visibleCount + 1} item(s)`} />
          )}
        </React.Fragment>
      </div>
    );
  },
);

export default SelectTagContainer;
