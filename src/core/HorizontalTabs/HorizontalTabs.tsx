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
import { HorizontalTab } from './HorizontalTab';

export type HorizontalTabsProps = {
  /**
   * Elements shown for each tab.
   * Recommended to pass an array of `HorizontalTab` components.
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
   * Custom CSS class name for tab panel.
   */
  contentClassName?: string;
  /**
   * Content inside the tab panel.
   */
  children?: React.ReactNode;
};

/**
 * Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.
 * @example
 * const tabs = [
 *   <HorizontalTab label='Label 1' />,
 *   <HorizontalTab label='Label 2' />,
 *   <HorizontalTab label='Label 3' />,
 * ];
 * <HorizontalTabs labels={tabs} />
 *
 * @example
 * const tabsWithSublabels = [
 *   <HorizontalTab label='Label 1' sublabel='First tab' />,
 *   <HorizontalTab label='Label 2' sublabel='Active tab' />,
 * ];
 * <HorizontalTabs labels={tabsWithSublabels} activeIndex={1} />
 *
 * @example
 * const tabsWithIcons = [
 *   <HorizontalTab label='Label 1' icon={<SvgPlaceholder />} />,
 *   <HorizontalTab label='Label 2' icon={<SvgPlaceholder />} />,
 * ];
 * <HorizontalTabs labels={tabsWithIcons} type='pill' />
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
            'iui-large': hasSublabel,
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
              {typeof label === 'string' ? (
                <HorizontalTab
                  label={label}
                  className={cx({
                    'iui-active': index === currentIndex,
                  })}
                  onClick={onClick}
                  aria-selected={index === currentIndex}
                />
              ) : (
                React.cloneElement(label as JSX.Element, {
                  className: cx((label as JSX.Element).props.className, {
                    'iui-active': index === currentIndex,
                  }),
                  'aria-selected': index === currentIndex,
                  onClick: (args: unknown) => {
                    onClick();
                    (label as JSX.Element).props.onClick?.(args);
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

export default HorizontalTabs;
