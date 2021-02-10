// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Footer } from '../../src/core';
import { FooterProps } from '../../src/core/Footer/Footer';

export default {
  title: 'Footer',
  component: Footer,
  parameters: {
    docs: {
      description: {
        component:
          'Provides valuable information that allows people to navigate the site.',
      },
      inlineStories: false,
    },
  },
} as Meta<FooterProps>;

export const Basic: Story<FooterProps> = ({
  translatedTitles,
  ...rest
}: FooterProps) => {
  return <Footer translatedTitles={translatedTitles} {...rest} />;
};

Basic.args = {
  translatedTitles: {
    cookies: 'Cookies translated',
  },
} as FooterProps;

export const Custom: Story<FooterProps> = ({
  customElements,
  ...rest
}: FooterProps) => {
  return <Footer customElements={customElements} {...rest} />;
};

Custom.args = {
  customElements: [
    {
      title: 'Custom',
      url: 'https://www.bentley.com/',
    },
  ],
} as FooterProps;
