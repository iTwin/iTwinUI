/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import {
  StatusIconMap,
  SvgChevronRight,
  Box,
  useSafeContext,
  polymorphic,
  mergeEventHandlers,
  ButtonBase,
  useId,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Icon } from '../Icon/Icon.js';
import { LinkBox } from '../LinkAction/LinkAction.js';

const ExpandableBlockContext = React.createContext<
  | ({
      setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
      descriptionId: string | undefined;
      setDescriptionId: React.Dispatch<
        React.SetStateAction<string | undefined>
      >;
    } & ExpandableBlockOwnProps)
  | undefined
>(undefined);
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockContext.displayName = 'ExpandableBlockContext';
}

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
} & Pick<ExpandableBlockTriggerOwnProps, 'caption' | 'endIcon'>;

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
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockComponent.displayName = 'ExpandableBlock';
}

// ----------------------------------------------------------------------------

export const ExpandableBlockWrapper = React.forwardRef(
  (props, forwardedRef) => {
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

    const [descriptionId, setDescriptionId] = React.useState<
      string | undefined
    >(undefined);

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
          descriptionId,
          setDescriptionId,
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
  },
) as PolymorphicForwardRefComponent<'div', ExpandableBlockOwnProps>;
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockWrapper.displayName = 'ExpandableBlock.Wrapper';
}

// ----------------------------------------------------------------------------
// ExpandableBlock.Trigger component
type ExpandableBlockTriggerOwnProps = {
  label?: React.ReactNode;
  caption?: React.ReactNode;
  expandIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export const ExpandableBlockTrigger = React.forwardRef(
  (props, forwardedRef) => {
    const {
      className,
      children,
      label,
      caption,
      expandIcon,
      endIcon,
      ...rest
    } = props;
    const { disabled, status } = useSafeContext(ExpandableBlockContext);

    return (
      <LinkBox
        className={cx('iui-expandable-header', className)}
        data-iui-disabled={disabled ? 'true' : undefined}
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
      </LinkBox>
    );
  },
) as PolymorphicForwardRefComponent<'div', ExpandableBlockTriggerOwnProps>;
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockTrigger.displayName = 'ExpandableBlock.Trigger';
}

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
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockExpandIcon.displayName = 'ExpandableBlock.ExpandIcon';
}

// ----------------------------------------------------------------------------
// ExpandableBlock.LabelArea component

const ExpandableBlockLabelArea = polymorphic.span('iui-expandable-block-label');
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockLabelArea.displayName = 'ExpandableBlock.LabelArea';
}

// ----------------------------------------------------------------------------
// ExpandableBlock.Title component

const ExpandableBlockTitle = React.forwardRef((props, forwardedRef) => {
  const { className, children, onClick: onClickProp, ...rest } = props;

  const { isExpanded, setExpanded, disabled, onToggle, descriptionId } =
    useSafeContext(ExpandableBlockContext);

  return (
    <ButtonBase
      className={cx('iui-expandable-block-title', 'iui-link-action', className)}
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
      aria-describedby={descriptionId}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
}) as PolymorphicForwardRefComponent<'button'>;
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockTitle.displayName = 'ExpandableBlock.Title';
}

// ----------------------------------------------------------------------------
// ExpandableBlock.Caption component

const ExpandableBlockCaption = React.forwardRef((props, forwardedRef) => {
  const fallbackId = useId();

  const { setDescriptionId } = useSafeContext(ExpandableBlockContext);

  React.useEffect(() => {
    setDescriptionId(props.id || fallbackId);
    return () => setDescriptionId(undefined);
  }, [props.id, fallbackId, setDescriptionId]);

  return (
    <Box
      ref={forwardedRef}
      id={fallbackId}
      {...props}
      className={cx('iui-expandable-block-caption', props?.className)}
    />
  );
}) as PolymorphicForwardRefComponent<'div'>;
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockCaption.displayName = 'ExpandableBlock.Caption';
}

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
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockEndIcon.displayName = 'ExpandableBlock.EndIcon';
}

// ----------------------------------------------------------------------------
// ExpandableBlock.Content component
type ExpandableBlockContentOwnProps = {
  innerProps?: React.ComponentPropsWithoutRef<'div'>;
};

export const ExpandableBlockContent = React.forwardRef(
  (props, forwardedRef) => {
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
  },
) as PolymorphicForwardRefComponent<'div', ExpandableBlockContentOwnProps>;
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockContent.displayName = 'ExpandableBlock.Content';
}

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
