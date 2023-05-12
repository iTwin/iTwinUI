/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import {
  useTheme,
  useMergedRefs,
  getBoundedValue,
  useContainerWidth,
  useIsomorphicLayoutEffect,
  useIsClient,
  useResizeObserver,
} from '../utils/index.js';
import '@itwin/itwinui-css/css/tabs.css';
import { Tab } from './Tab.js';

export type OverflowOptions = {
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
       * If `orientation = 'vertical'`, `pill` is not applicable.
       * @default 'default'
       */
      type?: 'default';
    }
  | {
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

type TabsTypeProps =
  | {
      /**
       * Type of the tabs.
       *
       * If `orientation = 'vertical'`, `pill` is not applicable.
       * @default 'default'
       */
      type?: 'default' | 'borderless';
      /**
       * Content displayed to the right/bottom of the horizontal/vertical tabs
       *
       * If `type = 'pill'`, `actions` is not applicable.
       */
      actions?: React.ReactNode[];
    }
  | {
      type: 'pill';
    };

export type TabsProps = {
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
  TabsTypeProps &
  TabsOverflowProps;

/**
 * @deprecated Since v2, use `TabProps` with `Tabs`
 */
export type HorizontalTabsProps = Omit<TabsProps, 'orientation'>;

/**
 * @deprecated Since v2, use `TabProps` with `Tabs`
 */
export type VerticalTabsProps = Omit<TabsProps, 'orientation' | 'type'> & {
  type?: 'default' | 'borderless';
};

/**
 * Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.
 * @example
 * const tabs = [
 *   <Tab label='Label 1' />,
 *   <Tab label='Label 2' />,
 *   <Tab label='Label 3' />,
 * ];
 * <Tabs labels={tabs} />
 *
 * @example
 * <Tabs orientation='vertical' labels={tabs} />
 *
 * @example
 * const tabsWithSublabels = [
 *   <Tab label='Label 1' sublabel='First tab' />,
 *   <Tab label='Label 2' sublabel='Active tab' />,
 * ];
 * <Tabs labels={tabsWithSublabels} activeIndex={1} />
 *
 * @example
 * const tabsWithIcons = [
 *   <Tab label='Label 1' icon={<SvgPlaceholder />} />,
 *   <Tab label='Label 2' icon={<SvgPlaceholder />} />,
 * ];
 * <Tabs labels={tabsWithIcons} type='pill' />
 */
export const Tabs = (props: TabsProps) => {
  // Separate actions from props to avoid adding it to the DOM (using {...rest})
  let actions: Array<React.ReactNode> | undefined;
  if (props.type !== 'pill' && props.actions) {
    actions = props.actions;
    props = { ...props };
    delete props.actions;
  }
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
    labels,
    activeIndex,
    onTabSelected,
    focusActivationMode = 'auto',
    type = 'default',
    color = 'blue',
    orientation = 'horizontal',
    tabsClassName,
    contentClassName,
    wrapperClassName,
    children,
    ...rest
  } = props;

  useTheme();
  const isClient = useIsClient();

  const tablistRef = React.useRef<HTMLUListElement>(null);
  const [tablistSizeRef, tabsWidth] = useContainerWidth(type !== 'default');
  const refs = useMergedRefs(tablistRef, tablistSizeRef);

  const [currentActiveIndex, setCurrentActiveIndex] = React.useState(() =>
    activeIndex != null
      ? getBoundedValue(activeIndex, 0, labels.length - 1)
      : 0,
  );
  useIsomorphicLayoutEffect(() => {
    if (activeIndex != null && currentActiveIndex !== activeIndex) {
      setCurrentActiveIndex(getBoundedValue(activeIndex, 0, labels.length - 1));
    }
  }, [activeIndex, currentActiveIndex, labels.length]);

  // CSS custom properties to place the active stripe
  const [stripeProperties, setStripeProperties] = React.useState({});
  useIsomorphicLayoutEffect(() => {
    if (type !== 'default' && tablistRef.current != undefined) {
      const activeTab = tablistRef.current.children[
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

  const [focusedIndex, setFocusedIndex] = React.useState<number | undefined>();
  React.useEffect(() => {
    if (tablistRef.current && focusedIndex !== undefined) {
      const tab = tablistRef.current.querySelectorAll('.iui-tab')[focusedIndex];
      (tab as HTMLElement)?.focus();
    }
  }, [focusedIndex]);

  const [hasSublabel, setHasSublabel] = React.useState(false); // used for setting size
  useIsomorphicLayoutEffect(() => {
    setHasSublabel(
      type !== 'pill' && // pill tabs should never have sublabels
        !!tablistRef.current?.querySelector('.iui-tab-description'), // check directly for the sublabel class
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
        const activeTab = ownerDoc.querySelectorAll('.iui-tab')[
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
      setCurrentActiveIndex(index);
    },
    [onTabSelected],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    // alt + arrow keys are used by browser / assistive technologies
    if (event.altKey) {
      return;
    }

    const isTabDisabled = (index: number) => {
      const tab = labels[index];
      return React.isValidElement(tab) && tab.props.disabled;
    };

    let newIndex = focusedIndex ?? currentActiveIndex;

    /** focus next tab if delta is +1, previous tab if -1 */
    const focusTab = (delta = +1) => {
      do {
        newIndex = (newIndex + delta + labels.length) % labels.length;
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

  const createTab = React.useCallback(
    (label: React.ReactNode, index: number) => {
      const onClick = () => {
        setFocusedIndex(index);
        onTabClick(index);
      };
      return (
        <li key={index}>
          {!React.isValidElement(label) ? (
            <Tab
              label={label}
              className={cx({
                'iui-active': index === currentActiveIndex,
              })}
              tabIndex={index === currentActiveIndex ? 0 : -1}
              onClick={onClick}
              aria-selected={index === currentActiveIndex}
            />
          ) : (
            React.cloneElement(label, {
              className: cx(label.props.className, {
                'iui-active': index === currentActiveIndex,
              }),
              'aria-selected': index === currentActiveIndex,
              tabIndex: index === currentActiveIndex ? 0 : -1,
              onClick: (args: unknown) => {
                onClick();
                label.props.onClick?.(args);
              },
            })
          )}
        </li>
      );
    },
    [currentActiveIndex, onTabClick],
  );

  return (
    <div
      className={cx('iui-tabs-wrapper', `iui-${orientation}`, wrapperClassName)}
      style={stripeProperties}
    >
      <ul
        className={cx(
          'iui-tabs',
          `iui-${type}`,
          {
            'iui-green': color === 'green',
            'iui-animated': type !== 'default' && isClient,
            'iui-not-animated': type !== 'default' && !isClient,
            'iui-large': hasSublabel,
          },
          tabsClassName,
        )}
        data-iui-overflow={overflowOptions?.useOverflow}
        data-iui-scroll-placement={scrollingPlacement}
        role='tablist'
        ref={refs}
        onKeyDown={onKeyDown}
        {...rest}
      >
        {labels.map((label, index) => createTab(label, index))}
      </ul>

      {actions && (
        <div className='iui-tabs-actions-wrapper'>
          <div className='iui-tabs-actions'>{actions}</div>
        </div>
      )}

      {children && (
        <div
          className={cx('iui-tabs-content', contentClassName)}
          role='tabpanel'
        >
          {children}
        </div>
      )}
    </div>
  );
};

/**
 * @deprecated Since v2, directly use `Tabs` with `orientation: 'horizontal'`
 *
 * Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.
 * @example
 * const tabs = [
 *   <Tab label='Label 1' sublabel='First tab' />,
 *   <Tab label='Label 2' sublabel='Active tab' />,
 *   <Tab label='Label 3' sublabel='Disabled tab' disabled icon={<SvgPlaceholder />} />,
 * ];
 * <HorizontalTabs labels={tabs} activeIndex={1}>Tabpanel content</HorizontalTabs>
 */
export const HorizontalTabs = (props: HorizontalTabsProps) => (
  <Tabs orientation='horizontal' {...props} />
);

/**
 * @deprecated Since v2, directly use `Tabs` with `orientation: 'vertical'`
 *
 * Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.
 * @example
 * const tabs = [
 *   <Tab label='Label 1' sublabel='First tab' />,
 *   <Tab label='Label 2' sublabel='Active tab' />,
 *   <Tab label='Label 3' sublabel='Disabled tab' disabled icon={<SvgPlaceholder />} />,
 * ];
 * <VerticalTabs labels={tabs} activeIndex={1}>Tabpanel content</VerticalTabs>
 */
export const VerticalTabs = (props: VerticalTabsProps) => (
  <Tabs orientation='vertical' {...props} />
);

export default Tabs;
