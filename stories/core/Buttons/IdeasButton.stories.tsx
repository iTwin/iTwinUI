import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react';
import IdeasButton, {
  IdeasButtonProps,
} from '../../../src/core/Buttons/IdeasButton/IdeasButton';

export default {
  title: 'Buttons/IdeasButton',
  component: IdeasButton,
  parameters: {
    docs: { description: { component: 'Button for feedback' } },
  },
  argTypes: {
    onClick: { table: { disable: true } },
  },
} as Meta<React.PropsWithChildren<IdeasButtonProps>>;

export const Ideas: Story<React.PropsWithChildren<IdeasButtonProps>> = (
  args,
) => {
  return <IdeasButton onClick={action('clicked')} {...args} />;
};

export const LocalizedIdeas: Story<
  React.PropsWithChildren<IdeasButtonProps>
> = (args) => {
  return <IdeasButton onClick={action('clicked')} {...args} />;
};

LocalizedIdeas.args = {
  feedbackLabel: 'Localized feedback',
};
