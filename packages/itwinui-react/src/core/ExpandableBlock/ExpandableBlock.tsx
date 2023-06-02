/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import {
  StatusIconMap,
  WithCSSTransition,
  SvgChevronRight,
  Icon,
  Box,
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import '@itwin/itwinui-css/css/expandable-block.css';

type ExpandableBlockProps = {
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
  /**
   * Disables ExpandableBlock.
   * @default false
   */
  disabled?: boolean;
};

/**
 * Container that allows content to be hidden behind a brief title and a caption.
 * @example
 * <ExpandableBlock title='Basic Block'>Content in block!</ExpandableBlock>
 * <ExpandableBlock title='Basic Block' caption='basic caption'>Content in block!</ExpandableBlock>
 * <ExpandableBlock title='Default Expanded Block' caption='basic caption' isExpanded={true}>Content in block!</ExpandableBlock>
 * <ExpandableBlock title='Positive status' status='positive'>Content</ExpandableBlock>
 * <ExpandableBlock title='Block with icon' endIcon={<SvgPlaceholder />}>Content</ExpandableBlock>
 */
export const ExpandableBlock = React.forwardRef((props, ref) => {
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
    disabled = false,
    ...rest
  } = props;

  const icon = endIcon ?? (status && StatusIconMap[status]());

  const [expanded, setExpanded] = React.useState(isExpanded);
  React.useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  const handleToggle = () => {
    if (disabled) {
      return;
    }
    setExpanded(!expanded);
    onToggle?.(!expanded);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || disabled) {
      return;
    }

    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'Spacebar'
    ) {
      handleToggle();
    }
  };

  return (
    <Box
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
      ref={ref}
      {...rest}
    >
      <Box
        role='button'
        aria-expanded={expanded}
        className='iui-header'
        aria-disabled={disabled}
        tabIndex={0}
        onClick={() => handleToggle()}
        onKeyDown={onKeyDown}
      >
        <SvgChevronRight className='iui-icon' aria-hidden />
        <Box as='span' className='iui-expandable-block-label'>
          <Box className='iui-title'>{title}</Box>
          {caption && <Box className='iui-caption'>{caption}</Box>}
        </Box>
        {icon && <Icon fill={status}>{icon}</Icon>}
      </Box>
      <WithCSSTransition in={expanded}>
        <Box className='iui-expandable-content'>
          <div>{children}</div>
        </Box>
      </WithCSSTransition>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', ExpandableBlockProps>;

export default ExpandableBlock;
