/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type SkipToContentLinkProps = {
  /**
   * The id of the main content that the link directs to. Don't forget the #!
   */
  href: string;
  /**
   * Localize 'Skip to main content' label.
   * @default 'Skip to main content'
   */
  children?: React.ReactNode;
};

/**
 * `SkipToContentLink` is for screen reader and keyboard users and will not be visible unless tabbed to.
 * Provides a shortcut to the main content of the page without navigating through the header, etc.
 * Should be placed just inside the body. Set `href` to the id of your main content component. Don't forget the `#`!
 * @example
 * <body><SkipToContentLink href='#main-content-id' /> ... </body>
 * <body><SkipToContentLink href='#main-content-id'>{localizedLabel}</SkipToContentLink> ... </body>
 */
export const SkipToContentLink = React.forwardRef((props, ref) => {
  const { children = 'Skip to main content', className, ...rest } = props;

  return (
    <Box
      as='a'
      ref={ref}
      className={cx('iui-skip-to-content-link', className)}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'a', SkipToContentLinkProps>;
