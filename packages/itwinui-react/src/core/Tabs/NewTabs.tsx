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
// NewTabsComponent

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

type NewTabsComponentOwnProps = {
  /**
   * The value of the tab that should be active when initially rendered
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

const NewTabsComponent = React.forwardRef((props, ref) => {
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
    focusActivationMode,
    onTabSelected,
    ...rest
  } = props;

  const [currentActiveIndex, setCurrentActiveIndex] = React.useState(0);
  const tabWrapperRef = React.useRef<HTMLDivElement>(null);
  const [tabsWidth] = useContainerWidth(type !== 'default');
  const refs = useMergedRefs(tabWrapperRef, ref);

  // CSS custom properties to place the active stripe
  const [stripeProperties, setStripeProperties] = React.useState({});
  useIsomorphicLayoutEffect(() => {
    if (type !== 'default' && tabWrapperRef.current != undefined) {
      const activeTab = tabWrapperRef.current.children[0].children[
        currentActiveIndex
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
  }, [currentActiveIndex, type, orientation, tabsWidth]);

  return (
    <Box
      className={cx('iui-tabs-wrapper', `iui-${orientation}`, className)}
      style={stripeProperties}
      ref={refs}
      {...rest}
    >
      <NewTabsContext.Provider
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
        }}
      >
        {children}
      </NewTabsContext.Provider>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', NewTabsComponentOwnProps>;
NewTabsComponent.displayName = 'NewTabs';

// ----------------------------------------------------------------------------
// NewTabs.TabList component

type NewTabsTabListOwnProps = {
  /**
   * Tab items.
   */
  children: React.ReactNode[];
};

const NewTabsTabList = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  const tablistRef = React.useRef<HTMLUListElement>(null);
  const refs = useMergedRefs(tablistRef, ref);

  const isClient = useIsClient();

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
  } = useSafeContext(NewTabsContext);

  useIsomorphicLayoutEffect(() => {
    if (
      activeIndex != null &&
      currentActiveIndex !== activeIndex &&
      setCurrentActiveIndex
    ) {
      setCurrentActiveIndex(
        getBoundedValue(activeIndex, 0, children.length - 1),
      );
    }
  }, [activeIndex, currentActiveIndex, children.length]);

  const [focusedIndex, setFocusedIndex] = React.useState<number | undefined>();
  React.useEffect(() => {
    if (tablistRef.current && focusedIndex !== undefined) {
      const tab = tablistRef.current.querySelectorAll(`.${styles['iui-tab']}`)[
        focusedIndex
      ];
      (tab as HTMLElement)?.focus();
    }
  }, [focusedIndex]);

  const [hasSublabel, setHasSublabel] = React.useState(false); // used for setting size
  useIsomorphicLayoutEffect(() => {
    setHasSublabel(
      type !== 'pill' && // pill tabs should never have sublabels
        !!tablistRef.current?.querySelector(
          `.${styles['iui-tab-description']}`, // check directly for the sublabel class
        ),
    );
  }, [type]);

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
      const tab = children[index];
      return React.isValidElement(tab) && tab.props.disabled;
    };

    let newIndex = focusedIndex ?? currentActiveIndex ?? 0;

    /** focus next tab if delta is +1, previous tab if -1 */
    const focusTab = (delta = +1) => {
      do {
        newIndex = (newIndex + delta + children.length) % children.length;
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
      {children.map((child, index) => {
        return (
          <NewTabsContext.Provider
            value={{
              index,
              currentActiveIndex,
              setCurrentActiveIndex,
              onTabSelected: onTabClick,
            }}
            key={index}
          >
            {child}
          </NewTabsContext.Provider>
        );
      })}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'ul', NewTabsTabListOwnProps>;
NewTabsTabList.displayName = 'NewTabs.TabList';

// ----------------------------------------------------------------------------
// NewTabs.Tab component

type NewTabsTabOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const NewTabsTab = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  const { index, currentActiveIndex, onTabSelected } =
    useSafeContext(NewTabsContext);

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
      onClick={() =>
        onTabSelected && index !== undefined && onTabSelected(index)
      }
      ref={ref}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'button', NewTabsTabOwnProps>;
NewTabsTab.displayName = 'NewTabs.Tab';

// ----------------------------------------------------------------------------
// NewTabs.TabIcon component

const NewTabsTabIcon = polymorphic.span('iui-tab-icon', {
  'aria-hidden': true,
});
NewTabsTabIcon.displayName = 'NewTabs.TabIcon';

// ----------------------------------------------------------------------------
// NewTabs.TabInfo component

const NewTabsTabInfo = polymorphic.span('iui-tab-label');
NewTabsTabInfo.displayName = 'NewTabs.TabInfo';

// ----------------------------------------------------------------------------
// NewTabs.TabLabel component

const NewTabsTabLabel = polymorphic('');
NewTabsTabLabel.displayName = 'NewTabs.TabLabel';

// ----------------------------------------------------------------------------
// NewTabs.TabDescription component

const NewTabsTabDescription = polymorphic('iui-tab-description');
NewTabsTabDescription.displayName = 'NewTabs.TabDescription';

// ----------------------------------------------------------------------------
// NewTabs.Actions component

type NewTabsActionsOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const NewTabsActions = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  const { type } = useSafeContext(NewTabsContext);

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
}) as PolymorphicForwardRefComponent<'div', NewTabsActionsOwnProps>;
NewTabsActions.displayName = 'NewTabs.Actions';

// ----------------------------------------------------------------------------
// NewTabs.Action component

type NewTabsActionOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const NewTabsAction = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  const { type } = useSafeContext(NewTabsContext);

  if (type !== 'pill') {
    return (
      <Box className={cx('iui-tabs-actions', className)} ref={ref} {...rest}>
        {children}
      </Box>
    );
  } else {
    return <></>;
  }
}) as PolymorphicForwardRefComponent<'div', NewTabsActionOwnProps>;
NewTabsAction.displayName = 'NewTabs.Action';

// ----------------------------------------------------------------------------
// NewTabs.Panels component

const NewTabsPanels = ({ children }: { children: React.ReactNode[] }) => {
  const { currentActiveIndex } = useSafeContext(NewTabsContext);

  return (
    <>
      {children.map((child, index) => {
        return (
          <NewTabsContext.Provider
            value={{ index, currentActiveIndex }}
            key={index}
          >
            {child}
          </NewTabsContext.Provider>
        );
      })}
    </>
  );
};
NewTabsPanels.displayName = 'NewTabs.Panels';

// ----------------------------------------------------------------------------
// NewTabs.Panel component

type NewTabsPanelOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const NewTabsPanel = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  const { index, currentActiveIndex } = useSafeContext(NewTabsContext);

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
}) as PolymorphicForwardRefComponent<'div', NewTabsPanelOwnProps>;
NewTabsPanel.displayName = 'NewTabs.Panel';

/**
 * Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.
 * @example
 * <NewTabs>
 *   <NewTabs.Tab>
 *     <NewTabs.TabInfo>
 *       <NewTabs.TabLabel>Label 1</NewTabs.TabLabel>
 *     </NewTabs.TabInfo>
 *   </NewTabs.Tab>
 *   <NewTabs.Tab>
 *     <NewTabs.TabInfo>
 *       <NewTabs.TabLabel>Label 2</NewTabs.TabLabel>
 *     </NewTabs.TabInfo>
 *   </NewTabs.Tab>
 *   <NewTabs.Tab>
 *     <NewTabs.TabInfo>
 *       <NewTabs.TabLabel>Label 3</NewTabs.TabLabel>
 *     </NewTabs.TabInfo>
 *   </NewTabs.Tab>
 *   <NewTabs.Actions>
 *     <NewTabs.Action>
 *       <Button>Sample Button</Button>,
 *     </NewTabs.Action>
 *   </NewTabs.Actions>
 *   <NewTabs.Panels>
 *     <NewTabs.Panel>Content 1</NewTabs.Panel>
 *     <NewTabs.Panel>Content 2</NewTabs.Panel>
 *     <NewTabs.Panel>Content 3</NewTabs.Panel>
 *   </NewTabs.Panels>
 * </NewTabs>
 *
 * @example
 * <NewTabs orientation='vertical'/>
 *
 * @example
 * <NewTabs.Tab>
 *   <NewTabs.TabInfo>
 *     <NewTabs.TabIcon>
 *       <SvgPlaceholder />
 *     </NewTabs.TabIcon>
 *     <NewTabs.TabLabel>Sample Label</NewTabs.TabLabel>
 *     <NewTabs.TabDescription>Sample Description</NewTabs.TabDescription>
 *   </NewTabs.TabInfo>
 * </NewTabs.Tab>
 *
 */

export const NewTabs = Object.assign(NewTabsComponent, {
  /**
   * 	Tab list subcomponent
   */
  TabList: NewTabsTabList,
  /**
   * 	Tab subcomponent
   */
  Tab: NewTabsTab,
  /**
   *  Tab icon subcomponent
   */
  TabIcon: NewTabsTabIcon,
  /**
   * 	Tab info subcomponent
   */
  TabInfo: NewTabsTabInfo,
  /**
   * 	Tab label subcomponent
   */
  TabLabel: NewTabsTabLabel,
  /**
   * 	Tab description subcomponent
   */
  TabDescription: NewTabsTabDescription,
  /**
   * 	Tab actions subcomponent
   */
  Actions: NewTabsActions,
  /**
   * 	Tab action subcomponent
   */
  Action: NewTabsAction,
  /**
   * 	Tab panels subcomponent
   */
  Panels: NewTabsPanels,
  /**
   * 	Tab panel subcomponent
   */
  Panel: NewTabsPanel,
});

export const NewTabsContext = React.createContext<
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
    }
  | undefined
>(undefined);

export default NewTabs;
