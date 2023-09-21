/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Text } from '@itwin/itwinui-react';

type TextProps = React.ComponentProps<typeof Text>;

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    children: "I'm a Text",
    isMuted: false,
    isSkeleton: false,
    as: 'div',
  },
};

const TextStory = ({ ...rest }) => {
  return <Text {...rest}>{`I'm a Text`}</Text>;
};

export const Basic = TextStory.bind({});
Basic.args = {} as TextProps;

export const Body = TextStory.bind({});
Body.args = { variant: 'body', as: 'p' };

export const Small = TextStory.bind({});
Small.args = { variant: 'small', as: 'small' };

export const Leading = TextStory.bind({});
Leading.args = { variant: 'leading', as: 'h4' };

export const Subheading = TextStory.bind({});
Subheading.args = { variant: 'subheading', as: 'h3' };

export const Title = TextStory.bind({});
Title.args = { variant: 'title', as: 'h2' };

export const Headline = TextStory.bind({});
Headline.args = { variant: 'headline', as: 'h1' };

export const Polymorphic = () => {
  return (
    <Text variant='headline' as='h4'>
      {`I'm a headline text rendered as an h4 element!`}
    </Text>
  );
};

export const Skeleton = TextStory.bind({});
Skeleton.args = { isSkeleton: true };
