/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  useTheme,
  CommonProps,
  WithCSSTransition,
  SvgChevronRight,
} from '../utils';
import { IconButton } from '../Buttons';
import { Tooltip } from '../Tooltip';
import '@itwin/itwinui-css/css/side-navigation.css';

export type SideNavigationProps = {
  /**
   * Buttons shown in the top portion of sidenav.
   * Recommended to use `SidenavButton` components.
   */
  items: React.ReactNode[];
  /**
   * Buttons shown at the bottom of sidenav.
   */
  secondaryItems?: React.ReactNode[];
  /**
   * Control the placement of "expander" icon button (or hide it).
   * @default 'top'
   */
  expanderPlacement?: 'top' | 'bottom' | 'hidden';
  /**
   * Controlled flag to expand/collapse the sidenav.
   */
  isExpanded?: boolean;
  /**
   * Callback fired when the "expander" icon is clicked.
   */
  onExpanderClick?: () => void;
  /**
   * Submenu to show supplemental info assicated to the main item.
   *
   * Should be used with the `isSubmenuOpen` props from both `SideNavigation` and `SidenavButton`.
   * @example
   * <SideNavigation
   *   // ...
   *   submenu={(
   *     <SidenavSubmenu>
   *       <SidenavSubmenuHeader>Documents</SidenavSubmenuHeader>
   *       <span>List of documents</span>
   *     </SidenavSubmenu>
   *   )}
   *   isSubmenuOpen={true}
   * />
   */
  submenu?: JSX.Element;
  /**
   * Set to true to display the provided `submenu`.
   *
   * Note that there is an identical prop in `SidenavButton` which should also
   * be set to true for proper styling when submenu is open but page is not active yet.
   * @default false
   */
  isSubmenuOpen?: boolean;
} & Omit<CommonProps, 'title'>;

/**
 * Left side navigation menu component.
 * @example
 * <SideNavigation
 *   items={[
 *     <SidenavButton startIcon={<SvgPlaceholder />}>App 1</SidenavButton>,
 *     <SidenavButton startIcon={<SvgPlaceholder />}>App 2</SidenavButton>,
 *     <SidenavButton startIcon={<SvgPlaceholder />}>App 3</SidenavButton>,
 *   ]}
 *   secondaryItems={[
 *     <SidenavButton startIcon={<SvgSettings />}>Settings</SidenavButton>,
 *   ]}
 * />
 */
export const SideNavigation = (props: SideNavigationProps) => {
  const {
    items,
    secondaryItems,
    expanderPlacement = 'top',
    className,
    isExpanded = false,
    onExpanderClick,
    submenu,
    isSubmenuOpen = false,
    ...rest
  } = props;

  useTheme();

  const [_isExpanded, _setIsExpanded] = React.useState(isExpanded);
  React.useEffect(() => {
    _setIsExpanded(isExpanded);
  }, [isExpanded]);

  const ExpandButton = (
    <IconButton
      className='iui-sidenav-button iui-expand'
      onClick={React.useCallback(() => {
        _setIsExpanded((expanded) => !expanded);
        onExpanderClick?.();
      }, [onExpanderClick])}
    >
      <SvgChevronRight />
    </IconButton>
  );

  return (
    <div className={cx('iui-side-navigation-wrapper', className)} {...rest}>
      <div
        className={cx('iui-side-navigation', {
          'iui-expanded': _isExpanded,
          'iui-collapsed': !_isExpanded,
        })}
      >
        {expanderPlacement === 'top' && ExpandButton}
        <div className='iui-sidenav-content'>
          <div className='iui-top'>
            {items.map((sidenavButton: JSX.Element, index) =>
              !_isExpanded ? (
                <Tooltip
                  content={sidenavButton.props.children}
                  placement='right'
                  key={index}
                >
                  {sidenavButton}
                </Tooltip>
              ) : (
                sidenavButton
              ),
            )}
          </div>
          <div className='iui-bottom'>
            {secondaryItems?.map((sidenavButton: JSX.Element, index) =>
              !_isExpanded ? (
                <Tooltip
                  content={sidenavButton.props.children}
                  placement='right'
                  key={index}
                >
                  {sidenavButton}
                </Tooltip>
              ) : (
                sidenavButton
              ),
            )}
          </div>
        </div>
        {expanderPlacement === 'bottom' && ExpandButton}
      </div>
      {submenu && (
        <WithCSSTransition
          in={isSubmenuOpen}
          dimension='width'
          timeout={200}
          classNames='iui'
        >
          {submenu}
        </WithCSSTransition>
      )}
    </div>
  );
};

export default SideNavigation;
