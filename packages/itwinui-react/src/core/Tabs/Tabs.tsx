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
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import styles from '../../styles.js';

// ----------------------------------------------------------------------------
// TabsComponent

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

type TabsComponentOwnProps = TabsOrientationProps & TabsOverflowProps;

const TabsComponent = React.forwardRef((props, ref) => {
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

  const [currentActiveIndex, setCurrentActiveIndex] = React.useState(0);
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
          currentActiveIndex,
          setCurrentActiveIndex,
          overflowOptions,
          setStripeProperties,
        }}
      >
        {children}
      </TabsContext.Provider>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TabsComponentOwnProps>;
TabsComponent.displayName = 'Tabs';

// ----------------------------------------------------------------------------
// Tabs.TabList component

type TabsTabListOwnProps = {
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
};

const TabsTabList = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    color = 'blue',
    focusActivationMode = 'auto',
    ...rest
  } = props;

  const {
    orientation,
    type,
    currentActiveIndex,
    setCurrentActiveIndex,
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

  useIsomorphicLayoutEffect(() => {
    items.forEach((item, index) => {
      if (
        React.isValidElement(item) &&
        item.props.isActive &&
        setCurrentActiveIndex
      ) {
        setCurrentActiveIndex(index);
      }
    });
  }, [currentActiveIndex, items]);

  // CSS custom properties to place the active stripe
  useIsomorphicLayoutEffect(() => {
    if (
      type !== 'default' &&
      tablistRef.current != undefined &&
      currentActiveIndex != undefined
    ) {
      const activeTab = tablistRef.current.children[
        currentActiveIndex
      ] as HTMLElement;
      const activeTabRect = activeTab.getBoundingClientRect();
      setStripeProperties &&
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
  }, [currentActiveIndex, type, orientation, tabsWidth]);

  const [focusedIndex, setFocusedIndex] = React.useState<number | undefined>();
  React.useEffect(() => {
    if (tablistRef.current && focusedIndex !== undefined) {
      const tab = tablistRef.current.children[focusedIndex];
      (tab as HTMLElement)?.focus();
    }
  }, [focusedIndex]);

  const [hasSublabel, setHasSublabel] = React.useState(false); // used for setting size

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
      const scrollToIndex = focusedIndex ?? currentActiveIndex ?? 0;
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
  }, [
    overflowOptions?.useOverflow,
    currentActiveIndex,
    focusedIndex,
    orientation,
    scrollToTab,
  ]);

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

  const onTabClick = React.useCallback(
    (index: number) => {
      const tab = items[index];
      if (React.isValidElement(tab) && tab.props.onActiveChange) {
        tab.props.onActiveChange();
      } else {
        setCurrentActiveIndex && setCurrentActiveIndex(index);
      }
    },
    [items, setCurrentActiveIndex],
  );

  const isTabDisabled = (index: number) => {
    const tab = items[index];
    return React.isValidElement(tab) && tab.props.disabled;
  };

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
      {items.map((item, index) => {
        return (
          <TabsTabListContext.Provider
            value={{
              numTabs: items.length,
              index,
              focusedIndex,
              setFocusedIndex,
              focusActivationMode,
              isTabDisabled,
              onTabClick,
              hasSublabel,
              setHasSublabel,
            }}
            key={index}
          >
            {item}
          </TabsTabListContext.Provider>
        );
      })}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TabsTabListOwnProps>;
TabsTabList.displayName = 'Tabs.TabList';

// ----------------------------------------------------------------------------
// Tabs.Tab component

type TabsTabOwnProps = {
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

const TabsTab = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    label,
    isActive = false,
    onActiveChange,
    ...rest
  } = props;

  const { orientation, currentActiveIndex, setCurrentActiveIndex } =
    useSafeContext(TabsContext);
  const {
    numTabs,
    index,
    focusedIndex,
    setFocusedIndex,
    focusActivationMode,
    isTabDisabled,
    onTabClick,
  } = useSafeContext(TabsTabListContext);

  const onClick = () => {
    if (index !== undefined) {
      setFocusedIndex && setFocusedIndex(index);
      if (onActiveChange) {
        onActiveChange();
      } else {
        setCurrentActiveIndex && setCurrentActiveIndex(index);
      }
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.altKey) {
      return;
    }

    let newIndex = focusedIndex ?? currentActiveIndex ?? 0;

    /** focus next tab if delta is +1, previous tab if -1 */
    const focusTab = (delta = +1) => {
      if (numTabs !== undefined) {
        do {
          newIndex = (newIndex + delta + numTabs) % numTabs;
        } while (
          isTabDisabled &&
          isTabDisabled(newIndex) &&
          newIndex !== focusedIndex
        );
      }

      setFocusedIndex && setFocusedIndex(newIndex);
      focusActivationMode === 'auto' && onTabClick && onTabClick(newIndex);
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
        if (focusActivationMode === 'manual' && focusedIndex === index) {
          onActiveChange
            ? onActiveChange()
            : setCurrentActiveIndex &&
              index !== undefined &&
              setCurrentActiveIndex(index);
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <Box
      as='button'
      className={cx(
        'iui-tab',
        { 'iui-active': index === currentActiveIndex || isActive },
        className,
      )}
      role='tab'
      tabIndex={index === currentActiveIndex || isActive ? 0 : -1}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-selected={index === currentActiveIndex || isActive}
      ref={ref}
      {...rest}
    >
      {label ? <Tabs.TabLabel>{label}</Tabs.TabLabel> : children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'button', TabsTabOwnProps>;
TabsTab.displayName = 'Tabs.Tab';

// ----------------------------------------------------------------------------
// Tabs.TabIcon component

const TabsTabIcon = polymorphic.span('iui-tab-icon', {
  'aria-hidden': true,
});
TabsTabIcon.displayName = 'Tabs.TabIcon';

// ----------------------------------------------------------------------------
// Tabs.TabLabel component

const TabsTabLabel = polymorphic.span('iui-tab-label');
TabsTabLabel.displayName = 'Tabs.TabLabel';

// ----------------------------------------------------------------------------
// Tabs.TabDescription component

const TabsTabDescription = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  const { type } = useSafeContext(TabsContext);
  const { hasSublabel, setHasSublabel } = useSafeContext(TabsTabListContext);

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
TabsTabDescription.displayName = 'Tabs.TabDescription';

// ----------------------------------------------------------------------------
// Tabs.Actions component

const TabsActions = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  const { type } = useSafeContext(TabsContext);

  if (type !== 'pill') {
    return (
      <Box
        className={cx('iui-tabs-actions-wrapper', className)}
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    );
  } else {
    return <></>;
  }
}) as PolymorphicForwardRefComponent<'div'>;
TabsActions.displayName = 'Tabs.Actions';

// ----------------------------------------------------------------------------
// Tabs.Action component

const TabsAction = React.forwardRef((props, ref) => {
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
TabsAction.displayName = 'Tabs.Action';

// ----------------------------------------------------------------------------
// Tabs.Panels component

const TabsPanels = ({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) => {
  const items = Array.isArray(children) ? children : [children];

  return (
    <>
      {items.map((item, index) => {
        return (
          <TabsPanelsContext.Provider value={{ index }} key={index}>
            {item}
          </TabsPanelsContext.Provider>
        );
      })}
    </>
  );
};
TabsPanels.displayName = 'Tabs.Panels';

// ----------------------------------------------------------------------------
// Tabs.Panel component

const TabsPanel = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  const { currentActiveIndex } = useSafeContext(TabsContext);
  const { index } = useSafeContext(TabsPanelsContext);

  if (index === currentActiveIndex) {
    return (
      <Box
        className={cx('iui-tabs-content', className)}
        role='tabpanel'
        ref={ref}
        {...rest}
      >
        {children}
      </Box>
    );
  } else {
    return <></>;
  }
}) as PolymorphicForwardRefComponent<'div'>;
TabsPanel.displayName = 'Tabs.Panel';

/**
 * Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.
 * @example
 * <Tabs>
 *   <Tabs.TabList>
 *     <Tabs.Tab>
 *       <Tabs.TabLabel>Label 1</Tabs.TabLabel>
 *     </Tabs.Tab>
 *     <Tabs.Tab>
 *       <Tabs.TabLabel>Label 2</Tabs.TabLabel>
 *     </Tabs.Tab>
 *     <Tabs.Tab>
 *       <Tabs.TabLabel>Label 3</Tabs.TabLabel>
 *     </Tabs.Tab>
 *   </Tabs.TabList>
 *   <Tabs.Actions>
 *     <Tabs.Action>
 *       <Button>Sample Button</Button>,
 *     </Tabs.Action>
 *   </Tabs.Actions>
 *   <Tabs.Panels>
 *     <Tabs.Panel>Content 1</Tabs.Panel>
 *     <Tabs.Panel>Content 2</Tabs.Panel>
 *     <Tabs.Panel>Content 3</Tabs.Panel>
 *   </Tabs.Panels>
 * </Tabs>
 *
 * @example
 * <Tabs orientation='vertical'/>
 *
 * @example
 * <Tabs.Tab>
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
   * 	Tab list subcomponent
   */
  TabList: TabsTabList,
  /**
   * 	Tab subcomponent
   */
  Tab: TabsTab,
  /**
   *  Tab icon subcomponent
   */
  TabIcon: TabsTabIcon,
  /**
   * 	Tab label subcomponent
   */
  TabLabel: TabsTabLabel,
  /**
   * 	Tab description subcomponent
   */
  TabDescription: TabsTabDescription,
  /**
   * 	Tab actions subcomponent
   */
  Actions: TabsActions,
  /**
   * 	Tab action subcomponent
   */
  Action: TabsAction,
  /**
   * 	Tab panels subcomponent
   */
  Panels: TabsPanels,
  /**
   * 	Tab panel subcomponent
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
       * The current active index.
       */
      currentActiveIndex?: number;
      /**
       * Handler for setting the current active index.
       */
      setCurrentActiveIndex?: (value: number) => void;
      /**
       * Options that can be specified to deal with tabs overflowing the allotted space.
       */
      overflowOptions?: OverflowOptions;
      /**
       * Handler for setting the hasSublabel flag.
       */
      setStripeProperties?: (stripeProperties: object) => void;
    }
  | undefined
>(undefined);

export const TabsTabListContext = React.createContext<
  | {
      /**
       * Number of tabs in the tab list.
       */
      numTabs?: number;
      /**
       * The index value passed for each of the tabs.
       */
      index?: number;
      /**
       * The index of the focused tab.
       */
      focusedIndex?: number;
      /**
       * Handler for setting the focused tab index.
       */
      setFocusedIndex?: (index: number) => void;
      /**
       * Control whether focusing tabs (using arrow keys) should automatically select them.
       * Use 'manual' if tab panel content is not preloaded.
       * @default 'auto'
       */
      focusActivationMode?: 'auto' | 'manual';
      /**
       * Function that checks if a tab is disabled given its index
       */
      isTabDisabled?: (index: number) => boolean;
      /**
       * Handler for clicking a tab given the tab's index.
       */
      onTabClick?: (index: number) => void;
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

export const TabsPanelsContext = React.createContext<
  | {
      /**
       * The index value passed for each of the panels.
       */
      index?: number;
    }
  | undefined
>(undefined);

export default Tabs;
