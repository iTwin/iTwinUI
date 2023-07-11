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
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import styles from '../../styles.js';

// ----------------------------------------------------------------------------
// NewTabsComponent

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
} & TabsOrientationProps;

const NewTabsComponent = React.forwardRef((props, ref) => {
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
   * Breadcrumb items.
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
      onKeyDown={onKeyDown}
      ref={refs}
      {...rest}
    >
      {/* <TransferListContext.Provider value={{ labelId, setLabelId }}> */}
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
      {/* </TransferListContext.Provider> */}
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
      {/* <TransferListContext.Provider value={{ labelId, setLabelId }}> */}
      {children}
      {/* </TransferListContext.Provider> */}
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

const NewTabsActions = polymorphic('iui-tabs-actions-wrapper');
NewTabsActions.displayName = 'NewTabs.Actions';

// ----------------------------------------------------------------------------
// NewTabs.Action component

const NewTabsAction = polymorphic('iui-tabs-actions');
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
        {/* <TransferListContext.Provider value={{ labelId, setLabelId }}> */}
        {children}
        {/* </TransferListContext.Provider> */}
      </Box>
    );
  } else {
    return <></>;
  }
}) as PolymorphicForwardRefComponent<'div', NewTabsPanelOwnProps>;
NewTabsPanel.displayName = 'NewTabs.Panel';

/**
 * The TransferList component is used to display a list within a box
 * @example
 * <TransferList>
 *   <TransferList.ListboxWrapper>
 *     <TransferList.Listbox>
 *       <TransferList.Item>Item 1</TransferList.Item>
 *       <TransferList.Item>Item 2</TransferList.Item>
 *       <TransferList.Item>Item 3</TransferList.Item>
 *       <TransferList.Item>Item 4</TransferList.Item>
 *       <TransferList.Item>Item 5</TransferList.Item>
 *       <TransferList.Item>Item 6</TransferList.Item>
 *     </TransferList.Listbox>
 *   </TransferList.ListboxWrapper>
 * </TransferList>
 */
export const NewTabs = Object.assign(NewTabsComponent, {
  /**
   * 	TransferList listbox wrapper subcomponent
   */
  TabList: NewTabsTabList,
  /**
   * 	TransferList listbox subcomponent
   */
  Tab: NewTabsTab,
  /**
   * 	TransferList item subcomponent
   */
  TabIcon: NewTabsTabIcon,
  /**
   * 	TransferList listbox label subcomponent
   */
  TabInfo: NewTabsTabInfo,
  /**
   * 	TransferList listbox label subcomponent
   */
  TabLabel: NewTabsTabLabel,
  /**
   * 	TransferList toolbar subcomponent
   */
  TabDescription: NewTabsTabDescription,
  /**
   * 	TransferList toolbar subcomponent
   */
  Actions: NewTabsActions,
  /**
   * 	TransferList toolbar subcomponent
   */
  Action: NewTabsAction,
  /**
   * 	TransferList toolbar subcomponent
   */
  Panels: NewTabsPanels,
  /**
   * 	TransferList toolbar subcomponent
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
       * Id to set to label and set 'aria-labelledby' prop of the listbox
       */
      type?: string;
      /**
       * Color of the bar on the active tab.
       * @default 'blue'
       */
      color?: 'blue' | 'green';
      /**
       * Handler for activating a tab.
       */
      activeIndex?: number;
      /**
       * Control whether focusing tabs (using arrow keys) should automatically select them.
       * Use 'manual' if tab panel content is not preloaded.
       * @default 'auto'
       */
      focusActivationMode?: 'auto' | 'manual';
      /**
       * Handler for activating a tab.
       */
      currentActiveIndex?: number;
      /**
       * Handler for activating a tab.
       */
      setCurrentActiveIndex?: (value: number) => void;
      /**
       * Handler for activating a tab.
       */
      index?: number;
      /**
       * Handler for activating a tab.
       */
      onTabSelected?: (index: number) => void;
    }
  | undefined
>(undefined);

export default NewTabs;
