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
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

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
  defaultValue: string;
  /**
   * Color of the bar on the active tab.
   * @default 'blue'
   */
  color?: 'blue' | 'green';
} & TabsOrientationProps;

const NewTabsComponent = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    orientation = 'horizontal',
    type = 'default',
    color = 'blue',
    defaultValue,
    ...rest
  } = props;

  const [activeValue, setActiveValue] = React.useState<string>(defaultValue);

  return (
    <Box
      className={cx('iui-tabs-wrapper', `iui-${orientation}`, className)}
      ref={ref}
      {...rest}
    >
      <NewTabsContext.Provider
        value={{ type, color, activeValue, setActiveValue }}
      >
        {children}
      </NewTabsContext.Provider>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', NewTabsComponentOwnProps>;
NewTabsComponent.displayName = 'NewTabs';

// ----------------------------------------------------------------------------
// NewTabs.TabList component

type NewTabsTabListOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const NewTabsTabList = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  const isClient = useIsClient();

  const { type, color } = useSafeContext(NewTabsContext);

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
          // 'iui-large': hasSublabel,
        },
        className,
      )}
      ref={ref}
      {...rest}
    >
      {/* <TransferListContext.Provider value={{ labelId, setLabelId }}> */}
      {children}
      {/* </TransferListContext.Provider> */}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'ul', NewTabsTabListOwnProps>;
NewTabsTabList.displayName = 'NewTabs.TabList';

// ----------------------------------------------------------------------------
// NewTabs.Tab component

type NewTabsTabOwnProps = {
  /**
   * A unique value that associates the Tab with the Panel
   */
  value: string;
};

const NewTabsTab = React.forwardRef((props, ref) => {
  const { value, className, children, ...rest } = props;

  const { activeValue, setActiveValue } = useSafeContext(NewTabsContext);

  return (
    <Box
      as='button'
      className={cx(
        'iui-tab',
        { 'iui-active': value === activeValue },
        className,
      )}
      role='tab'
      tabIndex={value === activeValue ? 0 : -1}
      onClick={() => setActiveValue && setActiveValue(value)}
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
// NewTabs.Panel component

type NewTabsPanelOwnProps = {
  /**
   * A unique value that associates the Tab with the Panel
   */
  value: string;
};

const NewTabsPanel = React.forwardRef((props, ref) => {
  const { value, className, children, ...rest } = props;

  const { activeValue } = useSafeContext(NewTabsContext);

  if (activeValue === value) {
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
  Description: NewTabsTabDescription,
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
  Panel: NewTabsPanel,
});

export const NewTabsContext = React.createContext<
  | {
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
      activeValue?: string;
      /**
       * Handler for activating a tab.
       */
      setActiveValue?: (value: string) => void;
    }
  | undefined
>(undefined);

export default NewTabs;
