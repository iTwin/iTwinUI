/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgChevronRight from '@itwin/itwinui-icons-react/cjs/icons/ChevronRight';
import cx from 'classnames';
import React from 'react';
import { CommonProps } from '../utils/props';

import { useTheme } from '../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/expandable-block.css';

export type ExpandableBlockProps = {
  /**
   * The main text displayed on the block, regardless of state.
   */
  title: React.ReactNode;
  /**
   * Small note displayed above title, regardless of state.
   */
  caption?: React.ReactNode;
  /**
   * Whether or not to show the block's content.
   * @default false
   */
  isExpanded?: boolean;
  /**
   * Callback function for toggling an expansion state.
   */
  onToggle?: (isExpanding: boolean) => void;
  /**
   * Content in the expandable block.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * Container that allows content to be hidden behind a brief title and a caption.
 * @example
 * <ExpandableBlock title='Basic Block'>Content in block!</ExpandableBlock>
 * <ExpandableBlock title='Basic Block' caption='basic caption'>Content in block!</ExpandableBlock>
 * <ExpandableBlock title='Default Expanded Block' caption='basic caption' isExpanded={true}>Content in block!</ExpandableBlock>
 */
export const ExpandableBlock = (props: ExpandableBlockProps) => {
  const {
    caption,
    children,
    className,
    title,
    onToggle,
    style,
    isExpanded = false,
    ...rest
  } = props;

  useTheme();

  const [expanded, setExpanded] = React.useState(isExpanded);

  React.useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle?.(!expanded);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'Spacebar'
    ) {
      handleToggle();
    }
  };

  return (
    <div
      className={cx(
        'iui-expandable-block',
        { 'iui-with-caption': !!caption },
        { 'iui-expanded': expanded },
        className,
      )}
      style={style}
      {...rest}
    >
      <div
        aria-expanded={expanded}
        className='iui-header'
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={onKeyDown}
      >
        <SvgChevronRight className='iui-icon' />
        <div className='iui-title'>{title}</div>
        {caption && <div className='iui-caption'>{caption}</div>}
      </div>
      <div className='iui-content'>{children}</div>
    </div>
  );
};

export default ExpandableBlock;
