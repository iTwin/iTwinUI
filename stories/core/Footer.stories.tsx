/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import { CreeveyStory } from 'creevey';
import React from 'react';
import { Footer, FooterElement, FooterProps } from '../../src/core';

export default {
  title: 'Core/Footer',
  component: Footer,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    id: { control: { disable: true } },
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

export const AppendedCustomElements: Story<FooterProps> = ({
  ...rest
}: FooterProps) => {
  return (
    <Footer
      customElements={[
        {
          title: 'Custom',
          url: 'https://www.bentley.com/',
        },
      ]}
      {...rest}
    />
  );
};

export const OnlyCustomElements: Story<FooterProps> = ({
  ...rest
}: FooterProps) => {
  return (
    <Footer
      customElements={() => [
        { title: 'Custom Element 1', url: 'https://www.bentley.com/' },
        { title: 'Custom Element 2' },
        { title: 'Custom Element 3' },
        { title: 'Custom Element 4' },
      ]}
      {...rest}
    />
  );
};

export const CustomizedDefaultAndCustomElements: Story<FooterProps> = ({
  ...rest
}: FooterProps) => {
  const customElements = (defaultElements: FooterElement[]) => {
    const customUrls: Record<string, string> = {
      privacy: 'https://www.bentley.com/',
      cookies: 'https://www.bentley.com/',
      legalNotices: 'https://www.bentley.com/',
    };
    const translatedTitles: Record<string, string> = {
      termsOfService: 'Terms of service translated',
      privacy: 'Privacy translated',
      termsOfUse: 'Terms of use translated',
      cookies: 'Cookies translated',
      legalNotices: 'Legal notices translated',
    };
    const customElements: FooterElement[] = [
      { title: 'Custom Element 1', url: 'https://www.bentley.com/' },
      { title: 'Custom Element 2' },
    ];

    const customizedDefaultElements = defaultElements.map(
      ({ key, title, url }) => ({
        key: key,
        title: key ? translatedTitles[key] ?? title : title,
        url: key ? customUrls[key] ?? url : url,
      }),
    );

    return [...customizedDefaultElements, ...customElements];
  };

  return <Footer customElements={customElements} {...rest} />;
};

export const BottomFixed: Story<FooterProps> & CreeveyStory = ({
  ...rest
}: FooterProps) => {
  return (
    <div>
      <Footer style={{ position: 'fixed', bottom: 0 }} {...rest} />
    </div>
  );
};

BottomFixed.parameters = {
  docs: { inlineStories: false },
  creevey: {
    captureElement: null,
  },
};
