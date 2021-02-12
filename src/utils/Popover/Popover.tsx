// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React, { CSSProperties } from 'react';
import { Position, Positioner } from '../Positioner';

/**
 * Prop Description
 */
export type PopoverProps = {
  /**
   * What will be rendered inside the popover. Outer element MUST be a basic element (div, span, etc) or a class component.
   */
  content: ((close: () => void) => JSX.Element) | JSX.Element;
  /**
   * A click handler will be added to this to open the popover, or you can use render props and call the toggle handler. Outer element MUST be a basic element (div, span, etc) or a class component.
   */
  children: ((toggle: () => void) => JSX.Element) | JSX.Element;
  /**
   * Enum of BOTTOM, TOP, LEFT, RIGHT, TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT, BOTTOM_RIGHT, or as string values bottom, top, left, right, top-left, top-right, bottom-left, bottom-right.
   * @default Position.BOTTOM
   */
  position?: Position;
  /**
   * How many pixels should the positioned element be from the edge of the viewport.
   * @default 6
   */
  bodyOffset?: number;
  /**
   * How many pixels should the positioned element be from the parent / target element.
   * @default 6
   */
  targetOffset?: number;
  /**
   * A controlled override.
   */
  isShown?: boolean;
  /**
   * Show the popover on hover of the target.
   * @default false
   */
  showOnHover?: boolean;
  /**
   * If showOnHover is true, should only the target (not the popover) be hoverable?
   * @default false
   */
  hoverTargetOnly?: boolean;
  /**
   * Should the popover close on a click outside of the popover?
   * @default true
   */
  closeOnExternalClick?: boolean;
  /**
   * Should the popover close on esc keypress?
   * @default true
   */
  closeOnEsc?: boolean;
  /**
   * Should the popover close if the parent / target element is no longer visible?
   * @default false
   */
  closeOnHidden?: boolean;
  /**
   * ID of portal container. Will not be removed from the dom, so keep it constant.
   * @default 'iui-react-portal-container'
   */
  parentId?: string;
  /**
   * If true will automatically focus first element inside popover with 'autofocus', 'tabindex' attributes, button, a elements, or menuitem, menuitemradio roles on open.
   */
  bringFocusInside?: boolean;
  /**
   * CSS properties to be applied to the positioner inside this Popover.
   */
  style?: CSSProperties;
  /**
   * Handler function called when Popover is opened.
   */
  onOpen?: () => void;
  /**
   * Handler function called when Popover is closed.
   */
  onClose?: () => void;
};

type PopoverState = {
  isShown: boolean;
};

/**
 * A positioned element like a context menu with built-in click / esc / hover handlers.
 * +++++
 * <h3>NOTE: Because function components cannot take refs, outer element for content and children MUST forward refs or be a basic element (div, span, etc) or class component.</h3>
 * <h1>Basic</h1>
 * <p>Popover</p>
 * <Popover content={<div>Hey!</div>}>
 *   <button>Click Me</button>
 * </Popover>
 * <p>Set position:</p>
 * <Popover content={<div>I'm on the right!</div>} position="right">
 *   <button>Click Me</button>
 * </Popover>
 * <h1>Open / Close Behavior</h1>
 * <p>Open / close on hover</p>
 * <Popover content={<div>Hover to close</div>} showOnHover>
 *   <h3 style={{display: 'inline'}}>Hover here</h3>
 * </Popover>
 * <p>Open / close on hover (target only)</p>
 * <Popover content={<div>I'm a tooltip</div>} showOnHover hoverTargetOnly>
 *   <h3 style={{display: 'inline'}}>Hover here</h3>
 * </Popover>
 * <p>Don't close on body click / esc</p>
 * <Popover
 *   closeOnExternalClick={false}
 *   closeOnEsc={true}
 *   content={<div>Press ESC to close me.</div>}>
 *   <button>Click Me</button>
 * </Popover>
 * <p>Close when target is out of view. Click the button and scroll until button is not visible.</p>
 * <Popover content={<div>I'll disappear if you scroll away.</div>} closeOnHidden={true}>
 * 	<button>Click Me</button>
 * </Popover>
 * <h1>Render Props</h1>
 * <p>Pass close method to content</p>
 * <Popover
 *   content={(close, visible) => (
 *     <div>
 *       <span>
 *         Click to close <button onClick={close}>Close</button>
 *       </span>
 *     </div>
 *   )}
 *   closeOnEsc={false}
 *   closeOnExternalClick={false}
 * >
 *   <button>Click to Open</button>
 * </Popover>
 * <p>Pass toggle method to target</p>
 * <Popover content={<div>Hello.</div>}>
 *   {toggle => (
 *     <span>
 *       <button onClick={toggle}>Click Me</button>
 *       <button>I don't do anything.</button>
 *     </span>
 *   )}
 * </Popover>
 * <h1>Focus Management</h1>
 * <p>If focus was inside the popover, it will be brought to the target when the popover closes.</p>
 * <p>If the bringFocusInside prop is true, the first element with the following criteria will be focused:</p>
 * <ul>
 *  <li>autofocus or tabindex attributes</li>
 *  <li>button or anchor elements</li>
 *  <li>menuitem or menuitemradio roles</li>
 * </ul>
 * <Popover content={<div><input tabIndex="0" placeholder="I have focus!"/></div>} bringFocusInside={true}>
 *   <button>Open</button>
 * </Popover>
 * <h1>Controlled Override</h1>
 * <Popover isShown content={<div>I am being shown.</div>}>
 *   <button>Click me, but I don't change anything.</button>
 * </Popover>
 */
export class Popover extends React.Component<PopoverProps, PopoverState> {
  private targetRef: React.RefObject<HTMLElement>;
  private positionerRef: React.RefObject<HTMLDivElement>;
  private hoverTimeout: number;
  public constructor(props: PopoverProps) {
    super(props);
    this.targetRef = React.createRef<HTMLElement>();
    this.positionerRef = React.createRef<HTMLDivElement>();
    this.state = {
      isShown: false,
    };
  }

  public componentWillUnmount(): void {
    clearTimeout(this.hoverTimeout);
    document.body.removeEventListener('click', this.onBodyClick, false);
    document.body.removeEventListener('keydown', this.onEsc, false);
  }

  public render(): JSX.Element {
    const {
      isShown,
      closeOnHidden = false,
      position = Position.BOTTOM,
      bodyOffset = 6,
      targetOffset = 6,
    } = this.props;
    const shown = isShown === undefined ? this.state.isShown : isShown;
    const handleRequestAnimationFrame = closeOnHidden
      ? () => this.closeIfTargetNotVisible()
      : undefined;

    return (
      <>
        {this.renderTarget()}
        {shown && (
          <Positioner
            positionerRef={this.positionerRef}
            getParentRef={this.getTargetRef}
            handleRequestAnimationFrame={handleRequestAnimationFrame}
            position={position}
            bodyOffset={bodyOffset}
            targetOffset={targetOffset}
            parentId={this.props.parentId}
            style={this.props.style}
          >
            {this.renderContent()}
          </Positioner>
        )}
      </>
    );
  }

  private getTargetRef = () => this.targetRef;

  /**
   * Gets the target and applies the appropriate refs / handlers
   */
  private renderTarget() {
    if (typeof this.props.children === 'function') {
      return React.cloneElement(this.props.children(this.toggle), {
        ref: this.getTargetRef(),
      });
    }

    return React.cloneElement(this.props.children as JSX.Element, {
      onClick: this.toggle,
      onMouseEnter: this.onHover(true),
      onMouseLeave: this.onLeaveHover(true),
      ref: this.getTargetRef(),
    });
  }

  /**
   * Gets the content and applies the appropriate handlers.
   */
  private renderContent = () => {
    let content: JSX.Element;
    if (typeof this.props.content === 'function') {
      content = this.props.content(this.close);
    } else {
      content = this.props.content as JSX.Element;
    }
    return React.cloneElement(content, {
      onMouseEnter: this.onHover(false),
      onMouseLeave: this.onLeaveHover(false),
    });
  };

  private bringFocusInside = () => {
    // Always delay focus manipulation to just before repaint to prevent scroll jumping
    return requestAnimationFrame(() => {
      // Container ref may be undefined between component mounting and Portal rendering
      // activeElement may be undefined in some rare cases in IE
      if (
        !this.positionerRef.current ||
        document.activeElement == null ||
        !this.state.isShown
      ) {
        console.log('returning');
        return;
      }

      const positionerNode = this.positionerRef.current as Element;
      const isFocusOutsideModal = !positionerNode.contains(
        document.activeElement,
      );
      if (isFocusOutsideModal) {
        // Element marked autofocus has higher priority than the other clowns
        const autofocusElement = positionerNode.querySelector(
          '[autofocus]',
        ) as HTMLElement;
        const wrapperElement = positionerNode.querySelector(
          '[tabindex]',
        ) as HTMLElement;
        const buttonElements = positionerNode.querySelectorAll(
          'button, a, [role="menuitem"], [role="menuitemradio"]',
        ) as NodeListOf<HTMLElement>;

        if (autofocusElement && autofocusElement.focus) {
          autofocusElement.focus();
        } else if (wrapperElement && wrapperElement.focus) {
          wrapperElement.focus();
        } else if (buttonElements.length > 0 && buttonElements[0].focus) {
          buttonElements[0].focus();
        }
      }
    });
  };

  private bringFocusBackToTarget = () => {
    this.targetRef.current &&
      this.targetRef.current.focus({ preventScroll: true });
  };

  private onBodyClick = (event: MouseEvent) => {
    if (this.props.closeOnExternalClick === false) {
      return;
    }

    // Ignore clicks on the popover or button
    if (
      this.targetRef.current &&
      event.target instanceof Node &&
      this.targetRef.current.contains(event.target)
    ) {
      return;
    }

    const positionerNode = this.positionerRef.current as Element;
    if (
      this.positionerRef.current &&
      event.target instanceof Node &&
      positionerNode &&
      positionerNode.contains(event.target)
    ) {
      return;
    }

    this.close();
  };

  private isTargetVisible = () => {
    if (!this.targetRef.current) {
      return false;
    }

    const targetRect = this.targetRef.current.getBoundingClientRect();

    // check if parent is visible or not.
    const topElement = this.getElementFromPoint(
      targetRect.left + targetRect.width / 2,
      targetRect.top + targetRect.height / 2,
    );
    return this.targetRef.current.contains(topElement);
  };

  private closeIfTargetNotVisible = () => {
    if (!this.isTargetVisible()) {
      this.close();
    }
  };

  // helps with unit testing
  private getElementFromPoint(x: number, y: number): Element | null {
    return document.elementFromPoint(x, y);
  }

  private onEsc = (event: KeyboardEvent) => {
    if (this.props.closeOnEsc !== false && event.keyCode === 27) {
      this.close();
    }
  };

  private onHover = (target: boolean) => () => {
    // If we aren't showing on hover, abort
    if (!this.props.showOnHover) {
      return;
    }

    if (target) {
      clearTimeout(this.hoverTimeout);
      this.open();
    } else if (!this.props.hoverTargetOnly) {
      clearTimeout(this.hoverTimeout);
      this.open();
    }
  };

  private onLeaveHover = (target: boolean) => () => {
    // If we aren't showing on hover, abort
    if (!this.props.showOnHover) {
      return;
    }

    if (target) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => {
        this.close();
      }, 200);
    } else if (!this.props.hoverTargetOnly) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => {
        this.close();
      }, 200);
    }
  };

  private open = () => {
    if (this.state.isShown) {
      return;
    }

    this.setState({ isShown: true });
    document.body.addEventListener('click', this.onBodyClick, false);
    document.body.addEventListener('keydown', this.onEsc, false);
    this.props.onOpen && this.props.onOpen();

    if (this.props.bringFocusInside) {
      this.bringFocusInside();
    }
  };

  private close = () => {
    if (!this.state.isShown) {
      return;
    }

    if (this.positionerRef.current && document.activeElement != null) {
      const positionerNode = this.positionerRef.current as Element;
      if (
        (positionerNode && positionerNode.contains(document.activeElement)) ||
        document.activeElement === document.body
      ) {
        this.bringFocusBackToTarget();
      }
    }
    this.setState({ isShown: false });
    document.body.removeEventListener('click', this.onBodyClick, false);
    document.body.removeEventListener('keydown', this.onEsc, false);
    this.props.onClose && this.props.onClose();
  };

  private toggle = () => {
    if (this.state.isShown) {
      this.close();
    } else {
      this.open();
    }
  };
}

export default Popover;
