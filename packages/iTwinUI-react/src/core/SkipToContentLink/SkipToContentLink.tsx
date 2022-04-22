/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme } from '../utils';
import '@itwin/itwinui-css/css/skip-to-content.css';

export type SkipToContentLinkProps = {
  /**
   * The id of the main content that the link directs to. Don't forget the #!
   */
  href: string;
  /**
   * Localize 'Skip to main content' label.
   * @default 'Skip to main content'
   */
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'>;

/**
 * `SkipToContentLink` is for screen reader and keyboard users and will not be visible unless tabbed to.
 * Provides a shortcut to the main content of the page without navigating through the header, etc.
 * Should be placed just inside the body. Set `href` to the id of your main content component. Don't forget the `#`!
 * @example
 * <body><SkipToContentLink href='#main-content-id' /> ... </body>
 * <body><SkipToContentLink href='#main-content-id'>{localizedLabel}</SkipToContentLink> ... </body>
 */
export const SkipToContentLink = React.forwardRef<
  HTMLAnchorElement,
  SkipToContentLinkProps
>((props, ref) => {
  const { children = 'Skip to main content', className, ...rest } = props;

  useTheme();

  return (
    <a
      ref={ref}
      className={cx('iui-skip-to-content-link', className)}
      {...rest}
    >
      {children}
    </a>
  );
});

export default SkipToContentLink;
