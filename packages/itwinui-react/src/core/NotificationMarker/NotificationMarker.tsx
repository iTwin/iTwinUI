/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box, useGlobals } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import cx from 'classnames';
import '@itwin/itwinui-css/css/utils.css';

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
   * Set this programmatically to false when you just want to render the passed children without the notification
   * @default true
   * @example
   * let [newMessagesCount, ...] = useState(0);
   * ...
   * <NotificationMarker enabled={newMessagesCount > 0}>
   *   <SvgNotification />
   * </NotificationMarker>
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
  useGlobals();

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

export default NotificationMarker;
