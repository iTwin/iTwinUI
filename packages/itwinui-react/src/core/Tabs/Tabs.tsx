/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import {
  useTheme,
  useMergedRefs,
  getBoundedValue,
  useContainerWidth,
  useIsomorphicLayoutEffect,
  useOverflow,
  useIsClient,
} from '../utils';
import '@itwin/itwinui-css/css/tabs.css';
import { Tab } from './Tab';

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

type TabsOverflowProps =
  | {
      /**
       * If specified, this prop will be used to show a custom button when overflow happens,
       * i.e. when there is not enough space to fit all the tabs. When using overflowButton,
       * the last visible tab will be replaced by the active tab if it's not otherwise visible.
       *
       * Expects a function that takes the number of items that are visible
       * and returns the `ReactNode` to render.
       *
       * Not applicable to `type: 'pill'` or `orientation: 'vertical'`.
       *
       * @example <caption>Uses the overflow button to add a dropdown that contains hidden tabs</caption>
       *  const [index, setIndex] = React.useState(0);
       *  return (
       *    <Tabs
       *      overflowButton={(visibleCount) => (
       *        <DropdownMenu
       *          menuItems={(close) =>
       *            Array(items.length - visibleCount)
       *              .fill(null)
       *              .map((_, _index) => {
       *                const index = visibleCount + _index + 1;
       *                const onClick = () => {
       *                  // click on "index" tab
       *                  setIndex(index - 1);
       *                  close();
       *                };
       *                return (
       *                  <MenuItem key={index} onClick={onClick}>
       *                    Item {index}
       *                  </MenuItem>
       *                );
       *              })
       *          }
       *        >
       *          <IconButton style={{ paddingTop: '12px', margin: '4px', height: 'auto' }} styleType='borderless'>
       *            <SvgMoreSmall />
       *          </IconButton>
       *        </DropdownMenu>
       *      )}
       *      onTabSelected={setIndex}
       *      activeIndex={index}
       *    >
       *      {tabs}
       *    </Tabs>
       *  );
       */
      overflowButton?: (visibleCount: number) => React.ReactNode;
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
      type?: 'default' | 'borderless';
    }
  | {
      orientation: 'vertical';
      type?: 'default' | 'borderless';
    }
  | {
      type: 'pill';
      orientation?: 'horizontal';
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
  // Separate overflowButton from props to avoid adding it to the DOM (using {...rest})
  let overflowButton: ((visibleCount: number) => React.ReactNode) | undefined;
  if (
    props.type !== 'pill' &&
    props.orientation !== 'vertical' &&
    props.overflowButton
  ) {
    overflowButton = props.overflowButton;
    props = { ...props };
    delete props.overflowButton;
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
  const [overflowRef, visibleCount] = useOverflow(labels);
  const refs = useMergedRefs(tablistRef, tablistSizeRef, overflowRef);

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

  const displayTabs = React.useMemo(() => {
    const visibleLabels = labels.slice(0, visibleCount - 1);
    const visibleIndices: number[] = [];

    const visibleTabs = visibleLabels.map((label, index) => {
      visibleIndices.push(index);

      return createTab(label, index);
    });

    const isActiveTabVisible =
      visibleIndices.findIndex((tab) => tab === currentActiveIndex) > -1;
    if (isActiveTabVisible) {
      visibleTabs.push(createTab(labels[visibleCount - 1], visibleCount - 1));
    } else {
      visibleTabs.push(
        createTab(labels[currentActiveIndex], currentActiveIndex),
      );
    }

    if (overflowButton && labels.length - visibleCount > 0) {
      const overflowButtonElement = (
        <li key={'overflow'}>{overflowButton(visibleCount)}</li>
      );
      visibleTabs.push(overflowButtonElement);
    }

    return visibleTabs;
  }, [labels, visibleCount, overflowButton, createTab, currentActiveIndex]);

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
            'iui-overflow': overflowButton,
          },
          tabsClassName,
        )}
        role='tablist'
        ref={refs}
        onKeyDown={onKeyDown}
        {...rest}
      >
        {overflowButton
          ? displayTabs
          : labels.map((label, index) => createTab(label, index))}
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
