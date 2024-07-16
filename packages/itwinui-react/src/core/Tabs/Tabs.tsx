/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import {
  useSafeContext,
  Box,
  polymorphic,
  useIsClient,
  useLayoutEffect,
  useMergedRefs,
  useContainerWidth,
  ButtonBase,
  mergeEventHandlers,
  useControlledState,
  useId,
  useLatestRef,
} from '../../utils/index.js';
import { Icon } from '../Icon/Icon.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

// ----------------------------------------------------------------------------
// TabsWrapper

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

type TabsWrapperOwnProps = {
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
   * Value of the tab that should be active on initial render.
   *
   * Should be used for uncontrolled state (when no `value` passed).
   *
   * If not specified, then first tab will be active by default.
   */
  defaultValue?: string;
  /**
   * Value of the active tab for controlled state.
   */
  value?: string;
  /**
   * Function that gets called when active tab is changed.
   *
   * Should be used alongside `value` prop.
   */
  onValueChange?: (value: string) => void;
  /**
   * @deprecated Do not use.
   */
  defaultChecked?: never; // Removing `defaultChecked` from `<div>` props.
} & TabsOrientationProps;

const TabsWrapper = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    orientation = 'horizontal',
    type = 'default',
    focusActivationMode = 'auto',
    color = 'blue',
    defaultValue,
    value: activeValueProp,
    onValueChange,
    ...rest
  } = props;

  const [activeValue, setActiveValue] = useControlledState(
    defaultValue,
    activeValueProp,
    onValueChange,
  );
  const [stripeProperties, setStripeProperties] = React.useState({});
  const [hasSublabel, setHasSublabel] = React.useState(false); // used for setting size

  const idPrefix = useId();

  return (
    <Box
      className={cx('iui-tabs-wrapper', `iui-${orientation}`, className)}
      {...rest}
      style={{ ...stripeProperties, ...props?.style }}
      ref={ref}
    >
      <TabsContext.Provider
        value={{
          orientation,
          type,
          activeValue,
          setActiveValue,
          setStripeProperties,
          idPrefix,
          focusActivationMode,
          hasSublabel,
          setHasSublabel,
          color,
        }}
      >
        {children}
      </TabsContext.Provider>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TabsWrapperOwnProps>;
if (process.env.NODE_ENV === 'development') {
  TabsWrapper.displayName = 'Tabs.Wrapper';
}

// ----------------------------------------------------------------------------
// Tabs.TabList component

type TabListOwnProps = {
  /**
   * Tab items.
   */
  children: React.ReactNode[];
};

const TabList = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  const { type, hasSublabel, color } = useSafeContext(TabsContext);

  const isClient = useIsClient();
  const tablistRef = React.useRef<HTMLDivElement>(null);
  const [tablistSizeRef, tabsWidth] = useContainerWidth(type !== 'default');
  const refs = useMergedRefs(
    ref,
    tablistRef,
    tablistSizeRef,
    useScrollbarGutter(),
  );

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
      role='tablist'
      ref={refs}
      {...rest}
    >
      <TabListContext.Provider
        value={{
          tabsWidth,
          tablistRef,
        }}
      >
        {children}
      </TabListContext.Provider>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TabListOwnProps>;
if (process.env.NODE_ENV === 'development') {
  TabList.displayName = 'Tabs.TabList';
}

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
   * @deprecated Don't pass `id`, as it will be automatically set.
   */
  id?: string;
};

const Tab = React.forwardRef((props, forwardedRef) => {
  const { className, children, value, label, ...rest } = props;

  const {
    orientation,
    activeValue,
    setActiveValue,
    type,
    setStripeProperties,
    idPrefix,
    focusActivationMode,
  } = useSafeContext(TabsContext);
  const { tabsWidth, tablistRef } = useSafeContext(TabListContext);
  const tabRef = React.useRef<HTMLButtonElement>();

  const isActive = activeValue === value;
  const isActiveRef = useLatestRef(isActive);

  // Scroll to active tab only on initial render
  useLayoutEffect(() => {
    if (isActiveRef.current) {
      tabRef.current?.parentElement?.scrollTo({
        [orientation === 'horizontal' ? 'left' : 'top']:
          tabRef.current?.[
            orientation === 'horizontal' ? 'offsetLeft' : 'offsetTop'
          ] - 4, // leave some room near the start
        behavior: 'instant', // not using 'smooth' to reduce layout shift on page load
      });
    }
  }, [isActiveRef, orientation]);

  // CSS custom properties to place the active stripe
  useLayoutEffect(() => {
    const updateStripe = () => {
      const currentTabRect = tabRef.current?.getBoundingClientRect();
      const tabslistRect = tablistRef.current?.getBoundingClientRect();

      // Using getBoundingClientRect() to get decimal granularity.
      // Not using offsetLeft/offsetTop because they round to the nearest integer.
      // Even minor inaccuracies in the stripe position can cause unexpected scroll/scrollbar.
      // See: https://github.com/iTwin/iTwinUI/issues/1870
      const tabsStripePosition =
        currentTabRect != null && tabslistRect != null
          ? {
              horizontal: currentTabRect.x - tabslistRect.x,
              vertical: currentTabRect.y - tabslistRect.y,
            }
          : {
              horizontal: 0,
              vertical: 0,
            };

      setStripeProperties({
        '--iui-tabs-stripe-size':
          orientation === 'horizontal'
            ? `${currentTabRect?.width}px`
            : `${currentTabRect?.height}px`,
        '--iui-tabs-stripe-position':
          orientation === 'horizontal'
            ? `${tabsStripePosition.horizontal}px`
            : `${tabsStripePosition.vertical}px`,
      });
    };

    if (type !== 'default' && isActive) {
      updateStripe();
    }
  }, [
    type,
    orientation,
    isActive,
    tabsWidth, // to fix visual artifact on initial render
    setStripeProperties,
    tablistRef,
  ]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.altKey) {
      return;
    }
    const allTabs = Array.from(
      event.currentTarget.parentElement?.children ?? [],
    );

    const nextTab = (tabRef.current?.nextElementSibling ??
      allTabs.at(0)) as HTMLElement;

    const previousTab = (tabRef.current?.previousElementSibling ??
      allTabs.at(-1)) as HTMLElement;

    switch (event.key) {
      case 'ArrowDown': {
        if (orientation === 'vertical') {
          nextTab?.focus();
          event.preventDefault();
        }
        break;
      }
      case 'ArrowRight': {
        if (orientation === 'horizontal') {
          nextTab?.focus();
          event.preventDefault();
        }
        break;
      }
      case 'ArrowUp': {
        if (orientation === 'vertical') {
          previousTab?.focus();
          event.preventDefault();
        }
        break;
      }
      case 'ArrowLeft': {
        if (orientation === 'horizontal') {
          previousTab?.focus();
          event.preventDefault();
        }
        break;
      }
      default:
        break;
    }
  };

  // use first tab as active if no `value` passed.
  const setInitialActiveRef = React.useCallback(
    (element: HTMLElement) => {
      if (activeValue !== undefined) {
        return;
      }

      if (element?.matches(':first-of-type')) {
        setActiveValue(value);
      }
    },
    [activeValue, setActiveValue, value],
  );

  return (
    <ButtonBase
      className={cx('iui-tab', className)}
      role='tab'
      tabIndex={isActive ? 0 : -1}
      aria-selected={isActive}
      aria-controls={`${idPrefix}-panel-${value.replaceAll(' ', '-')}`}
      ref={useMergedRefs(tabRef, forwardedRef, setInitialActiveRef)}
      {...rest}
      id={`${idPrefix}-tab-${value.replaceAll(' ', '-')}`}
      onClick={mergeEventHandlers(props.onClick, () => setActiveValue(value))}
      onKeyDown={mergeEventHandlers(props.onKeyDown, onKeyDown)}
      onFocus={mergeEventHandlers(props.onFocus, () => {
        tabRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        if (focusActivationMode === 'auto' && !props.disabled) {
          setActiveValue(value);
        }
      })}
    >
      {label ? <Tabs.TabLabel>{label}</Tabs.TabLabel> : children}
    </ButtonBase>
  );
}) as PolymorphicForwardRefComponent<'button', TabOwnProps>;
if (process.env.NODE_ENV === 'development') {
  Tab.displayName = 'Tabs.Tab';
}

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
if (process.env.NODE_ENV === 'development') {
  TabIcon.displayName = 'Tabs.TabIcon';
}

// ----------------------------------------------------------------------------
// Tabs.TabLabel component

const TabLabel = polymorphic.span('iui-tab-label');
if (process.env.NODE_ENV === 'development') {
  TabLabel.displayName = 'Tabs.TabLabel';
}

// ----------------------------------------------------------------------------
// Tabs.TabDescription component

const TabDescription = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  const { hasSublabel, setHasSublabel } = useSafeContext(TabsContext);

  useLayoutEffect(() => {
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
if (process.env.NODE_ENV === 'development') {
  TabDescription.displayName = 'Tabs.TabDescription';
}

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
if (process.env.NODE_ENV === 'development') {
  TabsActions.displayName = 'Tabs.Actions';
}

// ----------------------------------------------------------------------------
// Tabs.Panel component

type TabsPanelOwnProps = {
  /**
   * Value used to associate the panel with a given tab.
   */
  value: string;
  /**
   * @deprecated Don't pass `id`, as it will be automatically set.
   */
  id?: string;
};

const TabsPanel = React.forwardRef((props, ref) => {
  const { value, className, children, ...rest } = props;

  const { activeValue, idPrefix } = useSafeContext(TabsContext);

  return (
    <Box
      className={cx('iui-tabs-content', className)}
      aria-labelledby={`${idPrefix}-tab-${value.replaceAll(' ', '-')}`}
      role='tabpanel'
      hidden={activeValue !== value ? true : undefined}
      ref={ref}
      {...rest}
      id={`${idPrefix}-panel-${value.replaceAll(' ', '-')}`}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TabsPanelOwnProps>;
if (process.env.NODE_ENV === 'development') {
  TabsPanel.displayName = 'Tabs.Panel';
}

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
  /**
   * @deprecated Tabs will now overflow by default, so this prop does nothing.
   */
  overflowOptions?: {
    /**
     * @deprecated Tabs will now overflow by default, so this prop does nothing.
     */
    useOverflow?: boolean;
  };

  // Removing `defaultValue` and `defaultChecked` from `<div>` props.
  defaultValue?: never;
  defaultChecked?: never;
} & TabsOrientationProps;

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
    activeIndex: activeIndexProp,
    tabsClassName,
    contentClassName,
    wrapperClassName,
    children,
    ...rest
  } = props;

  const [activeIndex, setActiveIndex] = useControlledState(
    0,
    activeIndexProp,
    onTabSelected,
  );

  return (
    <TabsWrapper
      className={wrapperClassName}
      focusActivationMode={focusActivationMode}
      color={color}
      value={`${activeIndex}`}
      onValueChange={(value) => setActiveIndex(Number(value))}
      {...rest}
    >
      <TabList className={tabsClassName} ref={forwardedRef}>
        {labels.map((label, index) => {
          const tabValue = `${index}`;
          return React.isValidElement(label) ? (
            React.cloneElement(label as JSX.Element, {
              value: tabValue,
            })
          ) : (
            <LegacyTab key={index} value={tabValue} label={label} />
          );
        })}
      </TabList>

      {actions && <TabsActions>{actions}</TabsActions>}

      {children && (
        <TabsPanel value={`${activeIndex}`} className={contentClassName}>
          {children}
        </TabsPanel>
      )}
    </TabsWrapper>
  );
}) as PolymorphicForwardRefComponent<'div', TabsLegacyProps>;
if (process.env.NODE_ENV === 'development') {
  LegacyTabsComponent.displayName = 'Tabs';
}

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
   * `value` of the tab.
   *
   * Will be set by parent `Tabs` component.
   */
  value?: string;
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
const LegacyTab = React.forwardRef((props, forwardedRef) => {
  const { label, sublabel, startIcon, children, value, ...rest } = props;

  return (
    <>
      <Tab {...rest} value={value as string} ref={forwardedRef}>
        {startIcon && <TabIcon>{startIcon}</TabIcon>}
        <TabLabel>{label}</TabLabel>
        {sublabel && <TabDescription>{sublabel}</TabDescription>}
        {children}
      </Tab>
    </>
  );
}) as PolymorphicForwardRefComponent<'button', TabLegacyProps>;

// ----------------------------------------------------------------------------
// exports

export { LegacyTab as Tab };

/**
 * Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.
 * `Tabs.Tab` and `Tabs.Panel` can be associated with each other by passing them the same `value`.
 * @example
 * <Tabs.Wrapper>
 *   <Tabs.TabList>
 *     <Tabs.Tab value='tab1' label='Label 1' />
 *     <Tabs.Tab value='tab2' label='Label 2' />
 *     <Tabs.Tab value='tab3' label='Label 3' />
 *   </Tabs.TabList>
 *   <Tabs.Actions>
 *     <Button>Sample Button</Button>
 *   </Tabs.Actions>
 *   <Tabs.Panel value='tab1'>Content 1</Tabs.Panel>
 *   <Tabs.Panel value='tab2'>Content 2</Tabs.Panel>
 *   <Tabs.Panel value='tab3'>Content 3</Tabs.Panel>
 * </Tabs.Wrapper>
 *
 * @example
 * <Tabs orientation='vertical'/>
 *
 * @example
 * <Tabs.Wrapper focusActivationMode='manual'>
 *  <Tabs.Tab value='sample'>
 *   <Tabs.TabIcon>
 *     <SvgPlaceholder />
 *   </Tabs.TabIcon>
 *   <Tabs.TabLabel>Sample Label</Tabs.TabLabel>
 *   <Tabs.TabDescription>Sample Description</Tabs.TabDescription>
 *  </Tabs.Tab>
 * </Tabs.Wrapper>
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
   * <Tabs.TabList>
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
  Tab: Tab,
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

const TabsContext = React.createContext<
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
       * Handler for setting the hasSublabel flag.
       */
      setStripeProperties: (stripeProperties: object) => void;
      /**
       * Unique id prefix to account for duplicate `value`s.
       */
      idPrefix: string;
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
      /**
       * Color of the bar on the active tab.
       */
      color?: 'blue' | 'green';
    }
  | undefined
>(undefined);

const TabListContext = React.createContext<
  | {
      tabsWidth: number;
      tablistRef: React.RefObject<HTMLDivElement>;
    }
  | undefined
>(undefined);
// ----------------------------------------------------------------------------

/**
 * This conditionally adds `scrollbar-gutter: stable` only if the content overflows.
 * This is a workaround to prevent layout shift that happens because of scrollbar width.
 *
 * @see https://github.com/iTwin/iTwinUI/issues/1627
 */
const useScrollbarGutter = () => {
  return React.useCallback((element: HTMLElement | null) => {
    if (element) {
      if (element.scrollHeight > element.clientHeight) {
        element.style.scrollbarGutter = 'stable';

        // Safari fallback
        if (!CSS.supports('scrollbar-gutter: stable')) {
          element.style.overflowY = 'scroll';
        }
      }
    }
  }, []);
};
