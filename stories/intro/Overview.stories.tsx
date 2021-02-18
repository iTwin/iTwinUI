// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { Meta, Story } from '@storybook/react';
import addons from '@storybook/addons';
import React from 'react';
import Markdown from 'markdown-to-jsx';
import readme from '../../README.md';
import itwinImage from '../../.storybook/public/itwin.svg';
import itwinImageDark from '../../.storybook/public/itwin-dark.svg';
import { Headline, Subheading, Title, Code } from '../../src/';

const channel = addons.getChannel();

export default {
  title: 'Overview',
  parameters: {
    previewTabs: { 'storybook/docs/panel': { hidden: true } },
    options: { showPanel: false },
  },
} as Meta;

export const Overview: Story = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(
    document.documentElement.classList.contains('iui-theme-dark'),
  );

  React.useEffect(() => {
    const listener = (isDark) => setIsDarkTheme(isDark);
    channel.on('DARK_MODE', listener);
    return () => channel.off('DARK_MODE', listener);
  }, []);

  return (
    <Markdown
      options={{
        overrides: {
          h1: { component: Headline },
          h2: { component: Title, props: { style: { margin: '16px 0' } } },
          h3: { component: Subheading },
          code: { component: Code },
          pre: {
            component: (args) => <pre {...args} />,
            props: { style: { margin: '16px' } },
          },
          ol: {
            component: (args) => <ol {...args} />,
            props: { style: { margin: '16px' } },
          },
          ul: {
            component: (args) => <ul {...args} />,
            props: { style: { margin: '16px' } },
          },
          hr: {
            component: (args) => <hr {...args} />,
            props: { style: { border: 'revert', margin: '16px 0' } },
          },
          a: {
            component: (args) =>
              args.href.includes('_build') ? null : <a {...args} />,
          },
          img: {
            component: (args) =>
              args.src.includes('iTwinUI_logo') ? (
                <img
                  src={isDarkTheme ? itwinImageDark : itwinImage}
                  width={167}
                  height={40}
                />
              ) : (
                <img {...args} />
              ),
          },
        },
      }}
    >
      {readme}
    </Markdown>
  );
};
