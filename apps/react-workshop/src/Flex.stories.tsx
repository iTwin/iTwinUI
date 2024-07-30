/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Flex } from '@itwin/itwinui-react';
import type { StoryDefault } from '@ladle/react';

export default {
  title: 'Flex',
  decorators: [
    (Story) => (
      <div className='demo-flex-wrapper'>
        <style
          dangerouslySetInnerHTML={{
            __html: /* css */ `
            :where(.demo-flex-wrapper > *) {
              outline: 1px solid var(--iui-color-border);
              min-height: 100px;
            }
            :where(.demo-flex-wrapper > * div:not([class])) {
              font-family: var(--iui-font-sans);
              color: var(--iui-color-text);
              padding: 1rem;
              border: 1px solid;
            }`,
          }}
        />
        <Story />
      </div>
    ),
  ],
} satisfies StoryDefault;

export const Basic = () => {
  return (
    <Flex>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Flex>
  );
};

export const WithSpacer = () => {
  return (
    <Flex>
      <div>1</div>
      <div>2</div>

      <Flex.Spacer />

      <div>3</div>
      <div>4</div>
      <div>5</div>
    </Flex>
  );
};

export const WithFlexItem = () => {
  return (
    <Flex>
      <Flex.Item flex='1'>
        <div>1</div>
      </Flex.Item>

      <Flex.Item flex='3'>
        <div>2</div>
      </Flex.Item>

      <Flex.Item flex='1'>
        <div>3</div>
      </Flex.Item>
    </Flex>
  );
};

export const IndividualGaps = () => {
  return (
    <>
      {/* '2xl' gap between all items that don't specify `gapBefore` or `gapAfter` */}
      <Flex gap='2xl'>
        <Flex.Item>
          <div>1</div>
        </Flex.Item>

        <Flex.Item>
          <div>2</div>
        </Flex.Item>

        {/* ⬇️ will always have 's' gap between 3 and 4  */}
        <Flex.Item gapAfter='s'>
          <div>3</div>
        </Flex.Item>

        <Flex.Item>
          <div>4</div>
        </Flex.Item>

        {/* ⬇️ will always have '3xs' gap between 4 and 5 */}
        <Flex.Item gapBefore='3xs'>
          <div>5</div>
        </Flex.Item>

        <Flex.Item>
          <div>6</div>
        </Flex.Item>
      </Flex>
    </>
  );
};
