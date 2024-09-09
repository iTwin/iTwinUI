/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Transition } from 'react-transition-group';
import cx from 'classnames';
import {
  getWindow,
  StatusIconMap,
  SvgCloseSmall,
  Box,
  useSafeContext,
  ButtonBase,
  useMediaQuery,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { IconButton } from '../Buttons/IconButton.js';
import { ToasterStateContext } from './Toaster.js';

export type ToastCategory =
  | 'informational'
  | 'negative'
  | 'positive'
  | 'warning';

export type ToastProps = {
  /**
   * Internal id of the toast. Used for closing the toasts.
   */
  id: number;
  /**
   * Content of the Toast message
   */
  content: React.ReactNode;
  /**
   * Passes props to toast and content
   */
  domProps?: {
    toastProps?: React.ComponentProps<'div'>;
    contentProps?: React.ComponentProps<'div'>;
  };
  /**
   * Category of the Toast, which controls the border color, as well as the category icon.
   */
  category: ToastCategory;
  /**
   * The Type of the Toast.
   * Persisting Toasts will not be closed automatically, and will contain a close button.
   * Temporary Toasts will automatically close after 7 seconds and will not contain a close button.
   * @default 'temporary'
   */
  type?: 'persisting' | 'temporary';
  /**
   * Controlled boolean prop indicating whether the toast is visible.
   */
  isVisible?: boolean;
  /**
   * Duration of the toast in millisecond.
   * @default 7000
   */
  duration?: number;
  /**
   * Boolean indicating when the close button is visible.
   * When false, the toast will not have any close button.
   */
  hasCloseButton?: boolean;
  /**
   * Props for a button/link that can be used to perform an action
   * (e.g. to show additional information).
   */
  link?: {
    title: string;
  } & Omit<React.ComponentPropsWithoutRef<'button'>, 'children'>;
  /**
   * Function called when the toast is all the way closed.
   */
  onRemove?: () => void;
  /**
   * Element to which the toast will animate out to.
   */
  animateOutTo?: HTMLElement | null;
};

/**
 * Generic Toast Component
 * @example
 * <Toast type='persisting' content='Job processing completed.' category='positive' link={{onClick:() => {alert('Link callback')}, title:'View the report'}} />
 * <Toast type='temporary' content='Processing completed.' category='positive' />
 * <Toast type='temporary' content='26 files are available for synchronization.' category='informational' />
 * <Toast type='persisting' content='Job processing error.' category='negative' />
 */
export const Toast = (props: ToastProps) => {
  const {
    content,
    category,
    type = 'temporary',
    isVisible: isVisibleProp,
    link,
    duration = 7000,
    hasCloseButton,
    onRemove,
    animateOutTo,
    domProps,
  } = props;

  const closeTimeout = React.useRef(0);
  const { placement } = useSafeContext(ToasterStateContext).settings;
  const placementPosition = placement.startsWith('top') ? 'top' : 'bottom';

  const [visible, setVisible] = React.useState(isVisibleProp ?? true);
  const isVisible = isVisibleProp ?? visible;

  const [height, setHeight] = React.useState(0);
  const thisElement = React.useRef<HTMLDivElement>(null);
  const [margin, setMargin] = React.useState(0);

  const motionOk = useMediaQuery('(prefers-reduced-motion: no-preference)');

  const marginStyle = () => {
    if (placementPosition === 'top') {
      return { marginBlockEnd: margin };
    }
    return { marginBlockStart: margin };
  };

  React.useEffect(() => {
    if (type === 'temporary') {
      setCloseTimeout(duration);
    }

    return () => {
      clearCloseTimeout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, type]);

  React.useEffect(() => {
    // if we don't have animateOutTo point and not isVisible, set negative margin to move other toasts up.
    // Close all and close on toasts with no anchor.
    if (!isVisible && !animateOutTo) {
      setMargin(-height);
    }
  }, [isVisible, animateOutTo, setMargin, height]);

  const close = () => {
    clearCloseTimeout();
    // move element up when this element is closed.
    setMargin(-height);
    setVisible(false);
  };

  const setCloseTimeout = (timeout: number) => {
    const definedWindow = getWindow();
    if (!definedWindow) {
      return;
    }

    closeTimeout.current = definedWindow.setTimeout(() => {
      close();
    }, timeout);
  };

  const clearCloseTimeout = () => {
    getWindow()?.clearTimeout(closeTimeout.current);
  };

  const onRef = (ref: HTMLDivElement) => {
    if (ref) {
      const { height } = ref.getBoundingClientRect();
      setHeight(height);
    }
  };

  const calculateOutAnimation = (node: HTMLElement) => {
    // calculation translate x and y pixels.
    let translateX = 0;
    let translateY = 0;
    if (animateOutTo && node) {
      const { x: startX, y: startY } = node.getBoundingClientRect(); // current element
      const { x: endX, y: endY } = animateOutTo.getBoundingClientRect(); // anchor point
      translateX = endX - startX;
      translateY = endY - startY;
    }
    return { translateX, translateY };
  };

  return (
    <Transition
      timeout={{ enter: 240, exit: animateOutTo ? 400 : 120 }}
      in={isVisible}
      appear={true}
      unmountOnExit={true}
      onEnter={(node: HTMLElement) => {
        if (motionOk) {
          node.style.transform = 'translateY(15%)';
          node.style.transitionTimingFunction = 'ease';
        }
      }}
      onEntered={(node: HTMLElement) => {
        if (motionOk) {
          node.style.transform = 'translateY(0)';
        }
      }}
      onExiting={(node) => {
        if (motionOk) {
          const { translateX, translateY } = calculateOutAnimation(node);
          node.style.transform = animateOutTo
            ? `scale(0.9) translate(${translateX}px,${translateY}px)`
            : `scale(0.9)`;
          node.style.opacity = '0';
          node.style.transitionDuration = animateOutTo ? '400ms' : '120ms';
          node.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 1, 1)';
        }
      }}
      onExited={onRemove}
    >
      <Box
        ref={thisElement}
        className='iui-toast-all'
        style={{
          height,
          ...marginStyle(),
        }}
      >
        <div ref={onRef}>
          <ToastPresentation
            as='div'
            category={category}
            content={content}
            link={link}
            type={type}
            hasCloseButton={hasCloseButton}
            onClose={close}
            {...domProps?.toastProps}
            contentProps={domProps?.contentProps}
          />
        </div>
      </Box>
    </Transition>
  );
};

export type ToastPresentationProps = Omit<
  ToastProps,
  'duration' | 'id' | 'isVisible' | 'onRemove' | 'domProps'
> & {
  onClose?: () => void;
  contentProps?: React.ComponentProps<'div'>;
};

/**
 * The presentational part of a toast, without any animation or logic.
 * @private
 */
export const ToastPresentation = React.forwardRef((props, forwardedRef) => {
  const {
    content,
    category,
    type = 'temporary',
    link,
    hasCloseButton,
    onClose,
    className,
    contentProps,
    ...rest
  } = props;

  const StatusIcon = StatusIconMap[category];

  return (
    <Box
      className={cx(`iui-toast iui-${category}`, className)}
      ref={forwardedRef}
      {...rest}
    >
      <Box className='iui-status-area'>
        {<StatusIcon className='iui-icon' />}
      </Box>
      <Box
        as='div'
        {...contentProps}
        className={cx('iui-message', contentProps?.className)}
      >
        {content}
      </Box>
      {link && (
        <ButtonBase
          {...link}
          className={cx('iui-anchor', 'iui-toast-anchor', link.className)}
          title={undefined}
          data-iui-status={category}
          data-iui-underline
        >
          {link.title}
        </ButtonBase>
      )}
      {(type === 'persisting' || hasCloseButton) && (
        <IconButton
          size='small'
          styleType='borderless'
          onClick={onClose}
          aria-label='Close'
        >
          <SvgCloseSmall />
        </IconButton>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', ToastPresentationProps>;
