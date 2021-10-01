/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import {
  useTheme,
  useResizeObserver,
  useMergedRefs,
  getBoundedValue,
} from '../utils';
import '@itwin/itwinui-css/css/tabs.css';
import { Tab } from './Tab';

export type TabsProps = {
  /**
   * Elements shown for each tab.
   * Recommended to pass an array of `Tab` components.
   */
  labels: React.ReactNodeArray;
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
   * Type of the tabs.
   * @default 'default'
   */
  type?: 'default' | 'borderless' | 'pill';
  /**
   * Orientation of the tabs.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Custom CSS class name for tabs.
   */
  tabsClassName?: string;
  /**
   * Custom CSS class name for tab panel.
   */
  contentClassName?: string;
  /**
   * Content inside the tab panel.
   */
  children?: React.ReactNode;
};

export type HorizontalTabsProps = Omit<TabsProps, 'orientation'>;
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
    children,
    ...rest
  } = props;

  useTheme();

  const tablistRef = React.useRef<HTMLUListElement>(null);

  const [tabsWidth, setTabsWidth] = React.useState(
    () => tablistRef.current?.getBoundingClientRect().width,
  );
  const updateTabsWidth = React.useCallback(
    ({ width }) => setTabsWidth(width),
    [],
  );

  const [tablistSizeRef] = useResizeObserver(updateTabsWidth);
  const refs = useMergedRefs(tablistRef, tablistSizeRef);

  const [currentActiveIndex, setCurrentActiveIndex] = React.useState(() =>
    activeIndex != null
      ? getBoundedValue(activeIndex, 0, labels.length - 1)
      : 0,
  );
  React.useLayoutEffect(() => {
    if (activeIndex != null && currentActiveIndex !== activeIndex) {
      setCurrentActiveIndex(getBoundedValue(activeIndex, 0, labels.length - 1));
    }
  }, [activeIndex, currentActiveIndex, labels.length]);

  const [stripeStyle, setStripeStyle] = React.useState<React.CSSProperties>({});
  React.useLayoutEffect(() => {
    if (type !== 'default') {
      const activeTab = tablistRef.current?.children[
        currentActiveIndex
      ] as HTMLElement;
      const activeTabRect = activeTab?.getBoundingClientRect();

      setStripeStyle({
        width: orientation === 'horizontal' ? activeTabRect?.width : undefined,
        height: orientation === 'vertical' ? activeTabRect?.height : undefined,
        left:
          orientation === 'horizontal'
            ? activeTab?.offsetLeft
            : activeTabRect?.width - 2,
        top:
          orientation === 'horizontal'
            ? activeTabRect?.height - 2
            : activeTab?.offsetTop,
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
  React.useLayoutEffect(() => {
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
    <div className={cx('iui-tabs-wrapper', `iui-${orientation}`)}>
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
      {type !== 'default' && (
        <div className='iui-tab-stripe' style={stripeStyle} />
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
 * Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.
 * @example
 * const tabs = [
 *   <Tab label='Label 1' sublabel='First tab' />,
 *   <Tab label='Label 2' sublabel='Active tab' />,
 *   <Tab label='Label 3'  sublabel='Disabled tab' disabled icon={<SvgPlaceholder />} />,
 * ];
 * <VerticalTabs labels={tabs} activeIndex={1}>Tabpanel content</VerticalTabs>
 */
export const VerticalTabs = (props: VerticalTabsProps) => (
  <Tabs orientation='vertical' {...props} />
);

export default Tabs;
