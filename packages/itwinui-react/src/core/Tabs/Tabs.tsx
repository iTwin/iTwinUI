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
  getBoundedValue,
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

type TabsComponentOwnProps = {
  /**
   * The value of the tab that should be active when initially rendered.
   * if this prop is used, use the `onTabSelected` prop to keep track of the active index.
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
   * Handler for activating a tab.
   */
  onTabSelected?: (index: number) => void;
} & TabsOrientationProps &
  TabsOverflowProps;

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
    color = 'blue',
    activeIndex,
    focusActivationMode = 'auto',
    onTabSelected,
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
          color,
          activeIndex,
          focusActivationMode,
          currentActiveIndex,
          setCurrentActiveIndex,
          onTabSelected,
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
   * Tab items.
   */
  children: React.ReactNode[] | React.ReactNode;
};

const TabsTabList = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  const {
    orientation,
    type,
    color,
    activeIndex,
    focusActivationMode,
    currentActiveIndex,
    setCurrentActiveIndex,
    onTabSelected,
    overflowOptions,
    setStripeProperties,
  } = useSafeContext(TabsContext);

  const items = Array.isArray(children) ? children : [children];
  const isClient = useIsClient();
  const tablistRef = React.useRef<HTMLUListElement>(null);
  const [tablistSizeRef, tabsWidth] = useContainerWidth(type !== 'default');
  const refs = useMergedRefs(ref, tablistRef, tablistSizeRef);

  useIsomorphicLayoutEffect(() => {
    if (
      activeIndex != null &&
      currentActiveIndex !== activeIndex &&
      setCurrentActiveIndex
    ) {
      setCurrentActiveIndex(getBoundedValue(activeIndex, 0, items.length - 1));
    }
  }, [activeIndex, currentActiveIndex, items.length]);

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
      const tab = tablistRef.current.children[focusedIndex].children[0];
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

  const isTabHidden = (activeTab: HTMLElement, isVertical: boolean) => {
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
    const tabStart = isVertical ? activeTab.offsetTop : activeTab.offsetLeft;
    const tabEnd = isVertical
      ? activeTab.offsetTop + activeTab.offsetHeight
      : activeTab.offsetLeft + activeTab.offsetWidth;

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
      list: HTMLUListElement,
      activeTab: HTMLElement,
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
          ? activeTab.offsetTop - list.scrollTop
          : activeTab.offsetLeft - list.scrollLeft;
        change -= fadeBuffer; // give some space so the active tab isn't covered by the fade
      } else {
        // tab is after visible section
        change = isVertical
          ? activeTab.offsetTop -
            (list.scrollTop + list.offsetHeight) +
            activeTab.offsetHeight
          : activeTab.offsetLeft -
            (list.scrollLeft + list.offsetWidth) +
            activeTab.offsetWidth;
        change += fadeBuffer; // give some space so the active tab isn't covered by the fade
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

  // scroll to active tab if it is not visible with overflow
  useIsomorphicLayoutEffect(() => {
    setTimeout(() => {
      const ownerDoc = tablistRef.current;
      if (
        ownerDoc !== null &&
        overflowOptions?.useOverflow &&
        currentActiveIndex !== undefined
      ) {
        const activeTab = ownerDoc.querySelectorAll(`.${styles['iui-tab']}`)[
          currentActiveIndex
        ] as HTMLElement;
        const isVertical = orientation === 'vertical';
        const tabPlacement = isTabHidden(activeTab, isVertical);

        if (tabPlacement) {
          scrollToTab(ownerDoc, activeTab, 100, isVertical, tabPlacement);
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
      if (onTabSelected) {
        onTabSelected(index);
      }
      setCurrentActiveIndex && setCurrentActiveIndex(index);
    },
    [onTabSelected, setCurrentActiveIndex],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    // alt + arrow keys are used by browser / assistive technologies
    if (event.altKey) {
      return;
    }

    const isTabDisabled = (index: number) => {
      const tab = items[index];
      return React.isValidElement(tab) && tab.props.disabled;
    };

    let newIndex = focusedIndex ?? currentActiveIndex ?? 0;

    /** focus next tab if delta is +1, previous tab if -1 */
    const focusTab = (delta = +1) => {
      do {
        newIndex = (newIndex + delta + items.length) % items.length;
      } while (isTabDisabled(newIndex) && newIndex !== focusedIndex);
      setFocusedIndex(newIndex);
      focusActivationMode === 'auto' && onTabClick(newIndex);
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
        if (focusActivationMode === 'manual' && focusedIndex !== undefined) {
          onTabClick(focusedIndex);
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <Box
      as='ul'
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
      onKeyDown={onKeyDown}
      ref={refs}
      {...rest}
    >
      {items.map((item, index) => {
        return (
          <li key={index}>
            <TabsContext.Provider
              value={{
                type,
                index,
                currentActiveIndex,
                setCurrentActiveIndex,
                onTabSelected: onTabClick,
                setFocusedIndex,
                hasSublabel,
                setHasSublabel,
              }}
              key={index}
            >
              {item}
            </TabsContext.Provider>
          </li>
        );
      })}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'ul', TabsTabListOwnProps>;
TabsTabList.displayName = 'Tabs.TabList';

// ----------------------------------------------------------------------------
// Tabs.Tab component

type TabsTabOwnProps = {
  /**
   * Tab label used for simple Tab construction.
   * Cannot be used with tabs that have icons or descriptions.
   */
  label?: string | React.ReactNode;
};

const TabsTab = React.forwardRef((props, ref) => {
  const { className, children, label, ...rest } = props;

  const { index, currentActiveIndex, onTabSelected, setFocusedIndex } =
    useSafeContext(TabsContext);

  const onClick = () => {
    if (index !== undefined) {
      setFocusedIndex && setFocusedIndex(index);
      onTabSelected && onTabSelected(index);
    }
  };
  return (
    <Box
      as='button'
      className={cx(
        'iui-tab',
        { 'iui-active': index === currentActiveIndex },
        className,
      )}
      role='tab'
      tabIndex={index === currentActiveIndex ? 0 : -1}
      onClick={onClick}
      aria-selected={index === currentActiveIndex}
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

  const { type, hasSublabel, setHasSublabel } = useSafeContext(TabsContext);

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
  const { currentActiveIndex } = useSafeContext(TabsContext);

  const items = Array.isArray(children) ? children : [children];

  return (
    <>
      {items.map((item, index) => {
        return (
          <TabsContext.Provider
            value={{ index, currentActiveIndex }}
            key={index}
          >
            {item}
          </TabsContext.Provider>
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

  const { index, currentActiveIndex } = useSafeContext(TabsContext);

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
       * Orientation of the tabs.
       * @default 'horizontal'
       */
      orientation?: 'horizontal' | 'vertical';
      /**
       * Type of the tabs.
       */
      type?: string;
      /**
       * Color of the bar on the active tab.
       * @default 'blue'
       */
      color?: 'blue' | 'green';
      /**
       * The index of the tab that should be active when initially rendered.
       */
      activeIndex?: number;
      /**
       * Control whether focusing tabs (using arrow keys) should automatically select them.
       * Use 'manual' if tab panel content is not preloaded.
       * @default 'auto'
       */
      focusActivationMode?: 'auto' | 'manual';
      /**
       * The current active index.
       */
      currentActiveIndex?: number;
      /**
       * Handler for setting the current active index.
       */
      setCurrentActiveIndex?: (value: number) => void;
      /**
       * The index value passed for each of the tabs in the tab list.
       */
      index?: number;
      /**
       * Handler for activating a tab.
       */
      onTabSelected?: (index: number) => void;
      /**
       * Options that can be specified to deal with tabs overflowing the allotted space.
       */
      overflowOptions?: OverflowOptions;
      /**
       * Handler for setting the focused tab index.
       */
      setFocusedIndex?: (index: number) => void;
      /**
       * Flag whether any of the tabs have a sublabel.
       * Used for determining tab size.
       */
      hasSublabel?: boolean;
      /**
       * Handler for setting the hasSublabel flag.
       */
      setHasSublabel?: (hasSublabel: boolean) => void;
      /**
       * Handler for setting the hasSublabel flag.
       */
      setStripeProperties?: (stripeProperties: object) => void;
    }
  | undefined
>(undefined);

export default Tabs;
