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
  OverflowContainerContext,
} from '../../utils/components/OverflowContainer.js';

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

  return (
    <OverflowContainer
      items={tags}
      className={cx('iui-select-tag-container', className)}
      ref={ref}
      {...rest}
    >
      <SelectTagContainerContent {...props} />
    </OverflowContainer>
  );
}) as PolymorphicForwardRefComponent<'div', SelectTagContainerProps>;

// ----------------------------------------------------------------------------

const SelectTagContainerContent = (props: SelectTagContainerProps) => {
  const { tags } = props;
  const visibleCount =
    React.useContext(OverflowContainerContext)?.visibleCount ?? tags.length;

  return (
    <>
      {visibleCount < tags.length ? tags.slice(0, visibleCount - 1) : tags}

      <OverflowContainer.OverflowNode>
        <SelectTag label={`+${tags.length - visibleCount + 1} item(s)`} />
      </OverflowContainer.OverflowNode>
    </>
  );
};
