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
} & TabsOrientationProps;

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

  const onTabClick = (index: number) => {
    if (onTabSelected) {
      onTabSelected(index);
    }
    setCurrentActiveIndex(index);
  };

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
            'iui-animated': type !== 'default',
            'iui-large': hasSublabel,
          },
          tabsClassName,
        )}
        role='tablist'
        ref={refs}
        onKeyDown={onKeyDown}
        {...rest}
      >
        {labels.map((label, index) => {
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
        })}
      </ul>
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
