// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
// Mostly taken from https://github.com/segmentio/evergreen/blob/master/src/positioner/src/Positioner.js

import React, { CSSProperties } from 'react';
import Portal from '../Portal/Portal';
import getPosition, { Position } from './getPosition';

export type PositionerProps = {
  /**
   * Children are required for the Positioner.
   */
  children: React.ReactNode;
  /**
   * Should return the ref of the parent / target component.
   */
  getParentRef: () => React.RefObject<HTMLElement>;
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
   * ID of portal container. Will not be removed from the dom, so keep it constant.
   * @default 'iui-react-portal-container'
   */
  parentId?: string;
  /**
   * Optional callback on each animation frame.
   */
  handleRequestAnimationFrame?: () => void;
  /**
   * Reference of the positioner.
   */
  positionerRef?: React.RefObject<HTMLDivElement>;
  /**
   * CSS properties to be applied to the positioner.
   */
  style?: CSSProperties;
};

type PositionerState = {
  left: number;
  top: number;
  transformOrigin: string;
};

/**
 * Utility component that uses a portal to absolutely position an element in another DOM tree near a target element.
 */
export class Positioner extends React.Component<
  PositionerProps,
  PositionerState
> {
  private latestAnimationFrame: number | undefined;
  private positionerRef: React.RefObject<HTMLDivElement>;

  constructor(props: PositionerProps) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
      transformOrigin: '',
    };
    this.positionerRef =
      this.props.positionerRef || React.createRef<HTMLDivElement>();
  }

  public componentWillUnmount(): void {
    if (this.latestAnimationFrame) {
      cancelAnimationFrame(this.latestAnimationFrame);
    }
  }

  public componentDidMount(): void {
    this.update();
  }

  public render(): JSX.Element {
    const { left, top, transformOrigin } = this.state;
    return (
      <Portal parentId={this.props.parentId}>
        <div
          className='iui-positioner'
          style={{
            left,
            top,
            transformOrigin,
            position: 'fixed',
            ...this.props.style,
          }}
          ref={this.positionerRef}
        >
          {this.props.children}
        </div>
      </Portal>
    );
  }

  private update = () => {
    const {
      position = Position.BOTTOM,
      targetOffset = 6,
      bodyOffset = 6,
      handleRequestAnimationFrame,
    } = this.props;
    const parentRef = this.props.getParentRef();
    if (!parentRef.current || !this.positionerRef.current) {
      return;
    }
    const targetRect = parentRef.current.getBoundingClientRect();
    const viewportHeight = document.documentElement.clientHeight;
    const viewportWidth = document.documentElement.clientWidth;
    const positionerRect = this.positionerRef.current.getBoundingClientRect();
    const height = Math.round(positionerRect.height);
    const width = Math.round(positionerRect.width);
    const { rect, transformOrigin } = getPosition(
      position,
      { height, width },
      targetRect,
      targetOffset,
      { width: viewportWidth, height: viewportHeight },
      bodyOffset,
    );
    this.setState({ left: rect.left, top: rect.top, transformOrigin }, () => {
      this.latestAnimationFrame = requestAnimationFrame(() => {
        this.update();
        if (handleRequestAnimationFrame !== undefined) {
          handleRequestAnimationFrame();
        }
      });
    });
  };
}

export default Positioner;
