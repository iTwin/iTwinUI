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
import { getBoundedValue } from '../utils/common';

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
    focusActivationMode = 'auto',
    type = 'default',
    color = 'blue',
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
      const activeTab = tablistRef.current?.children[currentActiveIndex];
      setStripeStyle({
        width: activeTab?.getBoundingClientRect().width,
        left: (activeTab as HTMLElement)?.offsetLeft,
      });
    }
  }, [currentActiveIndex, type, tabsWidth]);

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
    // alt + left/right is used by browser / assistive technologies
    if (event.altKey) {
      return;
    }

    const isTabDisabled = (index: number) => {
      const tab = labels[index];
      return React.isValidElement(tab) && tab.props.disabled;
    };

    const focusTabAt = (index: number) => {
      setFocusedIndex(index);
      focusActivationMode === 'auto' && onTabClick(index);
    };

    let newIndex = focusedIndex ?? currentActiveIndex;
    switch (event.key) {
      case 'ArrowRight': {
        do {
          newIndex = (newIndex + 1 + labels.length) % labels.length;
        } while (isTabDisabled(newIndex) && newIndex !== focusedIndex);
        focusTabAt(newIndex);
        event.preventDefault();
        break;
      }
      case 'ArrowLeft': {
        do {
          newIndex = (newIndex - 1 + labels.length) % labels.length;
        } while (isTabDisabled(newIndex) && newIndex !== focusedIndex);
        focusTabAt(newIndex);
        event.preventDefault();
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
                <HorizontalTab
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

export default HorizontalTabs;
