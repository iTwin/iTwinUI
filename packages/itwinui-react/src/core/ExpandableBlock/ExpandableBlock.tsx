/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import {
  StatusIconMap,
  SvgChevronRight,
  Icon,
  Box,
  useSafeContext,
  polymorphic,
  mergeEventHandlers,
  ButtonBase,
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

const ExpandableBlockContext = React.createContext<
  | ({
      setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    } & ExpandableBlockOwnProps)
  | undefined
>(undefined);
ExpandableBlockContext.displayName = 'ExpandableBlockContext';

// ----------------------------------------------------------------------------
// Main ExpandableBlock component

type ExpandableBlockOwnProps = {
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

type ExpandableBlockLegacyProps = {
  title?: React.ReactNode;
} & Pick<ExpandableBlockHeaderOwnProps, 'caption' | 'endIcon'>;

const ExpandableBlockComponent = React.forwardRef((props, forwardedRef) => {
  const { children, title, caption, endIcon, ...rest } = props;
  return (
    <ExpandableBlock.Wrapper {...rest} ref={forwardedRef}>
      <ExpandableBlock.Trigger
        label={title}
        caption={caption}
        endIcon={endIcon}
      />
      <ExpandableBlock.Content>{children}</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>
  );
}) as PolymorphicForwardRefComponent<
  'div',
  ExpandableBlockOwnProps & ExpandableBlockLegacyProps
>;
ExpandableBlockComponent.displayName = 'ExpandableBlock';

// ----------------------------------------------------------------------------

const ExpandableBlockWrapper = React.forwardRef((props, forwardedRef) => {
  const {
    children,
    className,
    onToggle,
    style,
    isExpanded,
    status,
    size = 'default',
    styleType = 'default',
    disabled = false,
    ...rest
  } = props;

  const [expandedState, setExpanded] = React.useState(isExpanded ?? false);
  const expanded = isExpanded ?? expandedState;

  return (
    <ExpandableBlockContext.Provider
      value={{
        status,
        isExpanded: expanded,
        onToggle,
        size,
        styleType,
        disabled,
        setExpanded,
        children,
      }}
    >
      <Box
        className={cx('iui-expandable-block', className)}
        data-iui-expanded={expanded}
        data-iui-size={size}
        data-iui-variant={styleType !== 'default' ? styleType : undefined}
        style={style}
        ref={forwardedRef}
        {...rest}
      >
        {children}
      </Box>
    </ExpandableBlockContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', ExpandableBlockOwnProps>;
ExpandableBlockWrapper.displayName = 'ExpandableBlock.Wrapper';

// ----------------------------------------------------------------------------
// ExpandableBlock.Header component
type ExpandableBlockHeaderOwnProps = {
  label?: React.ReactNode;
  caption?: React.ReactNode;
  expandIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

const ExpandableBlockTrigger = React.forwardRef((props, forwardedRef) => {
  const {
    className,
    children,
    label,
    caption,
    onClick: onClickProp,
    expandIcon,
    endIcon,
    ...rest
  } = props;
  const { isExpanded, setExpanded, disabled, onToggle, status } =
    useSafeContext(ExpandableBlockContext);

  return (
    <ButtonBase
      className={cx('iui-expandable-header', className)}
      aria-expanded={isExpanded}
      aria-disabled={disabled}
      onClick={mergeEventHandlers(onClickProp, () => {
        if (disabled) {
          return;
        }
        setExpanded(!isExpanded);
        onToggle?.(!isExpanded);
      })}
      ref={forwardedRef}
      {...rest}
    >
      {children ?? (
        <>
          {expandIcon ?? <ExpandableBlock.ExpandIcon />}
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>{label}</ExpandableBlock.Title>
            {caption && (
              <ExpandableBlock.Caption>{caption}</ExpandableBlock.Caption>
            )}
          </ExpandableBlock.LabelArea>
          {endIcon || status ? (
            <ExpandableBlock.EndIcon>{endIcon}</ExpandableBlock.EndIcon>
          ) : null}
        </>
      )}
    </ButtonBase>
  );
}) as PolymorphicForwardRefComponent<'button', ExpandableBlockHeaderOwnProps>;
ExpandableBlockTrigger.displayName = 'ExpandableBlock.Trigger';

// ----------------------------------------------------------------------------
// ExpandableBlock.ExpandIcon component

const ExpandableBlockExpandIcon = React.forwardRef((props, forwardedRef) => {
  const { className, children, ...rest } = props;
  return (
    <Icon
      className={cx('iui-expandable-block-icon', className)}
      ref={forwardedRef}
      {...rest}
    >
      {children ?? <SvgChevronRight aria-hidden />}
    </Icon>
  );
}) as PolymorphicForwardRefComponent<'span'>;
ExpandableBlockExpandIcon.displayName = 'ExpandableBlock.ExpandIcon';

// ----------------------------------------------------------------------------
// ExpandableBlock.LabelArea component

const ExpandableBlockLabelArea = polymorphic.span('iui-expandable-block-label');
ExpandableBlockLabelArea.displayName = 'ExpandableBlock.LabelArea';

// ----------------------------------------------------------------------------
// ExpandableBlock.Title component

const ExpandableBlockTitle = React.forwardRef((props, forwardedRef) => {
  const { className, children, ...rest } = props;
  return (
    <Box
      className={cx('iui-expandable-block-title', className)}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;
ExpandableBlockTitle.displayName = 'ExpandableBlock.Title';

// ----------------------------------------------------------------------------
// ExpandableBlock.Caption component

const ExpandableBlockCaption = polymorphic('iui-expandable-block-caption');
ExpandableBlockCaption.displayName = 'ExpandableBlock.Caption';

// ----------------------------------------------------------------------------
// ExpandableBlock.EndIcon component

const ExpandableBlockEndIcon = React.forwardRef((props, forwardedRef) => {
  const { children, ...rest } = props;
  const { status } = useSafeContext(ExpandableBlockContext);

  const icon = children ?? (status && StatusIconMap[status]());
  return (
    <Icon fill={status} ref={forwardedRef} {...rest}>
      {icon}
    </Icon>
  );
}) as PolymorphicForwardRefComponent<
  'span',
  React.ComponentPropsWithoutRef<typeof Icon>
>;
ExpandableBlockEndIcon.displayName = 'ExpandableBlock.EndIcon';

// ----------------------------------------------------------------------------
// ExpandableBlock.Content component
type ExpandableBlockContentOwnProps = {
  innerProps?: React.ComponentPropsWithoutRef<'div'>;
};

const ExpandableBlockContent = React.forwardRef((props, forwardedRef) => {
  const { className, children, innerProps, ...rest } = props;

  return (
    <Box
      className={cx('iui-expandable-content', className)}
      ref={forwardedRef}
      {...rest}
    >
      <Box {...innerProps}>{children}</Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', ExpandableBlockContentOwnProps>;
ExpandableBlockContent.displayName = 'ExpandableBlock.Content';

/**
 * Expandable block with customizable Title, Caption, Content and EndIcon subcomponents.
 * @example
 *  <ExpandableBlock.Wrapper>
 *    <ExpandableBlock.Trigger>
 *      <ExpandableBlock.ExpandIcon/>
 *      <ExpandableBlock.LabelArea>
 *        <ExpandableBlock.Title/>
 *        <ExpandableBlock.Caption/>
 *      </ExpandableBlock.LabelArea>
 *      <ExpandableBlock.EndIcon/>
 *    </ExpandableBlock.Trigger>
 *    <ExpandableBlock.Content/>
 *  </ExpandableBlock.Wrapper>
 */
export const ExpandableBlock = Object.assign(ExpandableBlockComponent, {
  Wrapper: ExpandableBlockWrapper,
  /**
   * `Header` container that contains `ExpandIcon`, `LabelArea` and `EndIcon` subcomponents
   * @example
   * <ExpandableBlock.Trigger>
   *    <ExpandableBlock.ExpandIcon/>
   *    <ExpandableBlock.LabelArea/>
   *    <ExpandableBlock.EndIcon/>
   * </ExpandableBlock.Trigger>
   */
  Trigger: ExpandableBlockTrigger,
  /**
   * The expanding icon on the left of header
   */
  ExpandIcon: ExpandableBlockExpandIcon,
  /**
   * `LabelArea` subcomponent that contains `Title` and `Caption`
   * @example
   * <ExpandableBlock.LabelArea>
   *    <ExpandableBLock.Title> Title </ExpandableBlock.Title>
   *    <ExpandableBlock.Caption> Caption </ExpandableBlock.Caption>
   * </ExpandableBlock.LabelArea>
   */
  LabelArea: ExpandableBlockLabelArea,
  /**
   * The main text displayed on the block header, regardless of state.
   */
  Title: ExpandableBlockTitle,
  /**
   * Small note displayed below title, regardless of state.
   */
  Caption: ExpandableBlockCaption,
  /**
   * Svg icon displayed at the end of the main text.
   * Will override status icon if specified. Used inside `Header` subcomponent.
   * @example
   * <ExpandableBlock.Trigger>
   *    <ExpandableBlock.EndIcon> <SvgIcon/> </ExpandableBlock.EndIcon>
   * <ExpandableBlock.Trigger/>
   */
  EndIcon: ExpandableBlockEndIcon,
  /**
   * Content shown in the block's body when fully expanded.
   * @example
   * <ExpandableBlock.Wrapper>
   *    <ExpandableBlock.Content> Content </ExpandableBlock.Content>
   * </ExpandableBlock.Wrapper>
   */
  Content: ExpandableBlockContent,
});

export default ExpandableBlock;
