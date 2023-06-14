/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import {
  // StatusIconMap,
  WithCSSTransition,
  SvgChevronRight,
  // Icon,
  Box,
  useSafeContext,
  polymorphic,
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

const ExpandableBlockContext = React.createContext<
  | {
      /**
       * Status of the block.
       * When set, a colored status icon is shown at the end of the main text.
       */
      status?: 'positive' | 'negative' | 'warning' | 'informational';
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
    }
  | undefined
>(undefined);
ExpandableBlockContext.displayName = 'ExpandableBlockContext';

// ----------------------------------------------------------------------------
// Main ExpandableBlock component

type ExpandableBlockOwnProps = {
  /**
   * The main text displayed on the block, regardless of state.
   */
  // title: React.ReactNode;
  /**
   * Small note displayed above title, regardless of state.
   */
  // caption?: React.ReactNode;
  /**
   * Status of the block.
   * When set, a colored status icon is shown at the end of the main text.
   */
  status?: 'positive' | 'negative' | 'warning' | 'informational';
  /**
   * Svg icon displayed at the end of the main text.
   * Will override status icon if specified.
   */
  // endIcon?: JSX.Element;
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
const ExpandableBlockComponent = React.forwardRef((props, forwardedRef) => {
  const {
    // caption,
    children,
    className,
    // title,
    onToggle,
    style,
    isExpanded,
    // endIcon,
    status,
    size = 'default',
    styleType = 'default',
    disabled = false,
    ...rest
  } = props;

  // const icon = endIcon ?? (status && StatusIconMap[status]());

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
    <ExpandableBlockContext.Provider
      value={{
        status,
        isExpanded,
        onToggle,
        size,
        styleType,
        disabled,
      }}
    >
      <Box
        className={cx(
          'iui-expandable-block',
          {
            'iui-expanded': expanded,
            'iui-small': size === 'small',
            'iui-borderless': styleType === 'borderless',
          },
          className,
        )}
        style={style}
        aria-expanded={expanded}
        onClick={handleToggle}
        onKeyDown={onKeyDown}
        ref={forwardedRef}
        {...rest}
      >
        {children}
        {/* <Box
          role='button'
          aria-expanded={expanded}
          className='iui-header'
          aria-disabled={disabled}
          tabIndex={0}
          onClick={handleToggle}
          onKeyDown={onKeyDown}
        > */}
        {/* <SvgChevronRight className='iui-icon' aria-hidden /> */}
        {/* <Box as='span' className='iui-expandable-block-label'>
            <Box className='iui-title'>{title}</Box>
            {caption && <Box className='iui-caption'>{caption}</Box>}
          </Box>
          {icon && <Icon fill={status}>{icon}</Icon>} */}
        {/* </Box> */}
        {/* <WithCSSTransition in={expanded}>
          <Box className='iui-expandable-content'>
            <div>{children}</div>
          </Box>
        </WithCSSTransition> */}
      </Box>
    </ExpandableBlockContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', ExpandableBlockOwnProps>;
ExpandableBlockComponent.displayName = 'ExpandableBlock';

// ----------------------------------------------------------------------------
// ExpandableBlock.Header component

const ExpandableBlockHeader = React.forwardRef((props, forwardedRef) => {
  const { className, children, ...rest } = props;
  const { disabled } = useSafeContext(ExpandableBlockContext);

  // const [expanded, setExpanded] = React.useState(isExpanded);
  // React.useEffect(() => {
  //   setExpanded(isExpanded);
  // }, [isExpanded]);

  // const handleToggle = () => {
  //   if (disabled) {
  //     return;
  //   }
  //   setExpanded(!expanded);
  //   onToggle?.(!expanded);
  // };

  // const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
  //   if (event.altKey || disabled) {
  //     return;
  //   }

  //   if (
  //     event.key === 'Enter' ||
  //     event.key === ' ' ||
  //     event.key === 'Spacebar'
  //   ) {
  //     handleToggle();
  //   }
  // };
  return (
    <Box
      className={cx('iui-header', className)}
      role='button'
      // aria-expanded={expanded}
      aria-disabled={disabled}
      tabIndex={0}
      // onClick={handleToggle}
      // onKeyDown={onKeyDown}
      ref={forwardedRef}
      {...rest}
    >
      <SvgChevronRight className='iui-icon' aria-hidden />
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;
ExpandableBlockHeader.displayName = 'ExpandableBlock.Header';

// ----------------------------------------------------------------------------
// ExpandableBlock.LabelArea component

const ExpandableBlockLabelArea = polymorphic.span('iui-expandable-block-label');
ExpandableBlockLabelArea.displayName = 'ExpandableBlock.LabelArea';

// ----------------------------------------------------------------------------
// ExpandableBlock.Title component

const ExpandableBlockTitle = React.forwardRef((props, forwardedRef) => {
  const { className, children, ...rest } = props;
  return (
    <Box className={cx('iui-title', className)} ref={forwardedRef} {...rest}>
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;
ExpandableBlockTitle.displayName = 'ExpandableBlock.Title';

// ----------------------------------------------------------------------------
// ExpandableBlock.Caption component

const ExpandableBlockCaption = polymorphic('iui-caption');
ExpandableBlockCaption.displayName = 'ExpandableBlock.Caption';

// ----------------------------------------------------------------------------
// ExpandableBlock.EndIcon component

const ExpandableBlockEndIcon = React.forwardRef((props, forwardedRef) => {
  const { className, children, ...rest } = props;
  return (
    <Box className={cx('iui-title', className)} ref={forwardedRef} {...rest}>
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;
ExpandableBlockEndIcon.displayName = 'ExpandableBlock.EndIcon';

// ----------------------------------------------------------------------------
// ExpandableBlock.Content component

const ExpandableBlockContent = React.forwardRef((props, forwardedRef) => {
  const { className, children, ...rest } = props;

  // const { isExpanded } = useSafeContext(ExpandableBlockContext);
  return (
    <WithCSSTransition in={true}>
      <Box
        className={cx('iui-expandable-content', className)}
        ref={forwardedRef}
        {...rest}
      >
        {children}
      </Box>
    </WithCSSTransition>
  );
}) as PolymorphicForwardRefComponent<'div'>;
ExpandableBlockContent.displayName = 'ExpandableBlock.Content';

/**
 * jsdocs here
 */
export const ExpandableBlock = Object.assign(ExpandableBlockComponent, {
  /**
   * stuf n things
   */
  Header: ExpandableBlockHeader,
  /**
   * stuf n things
   */
  LabelArea: ExpandableBlockLabelArea,
  /**
   * stuf n things
   */
  Title: ExpandableBlockTitle,
  /**
   * stuf n things
   */
  Caption: ExpandableBlockCaption,
  /**
   * stuf n things
   */
  EndIcon: ExpandableBlockEndIcon,
  /**
   * stuf n things
   */
  Content: ExpandableBlockContent,
});

export default ExpandableBlock;
