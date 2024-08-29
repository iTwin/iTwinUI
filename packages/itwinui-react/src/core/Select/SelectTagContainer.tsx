/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { SelectTag } from './SelectTag.js';
import {
  OverflowContainer,
  useOverflowContainerContext,
} from '../../utils/index.js';

type SelectTagContainerProps = {
  /**
   * Select tags.
   */
  tags: React.ReactNode[];
};

/**
 */
export const SelectTagContainer = React.forwardRef((props, ref) => {
  const { tags: tagsProp, className, ...rest } = props;

  const tags = React.useMemo(
    () => React.Children.toArray(tagsProp),
    [tagsProp],
  );

  return (
    <OverflowContainer
      items={tags}
      className={cx('iui-select-tag-container', className)}
      ref={ref}
      {...rest}
    >
      <SelectTagContainerContent {...props} tags={tags} />
    </OverflowContainer>
  );
}) as PolymorphicForwardRefComponent<'div', SelectTagContainerProps>;

// ----------------------------------------------------------------------------

type SelectTagContainerContentProps = {
  tags: ReturnType<typeof React.Children.toArray>;
};

const SelectTagContainerContent = (props: SelectTagContainerContentProps) => {
  const { tags } = props;
  const { visibleCount } = useOverflowContainerContext();

  return (
    <>
      {visibleCount < tags.length ? tags.slice(0, visibleCount - 1) : tags}

      <OverflowContainer.OverflowNode>
        <SelectTag label={`+${tags.length - visibleCount + 1} item(s)`} />
      </OverflowContainer.OverflowNode>
    </>
  );
};
