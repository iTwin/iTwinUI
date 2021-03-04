// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import getPosition, { Dimension, Position, Rect } from './getPosition';

const dimensions = (overrides?: Partial<Dimension>) => ({
  height: 100,
  width: 100,
  ...overrides,
});

const targetRect = (overrides?: Partial<Rect>) => ({
  bottom: 150 - 30,
  height: 30,
  left: 250,
  right: 200,
  top: 150,
  width: 50,
  x: 250,
  y: 150,
  ...overrides,
});

const targetOffset = 6;

const viewport = (overrides?: Partial<Dimension>) => ({
  height: 250,
  width: 850,
  ...overrides,
});

it('All positions work', () => {
  const generatedPositions = Object.values(Position).map((position) =>
    getPosition(position, dimensions(), targetRect(), targetOffset, viewport()),
  );
  expect(generatedPositions).toMatchSnapshot();
});

describe('automatic repositioning', () => {
  it('Position.LEFT repositions to the right', () => {
    const position = getPosition(
      Position.LEFT,
      dimensions({ width: 350 }),
      targetRect(),
      targetOffset,
      viewport(),
    );
    expect(position).toMatchSnapshot();
  });
  it('Position.RIGHT repositions to the left', () => {
    const position = getPosition(
      Position.RIGHT,
      dimensions({ width: 250 }),
      targetRect({ left: 800, right: 850 }),
      targetOffset,
      viewport(),
    );
    expect(position).toMatchSnapshot();
  });
  it('Position.LEFT and Position.RIGHT will use the side with the most space', () => {
    const position = getPosition(
      Position.LEFT,
      dimensions({ width: 250 }),
      targetRect({ left: 50, right: 100 }),
      targetOffset,
      viewport({ width: 300 }),
    );
    expect(position).toMatchSnapshot();
  });
  it('Position.TOP repositions to the bottom', () => {
    const position = getPosition(
      Position.TOP,
      dimensions({ height: 250 }),
      targetRect({ top: 20 }),
      targetOffset,
      viewport(),
    );
    expect(position).toMatchSnapshot();
  });
  it('Position.BOTTOM repositions to the top', () => {
    const position = getPosition(
      Position.BOTTOM,
      dimensions({ height: 250 }),
      targetRect({ top: 290, bottom: 295, height: 5 }),
      targetOffset,
      viewport({ height: 300 }),
    );
    expect(position).toMatchSnapshot();
  });
});

describe('overflowing viewport', () => {
  it('pushes the rect to the right if overflowing on the left side', () => {
    const position = getPosition(
      Position.BOTTOM,
      dimensions({ width: 250, height: 110 }),
      targetRect({ left: 10, top: 10, bottom: 20 }),
      targetOffset,
      viewport(),
    );
    expect(position).toMatchSnapshot();
  });
  it('pushes the rect to the top if overflowing on the bottom side', () => {
    const position = getPosition(
      Position.TOP,
      dimensions({ width: 50, height: 100 }),
      targetRect({ left: 100, top: 550 }),
      targetOffset,
      viewport({ height: 500 }),
    );
    expect(position).toMatchSnapshot();
  });
});
