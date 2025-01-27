/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { IconButton } from '../Buttons/IconButton.js';

import { SvgMoreVertical, Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.js';

type HeaderTranslations = {
  /**
   * 'More' menu button aria-label.
   */
  moreOptions: string;
};

type HeaderProps = {
  /**
   * Application logo.
   * (expects `HeaderLogo`)
   * @example
   * <HeaderLogo logo={<SvgImodelHollow />}>iTwin Application</HeaderLogo>
   */
  appLogo: React.ReactNode;
  /**
   * Content on the right of the application button
   * (expects `HeaderBreadcrumbs`)
   * @example
   * <HeaderBreadcrumbs items={[
   *   <HeaderButton key='project' name='Project A' />
   *   <HeaderButton key='imodel' name='IModel X' />
   * ]} />
   */
  breadcrumbs?: React.ReactNode;
  /**
   * Content displayed to the left of the `menuItems`
   * (expects array of icons/avatars wrapped in `IconButton` and/or `DropdownMenu`).
   *
   * @example
   * [
   *  <IconButton><SvgNotification /></IconButton>,
   *  <DropdownMenu>
   *   <IconButton>
   *    <SvgHelpCircularHollow />
   *   </IconButton>
   *  </DropdownMenu>,
   *  <DropdownMenu menuItems={...}>
   *    <IconButton styleType='borderless'>
   *      <Avatar ... />
   *    </IconButton>
   *  </DropdownMenu>
   * ]
   */
  actions?: React.ReactNode[];
  /**
   * Children is put in the center of the Header.
   */
  children?: React.ReactNode;
  /**
   * Items in the more dropdown menu.
   * Pass a function that takes the `close` argument (to close the menu),
   * and returns a list of `MenuItem` components.
   */
  menuItems?: (close: () => void) => React.JSX.Element[];
  /**
   * If true, the header height is reduced, typically used when viewing 3D content.
   * @default false
   */
  isSlim?: boolean;
  /**
   * Provide localized strings.
   */
  translatedStrings?: HeaderTranslations;
};

const defaultTranslations: HeaderTranslations = {
  moreOptions: 'More options',
};

/**
 * Application header
 * @example
 * <Header
 *  appLogo={<HeaderLogo logo={<SvgImodelHollow />}>iTwin Application</HeaderLogo>}
 *  breadcrumbs={
 *   <HeaderBreadcrumbs items={[
 *    <HeaderButton key='project' name='Project A' />,
 *    <HeaderButton key='imodel' name='IModel X' />
 *   ]} />
 *  }
 *  actions={[
 *   <IconButton><SvgNotification /></IconButton>,
 *   <DropdownMenu>
 *    <IconButton>
 *     <SvgHelpCircularHollow />
 *    </IconButton>
 *   </DropdownMenu>,
 *   <DropdownMenu menuItems={…}>
 *    <IconButton styleType='borderless'>
 *     <Avatar … />
 *    </IconButton>
 *   </DropdownMenu>
 *  ]}
 *  isSlim
 * />
 */
export const Header = React.forwardRef((props, forwardedRef) => {
  const {
    appLogo,
    breadcrumbs,
    isSlim = false,
    actions,
    menuItems,
    translatedStrings,
    className,
    children,
    ...rest
  } = props;

  const headerTranslations = { ...defaultTranslations, ...translatedStrings };
  return (
    <Box
      as='header'
      className={cx('iui-page-header', className)}
      data-iui-size={isSlim ? 'slim' : undefined}
      ref={forwardedRef}
      {...rest}
    >
      <Box className='iui-page-header-left'>
        {appLogo}
        {breadcrumbs && <Box className='iui-page-header-divider' />}
        {breadcrumbs}
      </Box>
      {children && <Box className='iui-page-header-center'>{children}</Box>}
      <Box className='iui-page-header-right'>
        {actions}
        {menuItems && (
          <DropdownMenu menuItems={menuItems}>
            <IconButton
              styleType='borderless'
              aria-label={headerTranslations.moreOptions}
            >
              <SvgMoreVertical aria-hidden />
            </IconButton>
          </DropdownMenu>
        )}
      </Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'header', HeaderProps>;
if (process.env.NODE_ENV === 'development') {
  Header.displayName = 'Header';
}
