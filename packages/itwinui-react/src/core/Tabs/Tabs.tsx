/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import * as ReactDOM from 'react-dom';
import cx from 'classnames';
import {
  useSafeContext,
  Box,
  polymorphic,
  useIsClient,
  useIsomorphicLayoutEffect,
  useMergedRefs,
  useContainerWidth,
  useResizeObserver,
  ButtonBase,
  mergeEventHandlers,
} from '../utils/index.js';
import { Icon } from '../Icon/Icon.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

// ----------------------------------------------------------------------------
// TabsWrapper

type OverflowOptions = {
  /**
   * Whether to allow tabs list to scroll when there is overflow,
   * i.e. when there is not enough space to fit all the tabs.
   *
   * Not applicable to types `pill` and `borderless`.
   */
  useOverflow?: boolean;
};

type TabsOverflowProps =
  | {
      /**
       * Options that can be specified to deal with tabs overflowing the allotted space.
       */
      overflowOptions?: OverflowOptions;
      type?: 'default';
    }
  | {
      overflowOptions?: undefined;
      type: 'pill' | 'borderless';
    };

type TabsOrientationProps =
  | {
      /**
       * Orientation of the tabs.
       * @default 'horizontal'
       */
      orientation?: 'horizontal';
      /**
       * Type of the tabs.
       *
       * If `orientation = 'vertical'`, `pill` is not applicable.
       * @default 'default'
       */
      type?: 'default' | 'borderless' | 'pill';
    }
  | {
      orientation: 'vertical';
      type?: 'default' | 'borderless';
    };

type TabsWrapperOwnProps = TabsOrientationProps & TabsOverflowProps;

const TabsWrapper = React.forwardRef((props, ref) => {
  // Separate overflowOptions from props to avoid adding it to the DOM (using {...rest})
  let overflowOptions: OverflowOptions | undefined;
  if (
    props.type !== 'borderless' &&
    props.type !== 'pill' &&
    props.overflowOptions
  ) {
    overflowOptions = props.overflowOptions;
    props = { ...props };
    delete props.overflowOptions;
  }

  const {
    className,
    children,
    orientation = 'horizontal',
    type = 'default',
    ...rest
  } = props;

  const [activeValue, setActiveValue] = React.useState<string | undefined>();
  const [stripeProperties, setStripeProperties] = React.useState({});

  return (
    <Box
      className={cx('iui-tabs-wrapper', `iui-${orientation}`, className)}
      style={stripeProperties}
      ref={ref}
      {...rest}
    >
      <TabsContext.Provider
        value={{
          orientation,
          type,
          activeValue,
          setActiveValue,
          overflowOptions,
          setStripeProperties,
        }}
      >
        {children}
      </TabsContext.Provider>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TabsWrapperOwnProps>;
TabsWrapper.displayName = 'Tabs.Wrapper';

// ----------------------------------------------------------------------------
// Tabs.TabList component

type TabListOwnProps = {
  /**
   * Color of the bar on the active tab.
   * @default 'blue'
   */
  color?: 'blue' | 'green';
  /**
   * Control whether focusing tabs (using arrow keys) should automatically select them.
   * Use 'manual' if tab panel content is not preloaded.
   * @default 'auto'
   */
  focusActivationMode?: 'auto' | 'manual';
  /**
   * Tab items.
   */
  children: React.ReactNode[];
};

const TabList = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    color = 'blue',
    focusActivationMode = 'auto',
    ...rest
  } = props;

  const { orientation, type, overflowOptions } = useSafeContext(TabsContext);

  const isClient = useIsClient();
  const tablistRef = React.useRef<HTMLDivElement>(null);
  const [tablistSizeRef, tabsWidth] = useContainerWidth(type !== 'default');
  const refs = useMergedRefs(ref, tablistRef, tablistSizeRef);
  const [hasSublabel, setHasSublabel] = React.useState(false); // used for setting size

  const [scrollingPlacement, setScrollingPlacement] = React.useState<
    string | undefined
  >(undefined);

  const determineScrollingPlacement = React.useCallback(() => {
    const ownerDoc = tablistRef.current;
    if (ownerDoc === null) {
      return;
    }

    const isVertical = orientation === 'vertical';
    const visibleStart = isVertical ? ownerDoc.scrollTop : ownerDoc.scrollLeft;
    const visibleEnd = isVertical
      ? ownerDoc.scrollTop + ownerDoc.offsetHeight
      : ownerDoc.scrollLeft + ownerDoc.offsetWidth;
    const totalTabsSpace = isVertical
      ? ownerDoc.scrollHeight
      : ownerDoc.scrollWidth;

    if (
      Math.abs(visibleStart) < 1 &&
      Math.abs(visibleEnd - totalTabsSpace) < 1
    ) {
      setScrollingPlacement(undefined);
    } else if (Math.abs(visibleStart) < 1) {
      setScrollingPlacement('start');
    } else if (Math.abs(visibleEnd - totalTabsSpace) < 1) {
      setScrollingPlacement('end');
    } else {
      setScrollingPlacement('center');
    }
  }, [orientation, setScrollingPlacement]);

  // apply correct mask when tabs list is resized
  const [resizeRef] = useResizeObserver(determineScrollingPlacement);
  resizeRef(tablistRef?.current);

  // check if overflow tabs are scrolled to far edges
  React.useEffect(() => {
    const ownerDoc = tablistRef.current;
    if (ownerDoc === null) {
      return;
    }

    if (!overflowOptions?.useOverflow) {
      ownerDoc.removeEventListener('scroll', determineScrollingPlacement);
      return;
    }

    ownerDoc.addEventListener('scroll', determineScrollingPlacement);
  }, [overflowOptions?.useOverflow, determineScrollingPlacement]);

  return (
    <Box
      className={cx(
        'iui-tabs',
        `iui-${type}`,
        {
          'iui-green': color === 'green',
          'iui-animated': type !== 'default' && isClient,
          'iui-not-animated': type !== 'default' && !isClient,
          'iui-large': hasSublabel,
        },
        className,
      )}
      data-iui-overflow={overflowOptions?.useOverflow}
      data-iui-scroll-placement={scrollingPlacement}
      role='tablist'
      ref={refs}
      {...rest}
    >
      <TabListContext.Provider
        value={{
          focusActivationMode,
          hasSublabel,
          setHasSublabel,
          tabsWidth,
        }}
      >
        {children}
      </TabListContext.Provider>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TabListOwnProps>;
TabList.displayName = 'Tabs.TabList';

// ----------------------------------------------------------------------------
// Tabs.Tab component

type TabOwnProps = {
  /**
   * Value used to associate the tab with a given panel.
   */
  value: string;
  /**
   * Tab label used for simple Tab construction.
   * Cannot be used with tabs that have icons or descriptions.
   */
  label?: string | React.ReactNode;
  /**
   * Flag whether the tab is active.
   * @default 'false'
   */
  isActive?: boolean;
  /**
   * Callback fired when the isActive prop changes.
   */
  onActiveChange?: () => void;
};

const TabHeader = React.forwardRef((props, forwardedRef) => {
  const {
    className,
    children,
    value,
    label,
    isActive: isActiveProp,
    onActiveChange: onActiveChangeProp,
    onClick: onClickProp,
    ...rest
  } = props;

  const {
    orientation,
    activeValue: activeValueState,
    setActiveValue: setActiveValueState,
    type,
    setStripeProperties,
  } = useSafeContext(TabsContext);
  const { focusActivationMode, tabsWidth } = useSafeContext(TabListContext);
  const tabRef = React.useRef<HTMLButtonElement>();

  const isActive =
    isActiveProp !== undefined ? isActiveProp : activeValueState === value;

  const onActiveChange = React.useCallback(() => {
    setActiveValueState(value);
    onActiveChangeProp?.();
  }, [setActiveValueState, value, onActiveChangeProp]);

  useIsomorphicLayoutEffect(() => {
    if (isActive) {
      tabRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [isActive]);

  // CSS custom properties to place the active stripe
  useIsomorphicLayoutEffect(() => {
    if (type !== 'default' && isActive) {
      const currentTabRect = tabRef.current?.getBoundingClientRect();
      setStripeProperties({
        ...(orientation === 'horizontal' && {
          '--stripe-width': `${currentTabRect?.width}px`,
          '--stripe-left': `${tabRef.current?.offsetLeft}px`,
        }),
        ...(orientation === 'vertical' && {
          '--stripe-height': `${currentTabRect?.height}px`,
          '--stripe-top': `${tabRef.current?.offsetTop}px`,
        }),
      });
    }
  }, [type, orientation, tabsWidth]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.altKey) {
      return;
    }
    const allTabs = Array.from(
      event.currentTarget.parentElement?.children ?? [],
    );

    /** focus next tab if delta is +1, previous tab if -1 */
    const focusTab = (delta = +1) => {
      const currentTab = event.currentTarget as Element;

      let nextTab: Element | undefined = currentTab;
      if (delta === +1) {
        nextTab = nextTab?.nextElementSibling ?? allTabs?.at(0);
      } else if (delta === -1) {
        nextTab = nextTab?.previousElementSibling ?? allTabs?.at(-1);
      }

      if (nextTab instanceof HTMLElement) {
        nextTab?.focus();

        if (focusActivationMode === 'auto') {
          ReactDOM.flushSync(() => {
            onActiveChange?.(); // TODO: fix this (stale state)
          });
        }
      }
    };

    switch (event.key) {
      case 'ArrowDown': {
        if (orientation === 'vertical') {
          focusTab(+1);
          event.preventDefault();
        }
        break;
      }
      case 'ArrowRight': {
        if (orientation === 'horizontal') {
          focusTab(+1);
          event.preventDefault();
        }
        break;
      }
      case 'ArrowUp': {
        if (orientation === 'vertical') {
          focusTab(-1);
          event.preventDefault();
        }
        break;
      }
      case 'ArrowLeft': {
        if (orientation === 'horizontal') {
          focusTab(-1);
          event.preventDefault();
        }
        break;
      }
      default:
        break;
    }
  };

  // use first tab as active if no `isActive` passed.
  const setInitialActiveRef = React.useCallback(
    (element: HTMLElement) => {
      if (activeValueState !== undefined) {
        return;
      }

      if (element?.matches(':first-of-type')) {
        setActiveValueState(value);
      }
    },
    [activeValueState, setActiveValueState, value],
  );

  return (
    <ButtonBase
      className={cx('iui-tab', { 'iui-active': isActive }, className)}
      role='tab'
      tabIndex={isActive ? 0 : -1}
      onClick={mergeEventHandlers(onClickProp, () => onActiveChange?.())}
      onKeyDown={onKeyDown}
      aria-selected={isActive}
      aria-controls={value}
      ref={useMergedRefs(tabRef, forwardedRef, setInitialActiveRef)}
      {...rest}
    >
      {label ? <Tabs.TabLabel>{label}</Tabs.TabLabel> : children}
    </ButtonBase>
  );
}) as PolymorphicForwardRefComponent<'button', TabOwnProps>;
TabHeader.displayName = 'Tabs.Tab';

// ----------------------------------------------------------------------------
// Tabs.TabIcon component

const TabIcon = React.forwardRef((props, ref) => {
  return (
    <Icon
      {...props}
      className={cx('iui-tab-icon', props?.className)}
      ref={ref}
    />
  );
}) as PolymorphicForwardRefComponent<'span', React.ComponentProps<typeof Icon>>;
TabIcon.displayName = 'Tabs.TabIcon';

// ----------------------------------------------------------------------------
// Tabs.TabLabel component

const TabLabel = polymorphic.span('iui-tab-label');
TabLabel.displayName = 'Tabs.TabLabel';

// ----------------------------------------------------------------------------
// Tabs.TabDescription component

const TabDescription = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  const { hasSublabel, setHasSublabel } = useSafeContext(TabListContext);

  React.useEffect(() => {
    if (!hasSublabel) {
      setHasSublabel(true);
    }
  }, [hasSublabel, setHasSublabel]);

  return (
    <Box
      as='span'
      className={cx('iui-tab-description', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'span'>;
TabDescription.displayName = 'Tabs.TabDescription';

// ----------------------------------------------------------------------------
// Tabs.Actions component

type TabsActionsOwnProps = {
  /**
   * Passes props to the wrapper component for the actions
   */
  wrapperProps?: React.ComponentPropsWithRef<'div'>;
};

const TabsActions = React.forwardRef((props, ref) => {
  const { wrapperProps, className, children, ...rest } = props;

  return (
    <Box
      {...wrapperProps}
      className={cx('iui-tabs-actions-wrapper', wrapperProps?.className)}
    >
      <Box className={cx('iui-tabs-actions', className)} ref={ref} {...rest}>
        {children}
      </Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TabsActionsOwnProps>;
TabsActions.displayName = 'Tabs.Actions';

// ----------------------------------------------------------------------------
// Tabs.Panel component

type TabsPanelOwnProps = {
  /**
   * Value used to associate the panel with a given tab.
   */
  value: string;
};

const TabsPanel = React.forwardRef((props, ref) => {
  const { value, className, children, ...rest } = props;

  const { activeValue } = useSafeContext(TabsContext);

  return (
    <Box
      className={cx('iui-tabs-content', className)}
      // aria-labelledby={``}
      role='tabpanel'
      data-iui-hidden={activeValue !== value ? true : undefined}
      id={value}
      ref={ref}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TabsPanelOwnProps>;
TabsPanel.displayName = 'Tabs.Panel';

// ----------------------------------------------------------------------------
// Tabs legacy component

type TabsLegacyProps = {
  /**
   * Content displayed to the right/bottom of the horizontal/vertical tabs
   *
   * If `type = 'pill'`, `actions` is not applicable.
   */
  actions?: React.ReactNode[];
  /**
   * Elements shown for each tab.
   * Recommended to pass an array of `Tab` components.
   */
  labels: React.ReactNode[];
  /**
   * Handler for activating a tab.
   */
  onTabSelected?: (index: number) => void;
  /**
   * Index of the active tab.
   */
  activeIndex?: number;
  /**
   * Control whether focusing tabs (using arrow keys) should automatically select them.
   * Use 'manual' if tab panel content is not preloaded.
   * @default 'auto'
   */
  focusActivationMode?: 'auto' | 'manual';
  /**
   * Color of the bar on the active tab.
   * @default 'blue'
   */
  color?: 'blue' | 'green';
  /**
   * Custom CSS class name for tabs.
   */
  tabsClassName?: string;
  /**
   * Custom CSS class name for tab panel.
   */
  contentClassName?: string;
  /**
   * Custom CSS class name for the tabs wrapper.
   */
  wrapperClassName?: string;
  /**
   * Content inside the tab panel.
   */
  children?: React.ReactNode;
} & TabsOrientationProps &
  TabsOverflowProps;

const LegacyTabsComponent = React.forwardRef((props, forwardedRef) => {
  let actions: Array<React.ReactNode> | undefined;
  if (props.type !== 'pill' && props.actions) {
    actions = props.actions;
    props = { ...props };
    delete props.actions;
  }

  const {
    labels,
    onTabSelected,
    focusActivationMode,
    color,
    activeIndex,
    tabsClassName,
    contentClassName,
    wrapperClassName,
    children,
    ...rest
  } = props;

  const [currentActiveValue, setCurrentActiveValue] = React.useState<string>();

  const findActiveIndex = () => {
    return (
      labels.findIndex(
        (label, index) => currentActiveValue === `label-${index}`,
      ) ?? `label-0`
    );
  };

  return (
    <TabsWrapper className={wrapperClassName} {...rest}>
      <TabList
        color={color}
        className={tabsClassName}
        focusActivationMode={focusActivationMode}
        // activeValue={currentActiveValue}
        // setActiveValue={(value) => setCurrentActiveValue(value)}
        ref={forwardedRef}
      >
        {labels.map((label, index) => {
          const tabValue = `label-${index}`;
          return React.isValidElement(label) ? (
            React.cloneElement(label as JSX.Element, {
              value: tabValue,
              active: activeIndex === index || tabValue === currentActiveValue,
              onClick: (args: unknown) => {
                onTabSelected?.(index);
                setCurrentActiveValue(tabValue);
                label.props.onClick?.(args);
              },
            })
          ) : (
            <Tab
              key={index}
              value={tabValue}
              label={label}
              active={activeIndex === index || tabValue === currentActiveValue}
              onClick={() => {
                onTabSelected?.(index);
                setCurrentActiveValue(tabValue);
              }}
            />
          );
        })}
      </TabList>

      {actions && <TabsActions>{actions}</TabsActions>}

      {children && (
        <Box // TODO: use Tabs.Panel
          className={cx('iui-tabs-content', contentClassName)}
          role='tabpanel'
          aria-labelledby={`label-${findActiveIndex()}`}
        >
          {children}
        </Box>
      )}
    </TabsWrapper>
  );
}) as PolymorphicForwardRefComponent<'div', TabsLegacyProps>;
LegacyTabsComponent.displayName = 'Tabs';

// ----------------------------------------------------------------------------

type TabLegacyProps = {
  /**
   * The main label shown in the tab.
   */
  label?: React.ReactNode;
  /**
   * Secondary label shown below the main label.
   */
  sublabel?: React.ReactNode;
  /**
   * Svg icon shown before the labels.
   */
  startIcon?: JSX.Element;
  /**
   * Control whether the tab is disabled.
   */
  disabled?: boolean;
  /**
   * Custom content appended to the tab.
   */
  children?: React.ReactNode;
  /**
   * Whether the tab has active styling.
   *
   * This will be automatically set by the parent `Tabs` component.
   */
  active?: boolean;
};

/**
 * Legacy Tab component.
 * For full functionality use composition API.
 *
 * Individual tab component to be used in the `labels` prop of `Tabs`.
 * @example
 * const tabs = [
 *   <Tab label='Label 1' sublabel='Description 1' />,
 *   <Tab label='Label 2' startIcon={<SvgPlaceholder />} />,
 * ];
 */
export const Tab = React.forwardRef((props, forwardedRef) => {
  const { label, sublabel, startIcon, children, active, value, ...rest } =
    props;

  return (
    <>
      <TabHeader
        {...rest}
        value={value ?? `panel-${label}`}
        ref={forwardedRef}
        isActive={active}
      >
        {startIcon && <TabIcon>{startIcon}</TabIcon>}
        <TabLabel>{label}</TabLabel>
        {sublabel && <TabDescription>{sublabel}</TabDescription>}
        {children}
      </TabHeader>
    </>
  );
}) as PolymorphicForwardRefComponent<
  'button',
  TabLegacyProps & { value?: string }
>;

/**
 * Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.
 * @example
 * <Tabs>
 *   <Tabs.TabList>
 *     <Tabs.Tab value='tab1' label='Label 1' />
 *     <Tabs.Tab value='tab2' label='Label 2' />
 *     <Tabs.Tab value='tab3' label='Label 3' />
 *   </Tabs.TabList>
 *   <Tabs.ActionsWrapper>
 *     <Tabs.Actions>
 *       <Button>Sample Button</Button>
 *     </Tabs.Actions>
 *   </Tabs.ActionsWrapper>
 *   <Tabs.Panel value='tab1'>Content 1</Tabs.Panel>
 *   <Tabs.Panel value='tab2'>Content 2</Tabs.Panel>
 *   <Tabs.Panel value='tab3'>Content 3</Tabs.Panel>
 * </Tabs>
 *
 * @example
 * <Tabs orientation='vertical'/>
 *
 * @example
 * <Tabs.Tab value='sample'>
 *   <Tabs.TabIcon>
 *     <SvgPlaceholder />
 *   </Tabs.TabIcon>
 *   <Tabs.TabLabel>Sample Label</Tabs.TabLabel>
 *   <Tabs.TabDescription>Sample Description</Tabs.TabDescription>
 * </Tabs.Tab>
 *
 */

export const Tabs = Object.assign(LegacyTabsComponent, {
  /**
   * A wrapper component for Tabs
   */
  Wrapper: TabsWrapper,
  /**
   * Tablist subcomponent which contains all of the tab subcomponents.
   * @example
   * <Tabs.TabList>
   *   <Tabs.Tab value='tab1' label='Label 1' />
   *   <Tabs.Tab value='tab2' label='Label 2' />
   *   <Tabs.Tab value='tab3' label='Label 3' />
   * </Tabs.TabList>
   *
   * @example
   * <Tabs.TabList color='green'>
   *   <Tabs.Tab value='tab1' label='Green Tab' />
   * </Tabs.TabList>
   *
   * @example
   * <Tabs.TabList focusActivationMode='manual'>
   *   <Tabs.Tab value='tab1' label='Manual Focus Tab' />
   * </Tabs.TabList>
   */
  TabList: TabList,
  /**
   * Tab subcomponent which is used for each of the tabs.
   * @example
   * <Tabs.Tab value='tab1' label='Label 1' />
   *
   * @example
   * <Tabs.Tab value='sample'>
   *   <Tabs.TabIcon>
   *     <SvgPlaceholder />
   *   </Tabs.TabIcon>
   *   <Tabs.TabLabel>Sample Label</Tabs.TabLabel>
   *   <Tabs.TabDescription>Sample Description</Tabs.TabDescription>
   * </Tabs.Tab>
   *
   */
  Tab: TabHeader,
  /**
   * Tab icon subcomponent which places an icon on the left side of the tab.
   */
  TabIcon: TabIcon,
  /**
   * Tab label subcomponent which holds the tab's label.
   */
  TabLabel: TabLabel,
  /**
   * Tab description subcomponent which places a description under the tab label.
   */
  TabDescription: TabDescription,
  /**
   * Tab actions subcomponent which contains action buttons that are placed at the end of the tabs.
   */
  Actions: TabsActions,
  /**
   * Tab panel subcomponent which contains the tab's content.
   * @example
   * <Tabs.Panel value='tab1'>
   *   Sample Panel
   * </Tabs.Panel>
   */
  Panel: TabsPanel,
});

export const TabsContext = React.createContext<
  | {
      /**
       * Type of the tabs.
       */
      type?: 'default' | 'borderless' | 'pill';
      /**
       * Orientation of the tabs.
       * @default 'horizontal'
       */
      orientation?: 'horizontal' | 'vertical';
      /**
       * The value prop of the active tab.
       */
      activeValue?: string;
      /**
       * Handler for setting the value of the active tab.
       */
      setActiveValue: React.Dispatch<React.SetStateAction<string>>;
      /**
       * Options that can be specified to deal with tabs overflowing the allotted space.
       */
      overflowOptions?: OverflowOptions;
      /**
       * Handler for setting the hasSublabel flag.
       */
      setStripeProperties: (stripeProperties: object) => void;
    }
  | undefined
>(undefined);

export const TabListContext = React.createContext<
  | {
      /**
       * Control whether focusing tabs (using arrow keys) should automatically select them.
       * Use 'manual' if tab panel content is not preloaded.
       * @default 'auto'
       */
      focusActivationMode: 'auto' | 'manual';
      /**
       * Flag whether any of the tabs have a sublabel.
       * Used for determining tab size.
       */
      hasSublabel: boolean;
      /**
       * Handler for setting the hasSublabel flag.
       */
      setHasSublabel: (hasSublabel: boolean) => void;
      tabsWidth: number;
    }
  | undefined
>(undefined);

export default Tabs;
