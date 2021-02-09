// Everything here was taken from https://github.com/segmentio/evergreen/blob/master/src/positioner/src/getPosition.js
// Evergreen is released under the MIT license.

export type Rect = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
};

export type Dimension = {
  width: number;
  height: number;
};

export enum Position {
  TOP = 'top',
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM = 'bottom',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  LEFT = 'left',
  RIGHT = 'right',
}

function makeRect(
  width: number,
  height: number,
  left: number,
  top: number,
): Rect {
  const ceiledLeft = Math.ceil(left);
  const ceiledTop = Math.ceil(top);
  return {
    bottom: ceiledTop + height,
    height,
    left: ceiledLeft,
    right: ceiledLeft + width,
    top: ceiledTop,
    width,
  };
}

function flipHorizontal(position: Position): Position {
  switch (position) {
    case Position.TOP_LEFT:
      return Position.BOTTOM_LEFT;
    case Position.TOP:
    default:
      return Position.BOTTOM;
    case Position.TOP_RIGHT:
      return Position.BOTTOM_RIGHT;
    case Position.BOTTOM_LEFT:
      return Position.TOP_LEFT;
    case Position.BOTTOM:
      return Position.TOP;
    case Position.BOTTOM_RIGHT:
      return Position.TOP_RIGHT;
  }
}

function isAlignedOnTop(position: Position): boolean {
  switch (position) {
    case Position.TOP:
    case Position.TOP_LEFT:
    case Position.TOP_RIGHT:
      return true;
    default:
      return false;
  }
}

function isAlignedHorizontal(position: Position): boolean {
  switch (position) {
    case Position.LEFT:
    case Position.RIGHT:
      return true;
    default:
      return false;
  }
}

function getFitsOnBottom(
  rect: Rect,
  viewport: Dimension,
  viewportOffset: number,
): boolean {
  return rect.bottom < viewport.height - viewportOffset;
}

function getFitsOnTop(
  rect: Rect,
  viewport: Dimension,
  viewportOffset: number,
): boolean {
  return rect.top > viewportOffset;
}

function getFitsOnRight(
  rect: Rect,
  viewport: Dimension,
  viewportOffset: number,
): boolean {
  return rect.right < viewport.width - viewportOffset;
}

function getFitsOnLeft(
  rect: Rect,
  viewport: Dimension,
  viewportOffset: number,
): boolean {
  return rect.left > viewportOffset;
}

function getTransformOrigin(
  rect: Rect,
  position: Position,
  dimensions: Dimension,
  targetCenter: number,
): string {
  const centerY = Math.round(targetCenter - rect.top);

  if (position === Position.LEFT) {
    return `${dimensions.width}px ${centerY}px`;
  }

  if (position === Position.RIGHT) {
    return `0px ${centerY}px`;
  }

  const centerX = Math.round(targetCenter - rect.left);

  if (isAlignedOnTop(position)) {
    return `${centerX}px ${dimensions.height}px`;
  }

  return `${centerX}px 0px`;
}

function getRect(
  position: Position,
  targetOffset: number,
  dimensions: Dimension,
  targetRect: Rect,
): Rect {
  const leftRect =
    targetRect.left + targetRect.width / 2 - dimensions.width / 2;
  const alignedTopY = targetRect.top - dimensions.height - targetOffset;
  const alignedBottomY = targetRect.bottom + targetOffset;
  const alignedRightX = targetRect.right - dimensions.width;
  const alignedLeftRightY =
    targetRect.top + targetRect.height / 2 - dimensions.height / 2;

  switch (position) {
    case Position.LEFT:
      return makeRect(
        dimensions.width,
        dimensions.height,
        targetRect.left - dimensions.width - targetOffset,
        alignedLeftRightY,
      );
    case Position.RIGHT:
      return makeRect(
        dimensions.width,
        dimensions.height,
        targetRect.right + targetOffset,
        alignedLeftRightY,
      );
    case Position.TOP:
      return makeRect(
        dimensions.width,
        dimensions.height,
        leftRect,
        alignedTopY,
      );
    case Position.TOP_LEFT:
      return makeRect(
        dimensions.width,
        dimensions.height,
        targetRect.left,
        alignedTopY,
      );
    case Position.TOP_RIGHT:
      return makeRect(
        dimensions.width,
        dimensions.height,
        alignedRightX,
        alignedTopY,
      );
    default:
    case Position.BOTTOM:
      return makeRect(
        dimensions.width,
        dimensions.height,
        leftRect,
        alignedBottomY,
      );
    case Position.BOTTOM_LEFT:
      return makeRect(
        dimensions.width,
        dimensions.height,
        targetRect.left,
        alignedBottomY,
      );
    case Position.BOTTOM_RIGHT:
      return makeRect(
        dimensions.width,
        dimensions.height,
        alignedRightX,
        alignedBottomY,
      );
  }
}

function getPosition(
  position: Position,
  dimensions: Dimension,
  targetRect: Rect,
  targetOffset: number,
  viewport: Dimension,
  viewportOffset: number,
): { rect: Rect; position: Position } {
  const isHorizontal = isAlignedHorizontal(position);

  // Handle LEFT / RIGHT
  if (isHorizontal) {
    const leftRect = getRect(
      Position.LEFT,
      targetOffset,
      dimensions,
      targetRect,
    );
    const rightRect = getRect(
      Position.RIGHT,
      targetOffset,
      dimensions,
      targetRect,
    );
    const fitsOnLeft = getFitsOnLeft(leftRect, viewport, viewportOffset);
    const fitsOnRight = getFitsOnRight(rightRect, viewport, viewportOffset);
    if (position === Position.LEFT) {
      if (fitsOnLeft) {
        return {
          position,
          rect: leftRect,
        };
      }
      if (fitsOnRight) {
        return {
          position: Position.RIGHT,
          rect: rightRect,
        };
      }
    }
    if (position === Position.RIGHT) {
      if (fitsOnRight) {
        return {
          position,
          rect: rightRect,
        };
      }
      if (fitsOnLeft) {
        return {
          position: Position.LEFT,
          rect: leftRect,
        };
      }
    }

    // Default to using the position with the most space
    const spaceRight = Math.abs(
      viewport.width - viewportOffset - rightRect.right,
    );
    const spaceLeft = Math.abs(leftRect.left - viewportOffset);
    if (spaceRight < spaceLeft) {
      return {
        position: Position.RIGHT,
        rect: rightRect,
      };
    }
    return {
      position: Position.LEFT,
      rect: leftRect,
    };
  }

  // Handle TOP / BOTTOM
  const positionIsAlignedOnTop = isAlignedOnTop(position);
  let topRect;
  let bottomRect;

  if (positionIsAlignedOnTop) {
    topRect = getRect(position, targetOffset, dimensions, targetRect);
    bottomRect = getRect(
      flipHorizontal(position),
      targetOffset,
      dimensions,
      targetRect,
    );
  } else {
    topRect = getRect(
      flipHorizontal(position),
      targetOffset,
      dimensions,
      targetRect,
    );
    bottomRect = getRect(position, targetOffset, dimensions, targetRect);
  }

  const topRectFitsOnTop = getFitsOnTop(topRect, viewport, viewportOffset);

  const bottomRectFitsOnBottom = getFitsOnBottom(
    bottomRect,
    viewport,
    viewportOffset,
  );

  if (positionIsAlignedOnTop) {
    if (topRectFitsOnTop) {
      return {
        position,
        rect: topRect,
      };
    }

    if (bottomRectFitsOnBottom) {
      return {
        position: flipHorizontal(position),
        rect: bottomRect,
      };
    }
  }

  if (!positionIsAlignedOnTop) {
    if (bottomRectFitsOnBottom) {
      return {
        position,
        rect: bottomRect,
      };
    }

    if (topRectFitsOnTop) {
      return {
        position: flipHorizontal(position),
        rect: topRect,
      };
    }
  }

  // Default to most spacious if there is no fit.
  const spaceBottom = Math.abs(
    viewport.height - viewportOffset - bottomRect.bottom,
  );

  const spaceTop = Math.abs(topRect.top - viewportOffset);

  if (spaceBottom < spaceTop) {
    return {
      position: positionIsAlignedOnTop ? flipHorizontal(position) : position,
      rect: bottomRect,
    };
  }

  return {
    position: positionIsAlignedOnTop ? position : flipHorizontal(position),
    rect: topRect,
  };
}

export default function getFittedPosition(
  position: Position,
  dimensions: Dimension,
  targetRect: Rect,
  targetOffset: number,
  viewport: Dimension,
  viewportOffset = 8,
): { rect: Rect; position: Position; transformOrigin: string } {
  const { rect, position: finalPosition } = getPosition(
    position,
    dimensions,
    targetRect,
    targetOffset,
    viewport,
    viewportOffset,
  );
  // Push rect to the right if overflowing on the left side of the viewport.
  if (rect.left < viewportOffset) {
    rect.right += Math.ceil(Math.abs(rect.left - viewportOffset));
    rect.left = Math.ceil(viewportOffset);
  }

  // Push rect to the left if overflowing on the right side of the viewport.
  if (rect.right > viewport.width - viewportOffset) {
    const delta = Math.ceil(rect.right - (viewport.width - viewportOffset));
    rect.left -= delta;
    rect.right -= delta;
  }

  // Push rect down if overflowing on the top side of the viewport.
  if (rect.top < viewportOffset) {
    rect.top += Math.ceil(Math.abs(rect.top - viewportOffset));
    rect.bottom = Math.ceil(viewportOffset);
  }

  // Push rect up if overflowing on the bottom side of the viewport.
  if (rect.bottom > viewport.height - viewportOffset) {
    const delta = Math.ceil(rect.bottom - (viewport.height - viewportOffset));
    rect.top -= delta;
    rect.bottom -= delta;
  }

  const targetCenter = isAlignedHorizontal(position)
    ? targetRect.top + targetRect.height / 2
    : targetRect.left + targetRect.width / 2;

  const transformOrigin = getTransformOrigin(
    rect,
    finalPosition,
    dimensions,
    targetCenter,
  );

  return {
    position: finalPosition,
    rect,
    transformOrigin,
  };
}
