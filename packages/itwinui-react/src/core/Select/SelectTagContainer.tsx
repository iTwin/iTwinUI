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
  /**
   * Selected tags joined into a single string for live region.
   */
  selectedItemsString: string;
} & Omit<React.ComponentPropsWithoutRef<'div'>, 'children'>;

/**
 */
export const SelectTagContainer = React.forwardRef(
  (props: SelectTagContainerProps, ref: React.RefObject<HTMLDivElement>) => {
    const { tags, className, selectedItemsString, ...rest } = props;

    useTheme();
    const [containerRef, visibleCount] = useOverflow(tags);
    const refs = useMergedRefs(ref, containerRef);

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
        <AutoclearingLiveRegion text={selectedItemsString} />
      </>
    );
  },
);

export default SelectTagContainer;

const AutoclearingLiveRegion = ({ text = '' }) => {
  const [maybeText, setMaybeText] = React.useState(text);

  React.useEffect(() => {
    setMaybeText(text);

    // clear the text after 5 seconds so that users cannot manually move their cursor to it
    const timeout = getWindow()?.setTimeout(() => {
      setMaybeText('');
    }, 5000);

    return () => {
      getWindow()?.clearTimeout(timeout);
    };
  }, [text]);

  return (
    <VisuallyHidden as='div' aria-live='polite' aria-atomic='true'>
      {maybeText}
    </VisuallyHidden>
  );
};
