/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';

import {
  CommonProps,
  useTheme,
  StatusIconMap,
  WithCSSTransition,
  SvgChevronRight,
} from '../utils';
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
   * Status of the block.
   * When set, a colored status icon is shown at the end of the main text.
   */
  status?: 'positive' | 'negative' | 'warning' | 'informational';
  /**
   * Svg icon displayed at the end of the main text.
   * Will override status icon if specified.
   */
  endIcon?: JSX.Element;
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
  /**
   * Modify size of the ExpandableBlock.
   * @default 'default'
   */
  size?: 'default' | 'small';
  /**
   * Style of the ExpandableBlock.
   * Use 'borderless' to hide outline.
   * @default 'default'
   */
  styleType?: 'default' | 'borderless';
} & Omit<CommonProps, 'title'>;

/**
 * Container that allows content to be hidden behind a brief title and a caption.
 * @example
 * <ExpandableBlock title='Basic Block'>Content in block!</ExpandableBlock>
 * <ExpandableBlock title='Basic Block' caption='basic caption'>Content in block!</ExpandableBlock>
 * <ExpandableBlock title='Default Expanded Block' caption='basic caption' isExpanded={true}>Content in block!</ExpandableBlock>
 * <ExpandableBlock title='Positive status' status='positive'>Content</ExpandableBlock>
 * <ExpandableBlock title='Block with icon' endIcon={<SvgPlaceholder />}>Content</ExpandableBlock>
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
    endIcon,
    status,
    size = 'default',
    styleType = 'default',
    ...rest
  } = props;

  useTheme();

  const icon = endIcon ?? (status && StatusIconMap[status]());

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
        {
          'iui-with-caption': !!caption,
          'iui-expanded': expanded,
          'iui-small': size === 'small',
          'iui-borderless': styleType === 'borderless',
        },
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
        <SvgChevronRight className='iui-icon' aria-hidden />
        <span className='iui-expandable-block-label'>
          <div className='iui-title'>{title}</div>
          {caption && <div className='iui-caption'>{caption}</div>}
        </span>
        {icon &&
          React.cloneElement(icon, {
            className: cx('iui-status-icon', icon.props.className),
            'data-iui-icon-color': status,
          })}
      </div>
      <WithCSSTransition in={expanded}>
        <div className='iui-expandable-content'>
          <div>{children}</div>
        </div>
      </WithCSSTransition>
    </div>
  );
};

export default ExpandableBlock;
