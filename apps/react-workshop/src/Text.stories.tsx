/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Text } from '@itwin/itwinui-react';

export default {
  title: 'Text',
};

export const Basic = () => {
  return <Text>{`I'm a Text`}</Text>;
};

export const Body = () => {
  return <Text variant='body' as='p'>{`I'm a Text`}</Text>;
};

export const Small = () => {
  return <Text variant='small' as='small'>{`I'm a Text`}</Text>;
};

export const Leading = () => {
  return <Text variant='leading' as='h4'>{`I'm a Text`}</Text>;
};

export const Subheading = () => {
  return <Text variant='subheading' as='h3'>{`I'm a Text`}</Text>;
};

export const Title = () => {
  return <Text variant='title' as='h2'>{`I'm a Text`}</Text>;
};

export const Headline = () => {
  return <Text variant='headline' as='h1'>{`I'm a Text`}</Text>;
};

export const Polymorphic = () => {
  return (
    <Text variant='headline' as='h4'>
      {`I'm a headline text rendered as an h4 element!`}
    </Text>
  );
};

export const Skeleton = () => {
  return <Text isSkeleton>{`I'm a Text`}</Text>;
};
