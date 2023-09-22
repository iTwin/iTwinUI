/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
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
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import styles from '../../styles.js';

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
      /**
       * Type of the tabs.
       *
       * If `type = 'pill' | 'borderless'`, `overflowOptions` is not applicable.
       * @default 'default'
       */
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
  children: React.ReactNode[] | React.ReactNode;
  /**
   * Handler for activating a tab.
   */
  onTabSelected?: (index: number) => void;
};

const TabList = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    color = 'blue',
    focusActivationMode = 'auto',
    onTabSelected,
    ...rest
  } = props;

  const {
    orientation,
    type,
    activeValue,
    setActiveValue,
    overflowOptions,
    setStripeProperties,
  } = useSafeContext(TabsContext);

  const items = React.useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children],
  );
  const isClient = useIsClient();
  const tablistRef = React.useRef<HTMLDivElement>(null);
  const [tablistSizeRef, tabsWidth] = useContainerWidth(type !== 'default');
  const refs = useMergedRefs(ref, tablistRef, tablistSizeRef);
  const newActiveIndex = React.useRef(0);

  const [focusedValue, setFocusedValue] = React.useState<string | undefined>();
  const newFocusedIndex = React.useRef<number | undefined>();
  const [hasSublabel, setHasSublabel] = React.useState(false); // used for setting size

  useIsomorphicLayoutEffect(() => {
    // Should only call on the first render since activeValue cannot be initialized in TabsWrapper
    const activeItem = items.find(
      (item) => React.isValidElement(item) && item.props.isActive,
    );

    if (React.isValidElement(activeItem) && !!activeItem) {
      const value = activeItem.props.value as string;
      if (value !== activeValue) {
        setActiveValue(value);
      }
    } else {
      React.isValidElement(items[0]) &&
        setActiveValue(items[0].props.value as string);
    }
  }, []);

  // When activeValue change
  useIsomorphicLayoutEffect(() => {
    items.forEach((item, index) => {
      if (React.isValidElement(item) && item.props.value === activeValue) {
        newActiveIndex.current = index;
        return;
      }
    });
  }, [items, activeValue]);

  // When focusedValue change
  useIsomorphicLayoutEffect(() => {
    items.forEach((item, index) => {
      if (React.isValidElement(item) && item.props.value === focusedValue) {
        newFocusedIndex.current = index;
        return;
      }
    });
  }, [items, focusedValue]);

  // CSS custom properties to place the active stripe
  useIsomorphicLayoutEffect(() => {
    if (type !== 'default' && tablistRef.current != undefined && activeValue) {
      const activeTab = tablistRef.current.children[
        newActiveIndex.current
      ] as HTMLElement;
      const activeTabRect = activeTab.getBoundingClientRect();
      setStripeProperties({
        ...(orientation === 'horizontal' && {
          '--stripe-width': `${activeTabRect.width}px`,
          '--stripe-left': `${activeTab.offsetLeft}px`,
        }),
        ...(orientation === 'vertical' && {
          '--stripe-height': `${activeTabRect.height}px`,
          '--stripe-top': `${activeTab.offsetTop}px`,
        }),
      });
    }
  }, [type, orientation, tabsWidth, activeValue]);

  const onTabClick = React.useCallback(
    (index: number) => {
      if (onTabSelected) {
        onTabSelected(index);
      }
      const tab = items[index];
      if (React.isValidElement(tab)) {
        if (tab.props.onActivated) {
          tab.props.onActivated();
        } else {
          setActiveValue(tab.props.value as string);
        }
      }
    },
    [items, setActiveValue, onTabSelected],
  );

  React.useEffect(() => {
    if (tablistRef.current && newFocusedIndex.current !== undefined) {
      const tab = tablistRef.current.children[newFocusedIndex.current];
      (tab as HTMLElement)?.focus();
    }
  }, [focusedValue, onTabClick, focusActivationMode]);

  const enableHorizontalScroll = React.useCallback((e: WheelEvent) => {
    const ownerDoc = tablistRef.current;
    if (ownerDoc === null) {
      return;
    }

    let scrollLeft = ownerDoc?.scrollLeft ?? 0;
    if (e.deltaY > 0 || e.deltaX > 0) {
      scrollLeft += 25;
    } else if (e.deltaY < 0 || e.deltaX < 0) {
      scrollLeft -= 25;
    }
    ownerDoc.scrollLeft = scrollLeft;
  }, []);

  // allow normal mouse wheels to scroll horizontally for horizontal overflow
  React.useEffect(() => {
    const ownerDoc = tablistRef.current;
    if (ownerDoc === null) {
      return;
    }

    if (!overflowOptions?.useOverflow || orientation === 'vertical') {
      ownerDoc.removeEventListener('wheel', enableHorizontalScroll);
      return;
    }

    ownerDoc.addEventListener('wheel', enableHorizontalScroll);
  }, [overflowOptions?.useOverflow, orientation, enableHorizontalScroll]);

  const isTabHidden = (tab: HTMLElement, isVertical: boolean) => {
    const ownerDoc = tablistRef.current;
    if (ownerDoc === null) {
      return;
    }

    const fadeBuffer = isVertical
      ? ownerDoc.offsetHeight * 0.05
      : ownerDoc.offsetWidth * 0.05;
    const visibleStart = isVertical ? ownerDoc.scrollTop : ownerDoc.scrollLeft;
    const visibleEnd = isVertical
      ? ownerDoc.scrollTop + ownerDoc.offsetHeight
      : ownerDoc.scrollLeft + ownerDoc.offsetWidth;
    const tabStart = isVertical ? tab.offsetTop : tab.offsetLeft;
    const tabEnd = isVertical
      ? tab.offsetTop + tab.offsetHeight
      : tab.offsetLeft + tab.offsetWidth;

    if (
      tabStart > visibleStart + fadeBuffer &&
      tabEnd < visibleEnd - fadeBuffer
    ) {
      return 0; // tab is visible
    } else if (tabStart < visibleStart + fadeBuffer) {
      return -1; // tab is before visible section
    } else {
      return 1; // tab is after visible section
    }
  };

  const easeInOutQuad = (
    time: number,
    beginning: number,
    change: number,
    duration: number,
  ) => {
    if ((time /= duration / 2) < 1) {
      return (change / 2) * time * time + beginning;
    }
    return (-change / 2) * (--time * (time - 2) - 1) + beginning;
  };

  const scrollToTab = React.useCallback(
    (
      list: HTMLDivElement,
      tab: HTMLElement,
      duration: number,
      isVertical: boolean,
      tabPlacement: number,
    ) => {
      const start = isVertical ? list.scrollTop : list.scrollLeft;
      let change = 0;
      let currentTime = 0;
      const increment = 20;
      const fadeBuffer = isVertical
        ? list.offsetHeight * 0.05
        : list.offsetWidth * 0.05;

      if (tabPlacement < 0) {
        // if tab is before visible section
        change = isVertical
          ? tab.offsetTop - list.scrollTop
          : tab.offsetLeft - list.scrollLeft;
        change -= fadeBuffer; // give some space so the tab isn't covered by the fade
      } else {
        // tab is after visible section
        change = isVertical
          ? tab.offsetTop -
            (list.scrollTop + list.offsetHeight) +
            tab.offsetHeight
          : tab.offsetLeft -
            (list.scrollLeft + list.offsetWidth) +
            tab.offsetWidth;
        change += fadeBuffer; // give some space so the tab isn't covered by the fade
      }

      const animateScroll = () => {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        if (isVertical) {
          list.scrollTop = val;
        } else {
          list.scrollLeft = val;
        }
        if (currentTime < duration) {
          setTimeout(animateScroll, increment);
        }
      };
      animateScroll();
    },
    [],
  );

  // scroll to focused/active tab if it is not visible with overflow
  useIsomorphicLayoutEffect(() => {
    setTimeout(() => {
      const ownerDoc = tablistRef.current;
      const scrollToIndex =
        newFocusedIndex.current ?? newActiveIndex.current ?? 0;
      if (ownerDoc !== null && overflowOptions?.useOverflow) {
        const tab = ownerDoc.querySelectorAll(`.${styles['iui-tab']}`)[
          scrollToIndex
        ] as HTMLElement;
        const isVertical = orientation === 'vertical';
        const tabPlacement = isTabHidden(tab, isVertical);

        if (tabPlacement) {
          scrollToTab(ownerDoc, tab, 100, isVertical, tabPlacement);
        }
      }
    }, 50);
  }, [overflowOptions?.useOverflow, focusedValue, orientation, scrollToTab]);

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
      Math.abs(visibleStart - 0) < 1 &&
      Math.abs(visibleEnd - totalTabsSpace) < 1
    ) {
      setScrollingPlacement(undefined);
    } else if (Math.abs(visibleStart - 0) < 1) {
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
          onTabClick,
          setFocusedValue,
          focusActivationMode,
          hasSublabel,
          setHasSublabel,
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
  onActivated?: () => void;
};

const TabHeader = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    value,
    label,
    isActive = false,
    onActivated,
    ...rest
  } = props;

  const { orientation, activeValue, setActiveValue } =
    useSafeContext(TabsContext);
  const { onTabClick, setFocusedValue, focusActivationMode } =
    useSafeContext(TabListContext);

  const onClick = () => {
    setFocusedValue && setFocusedValue(value);
    if (onActivated) {
      onActivated();
    } else {
      setActiveValue && setActiveValue(value);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.altKey) {
      return;
    }

    /** focus next tab if delta is +1, previous tab if -1 */
    const focusTab = (delta = +1) => {
      const currentTab = event.currentTarget as Element;

      const items =
        event.currentTarget.parentElement &&
        Array.from(event.currentTarget.parentElement.children);

      let newIndex = items && items.findIndex((item) => item === currentTab);

      if (items && newIndex !== null) {
        do {
          newIndex = (newIndex + delta + items.length) % items.length;
        } while (items[newIndex].ariaDisabled);

        const newValue = items[newIndex].getAttribute('aria-controls');
        newValue && setFocusedValue && setFocusedValue(newValue);
        focusActivationMode === 'auto' && onTabClick && onTabClick(newIndex);
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
      case 'Enter':
      case ' ':
      case 'Spacebar': {
        event.preventDefault();
        if (focusActivationMode === 'manual') {
          onActivated ? onActivated() : setActiveValue && setActiveValue(value);
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <ButtonBase
      className={cx(
        'iui-tab',
        { 'iui-active': value === activeValue || isActive },
        className,
      )}
      role='tab'
      tabIndex={value === activeValue || isActive ? 0 : -1}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-selected={value === activeValue || isActive}
      aria-controls={value}
      ref={ref}
      {...rest}
    >
      {label ? <Tabs.TabLabel>{label}</Tabs.TabLabel> : children}
    </ButtonBase>
  );
}) as PolymorphicForwardRefComponent<'button', TabOwnProps>;
TabHeader.displayName = 'Tabs.Tab';

// ----------------------------------------------------------------------------
// Tabs.TabIcon component

const TabIcon = polymorphic.span('iui-tab-icon', {
  'aria-hidden': true,
});
TabIcon.displayName = 'Tabs.TabIcon';

// ----------------------------------------------------------------------------
// Tabs.TabLabel component

const TabLabel = polymorphic.span('iui-tab-label');
TabLabel.displayName = 'Tabs.TabLabel';

// ----------------------------------------------------------------------------
// Tabs.TabDescription component

const TabDescription = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  const { type } = useSafeContext(TabsContext);
  const { hasSublabel, setHasSublabel } = useSafeContext(TabListContext);

  useIsomorphicLayoutEffect(() => {
    type !== 'pill' && !hasSublabel && setHasSublabel && setHasSublabel(true);
  }, []);

  if (type !== 'pill') {
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
  } else {
    return <></>;
  }
}) as PolymorphicForwardRefComponent<'span'>;
TabDescription.displayName = 'Tabs.TabDescription';

// ----------------------------------------------------------------------------
// Tabs.Actions component

const TabsActions = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  const { type } = useSafeContext(TabsContext);

  if (type !== 'pill') {
    return (
      <Box className={cx('iui-tabs-actions', className)} ref={ref} {...rest}>
        {children}
      </Box>
    );
  } else {
    return <></>;
  }
}) as PolymorphicForwardRefComponent<'div'>;
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

  if (value === activeValue) {
    return (
      <Box
        className={cx('iui-tabs-content', className)}
        role='tabpanel'
        id={value}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    );
  } else {
    return <></>;
  }
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

const TabsComponent = React.forwardRef((props, forwardedRef) => {
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
    tabsClassName,
    contentClassName,
    wrapperClassName,
    children,
    ...rest
  } = props;

  return (
    <TabsWrapper className={wrapperClassName} {...rest}>
      <TabList
        color={color}
        className={tabsClassName}
        focusActivationMode={focusActivationMode}
        onTabSelected={onTabSelected}
        ref={forwardedRef}
      >
        {labels.map((label, index) =>
          React.cloneElement(label as JSX.Element, {
            value: index,
          }),
        )}
      </TabList>

      {actions && <TabsActions>{actions}</TabsActions>}

      {children && (
        <Box
          className={cx('iui-tabs-content', contentClassName)}
          role='tabpanel'
        >
          {children}
        </Box>
      )}
    </TabsWrapper>
  );
}) as PolymorphicForwardRefComponent<'div', TabsLegacyProps>;
TabsComponent.displayName = 'Tabs';

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
 * Individual tab component to be used in the `labels` prop of `Tabs`.
 * @example
 * const tabs = [
 *   <Tab label='Label 1' sublabel='Description 1' />,
 *   <Tab label='Label 2' startIcon={<SvgPlaceholder />} />,
 * ];
 */
export const Tab = React.forwardRef((props, forwardedRef) => {
  const {
    label,
    sublabel,
    startIcon,
    children,
    active = false,
    ...rest
  } = props;

  return (
    <>
      <TabHeader
        ref={forwardedRef}
        value='random-value'
        isActive={active}
        {...rest}
      >
        {startIcon && <TabIcon>{startIcon}</TabIcon>}
        <TabLabel>{label}</TabLabel>
        {sublabel && <TabDescription>{sublabel}</TabDescription>}
        {children}
      </TabHeader>
    </>
  );
}) as PolymorphicForwardRefComponent<'button', TabLegacyProps>;

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

export const Tabs = Object.assign(TabsComponent, {
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
      type?: string;
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
      setActiveValue: (value: string) => void;
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
       * Handler for clicking a tab given its index.
       */
      onTabClick?: (index: number) => void;
      /**
       * Handler for setting the value of the focused tab.
       */
      setFocusedValue?: (value: string) => void;
      /**
       * Control whether focusing tabs (using arrow keys) should automatically select them.
       * Use 'manual' if tab panel content is not preloaded.
       * @default 'auto'
       */
      focusActivationMode?: 'auto' | 'manual';
      /**
       * Flag whether any of the tabs have a sublabel.
       * Used for determining tab size.
       */
      hasSublabel?: boolean;
      /**
       * Handler for setting the hasSublabel flag.
       */
      setHasSublabel?: (hasSublabel: boolean) => void;
    }
  | undefined
>(undefined);

export default Tabs;
