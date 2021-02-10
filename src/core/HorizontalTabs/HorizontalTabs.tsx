// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import '@bentley/itwinui/css/tabs.css';
import cx from 'classnames';
import React from 'react';

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
};

/**
 * Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.
 * @example
 * <HorizontalTabs labels={['Label 1','Label 2','Label 3']} />
 * <HorizontalTabs labels={['Label 1','Label 2','Label 3']} type={'borderless'} />
 * <HorizontalTabs labels={['Label 1','Active Index','Label 3']} activeIndex={1} />
 * <HorizontalTabs labels={['Label 1','Label 2','Label 3']} color={'green'} />
 */
export const HorizontalTabs: React.FC<HorizontalTabsProps> = (props) => {
  const {
    labels,
    activeIndex,
    onTabSelected,
    type = 'default',
    color = 'blue',
    tabsClassName,
    contentClassName,
    children,
  } = props;

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

  const [currentIndex, setCurrentIndex] = React.useState(getValidIndex());

  React.useEffect(() => {
    if (activeIndex != null && currentIndex !== activeIndex) {
      setCurrentIndex(getValidIndex());
    }
  }, [activeIndex, currentIndex, getValidIndex]);

  const onTabClick = (index: number) => {
    if (onTabSelected) {
      onTabSelected(index);
    }
    setCurrentIndex(index);
  };

  const mainClass = React.useCallback(() => {
    switch (type) {
      case 'borderless':
        return 'iui-tabs-borderless';
      case 'pill':
        return 'iui-tabs-pill';
      default:
        return 'iui-tabs-horizontal';
    }
  }, [type]);

  return (
    <>
      <ul
        className={cx(
          mainClass(),
          { 'iui-green': color === 'green' },
          tabsClassName,
        )}
      >
        {labels.map((label, index) => {
          const onClick = () => onTabClick(index);
          return (
            <li
              className={cx({ 'iui-tabs-active': index === currentIndex })}
              key={index}
              role='tab'
              aria-selected={index === currentIndex}
            >
              <a onClick={onClick} role='button'>
                {label}
              </a>
            </li>
          );
        })}
      </ul>
      {children && (
        <div
          className={cx(
            { 'iui-tabs-content-area': type === 'default' },
            contentClassName,
          )}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default HorizontalTabs;
