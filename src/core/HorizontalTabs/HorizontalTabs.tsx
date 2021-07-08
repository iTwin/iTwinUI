/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/tabs.css';
import { useResizeObserver } from '../utils/hooks/useResizeObserver';
import { useMergedRefs } from '../utils/hooks/useMergedRefs';

export type HorizontalTabsProps = {
  /**
   * Elements shown for each tab.
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
   * Custom CSS class name for tabs.
   */
  tabsClassName?: string;
  /**
   * Custom CSS class name for content.
   */
  contentClassName?: string;
  /**
   * Content inside the tab area.
   */
  children?: React.ReactNode;
};

/**
 * Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.
 * @example
 * <HorizontalTabs labels={['Label 1','Label 2','Label 3']} />
 * <HorizontalTabs labels={['Label 1','Label 2','Label 3']} type={'borderless'} />
 * <HorizontalTabs labels={['Label 1','Active Index','Label 3']} activeIndex={1} />
 * <HorizontalTabs labels={['Label 1','Label 2','Label 3']} color={'green'} />
 */
export const HorizontalTabs = (props: HorizontalTabsProps) => {
  const {
    labels,
    activeIndex,
    onTabSelected,
    type = 'default',
    color = 'blue',
    tabsClassName,
    contentClassName,
    children,
    ...rest
  } = props;

  useTheme();

  const getValidIndex = React.useCallback((): number => {
    let index = 0;
    if (
      activeIndex != null &&
      activeIndex >= 0 &&
      activeIndex < labels.length
    ) {
      index = activeIndex;
    }
    return index;
  }, [activeIndex, labels.length]);

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

  const [currentIndex, setCurrentIndex] = React.useState(getValidIndex());
  const [stripeStyle, setStripeStyle] = React.useState<React.CSSProperties>({});

  React.useLayoutEffect(() => {
    if (activeIndex != null && currentIndex !== activeIndex) {
      setCurrentIndex(getValidIndex());
    }
  }, [activeIndex, currentIndex, getValidIndex]);

  React.useLayoutEffect(() => {
    if (type !== 'default') {
      const activeTab = tablistRef.current?.children[currentIndex];
      setStripeStyle({
        width: activeTab?.getBoundingClientRect().width,
        left: (activeTab as HTMLElement)?.offsetLeft,
      });
    }
  }, [currentIndex, type, tabsWidth]);

  const onTabClick = (index: number) => {
    if (onTabSelected) {
      onTabSelected(index);
    }
    setCurrentIndex(index);
  };

  return (
    <div className='iui-tabs-wrapper'>
      <ul
        className={cx(
          'iui-tabs',
          `iui-${type}`,
          {
            'iui-green': color === 'green',
            'iui-animated': type !== 'default',
          },
          tabsClassName,
        )}
        role='tablist'
        ref={refs}
        {...rest}
      >
        {labels.map((label, index) => {
          const onClick = () => onTabClick(index);
          return (
            <li key={index}>
              <button
                className={cx('iui-tab', {
                  'iui-active': index === currentIndex,
                })}
                onClick={onClick}
                role='tab'
                aria-selected={index === currentIndex}
              >
                {label}
              </button>
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

export default HorizontalTabs;
