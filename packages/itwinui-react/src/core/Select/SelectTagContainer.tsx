/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  useTheme,
  useOverflow,
  useMergedRefs,
  VisuallyHidden,
  getWindow,
} from '../utils';
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

    const tagsLiveText = useClearAfterDelay(tags);

    return (
      <>
        <div
          className={cx('iui-select-tag-container', className)}
          ref={refs}
          {...rest}
        >
          <>
            {visibleCount < tags.length
              ? tags.slice(0, visibleCount - 1)
              : tags}
            {visibleCount < tags.length && (
              <SelectTag label={`+${tags.length - visibleCount + 1} item(s)`} />
            )}
          </>
        </div>

        <VisuallyHidden as='div' aria-live='polite' aria-atomic='true'>
          {tagsLiveText}
        </VisuallyHidden>
      </>
    );
  },
);

export default SelectTagContainer;

/**
 * Hook that returns the latest value of tags but clears it after 5 seconds.
 * The assumption is that the text has already been announced so it no longer needs
 * to be present in the DOM, as it could lead to duplicate announcements.
 */
const useClearAfterDelay = (tags?: React.ReactNode) => {
  const [tagsThatWillClear, setTagsThatWillClear] = React.useState(tags);
  const timeoutRef = React.useRef<number>();

  React.useEffect(() => {
    if (timeoutRef.current) {
      getWindow()?.clearTimeout(timeoutRef.current);
    }

    setTagsThatWillClear(<div key={timeoutRef.current}>{tags}</div>);

    timeoutRef.current = getWindow()?.setTimeout(() => {
      setTagsThatWillClear(null);
    }, 5000);
  }, [tags]);

  return tagsThatWillClear;
};
