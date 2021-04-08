/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Footer, FooterProps } from '../../src/core';

export default {
  title: 'Core/Footer',
  component: Footer,
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

export const BottomFixed: Story<FooterProps> = ({ ...rest }: FooterProps) => {
  return (
    <div>
      <Footer style={{ position: 'fixed', bottom: 0 }} {...rest} />
    </div>
  );
};

BottomFixed.parameters = {
  docs: { inlineStories: false },
};
