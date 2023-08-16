/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { WithCSSTransition, SvgChevronRight, Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { IconButton } from '../Buttons/index.js';
import { Tooltip } from '../Tooltip/index.js';

type SideNavigationProps = {
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
  /**
   * Passes props for SideNav wrapper.
   */
  wrapperProps?: React.ComponentProps<'div'>;
  /**
   * Passes props for SideNav content.
   */
  contentProps?: React.ComponentProps<'div'>;
  /**
   * Passes props for SideNav top.
   */
  topProps?: React.ComponentProps<'div'>;
  /**
   * Passes props for SideNav bottom.
   */
  bottomProps?: React.ComponentProps<'div'>;
};

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
export const SideNavigation = React.forwardRef((props, forwardedRef) => {
  const {
    items,
    secondaryItems,
    expanderPlacement = 'top',
    className,
    isExpanded = false,
    onExpanderClick,
    submenu,
    isSubmenuOpen = false,
    wrapperProps,
    contentProps,
    topProps,
    bottomProps,
    ...rest
  } = props;

  const [_isExpanded, _setIsExpanded] = React.useState(isExpanded);
  React.useEffect(() => {
    _setIsExpanded(isExpanded);
  }, [isExpanded]);

  const ExpandButton = (
    <IconButton
      label='Toggle icon labels'
      aria-expanded={_isExpanded}
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
    <Box
      {...wrapperProps}
      className={cx('iui-side-navigation-wrapper', wrapperProps?.className)}
      ref={forwardedRef}
    >
      <Box
        as='div'
        className={cx(
          'iui-side-navigation',
          {
            'iui-expanded': _isExpanded,
            'iui-collapsed': !_isExpanded,
          },
          className,
        )}
        {...rest}
      >
        {expanderPlacement === 'top' && ExpandButton}
        <Box
          as='div'
          {...contentProps}
          className={cx('iui-sidenav-content', contentProps?.className)}
        >
          <Box
            as='div'
            {...topProps}
            className={cx('iui-top', topProps?.className)}
          >
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
          </Box>
          <Box
            as='div'
            {...bottomProps}
            className={cx('iui-bottom', bottomProps?.className)}
          >
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
          </Box>
        </Box>
        {expanderPlacement === 'bottom' && ExpandButton}
      </Box>
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
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', SideNavigationProps>;

export default SideNavigation;
