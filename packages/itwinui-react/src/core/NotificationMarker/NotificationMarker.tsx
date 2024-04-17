/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import cx from 'classnames';

type NotificationMarkerProps = {
  /**
   * Content of the NotificationMarker.
   */
  children: React.ReactNode;
  /**
   * Status of notification
   *
   * - 'primary' = blue,
   * - 'positive' = green,
   * - 'warning' = orange,
   * - 'negative' = red,
   * - 'white' = white (useful for notifications in buttons with `style` = `high-visibility` | `cta`),
   * @default 'primary'
   */
  status?: 'primary' | 'positive' | 'warning' | 'negative' | 'white';
  /**
   * Adds a pulse effect to the notification.
   *
   * **WARNING**: Avoid overuse of this prop.
   * @default false
   */
  pulsing?: boolean;
  /**
   * Instead of conditionally rendering the `NotificationMarker`, the `enabled` prop can be used.
   *
   * When `enabled` is set to `false`, the DOM element will still be present, but the notification marker will not be displayed visually.
   *
   * @example
   * <NotificationMarker enabled={notifications.length > 0}>
   *  …
   * </NotificationMarker>
   * @default true
   */
  enabled?: boolean;
};

/**
 * A small notification circle to the top-right of the passed children prop.
 * This can be applied to almost anything but mostly intended for icons within buttons with `styleType = default / borderless`.
 * @example
 * <IconButton styleType='borderless'>
 *   <NotificationMarker>
 *     <SvgNotification />
 *   </NotificationMarker>
 * </IconButton>
 * @example
 * <NotificationMarker status='positive' pulsing={true}>Live</NotificationMarker>
 */
export const NotificationMarker = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    status = 'primary',
    pulsing = false,
    enabled = true,
    ...rest
  } = props;

  return (
    <Box
      as='span'
      ref={ref}
      className={cx({ 'iui-notification-marker': enabled }, className)}
      data-iui-variant={enabled ? status : null}
      data-iui-urgent={enabled ? pulsing : null}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'span', NotificationMarkerProps>;
