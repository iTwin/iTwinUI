/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
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
    controls: { disable: true },
    actions: { disable: true },
  },
} as Meta;

export const Overview: Story = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(
    document.documentElement.classList.contains('iui-theme-dark'),
  );

  React.useEffect(() => {
    const hideAddonsButton = parent.document.querySelector(
      'button[title="Hide addons [A]"]',
    ) as HTMLButtonElement;

    const isPanelOpen = !!parent.document.querySelector(
      '#storybook-preview-wrapper',
    )?.parentElement?.parentElement?.style.height;

    if (isPanelOpen) {
      hideAddonsButton.click();
    }
  });

  React.useEffect(() => {
    const listener = (isDark: boolean) => setIsDarkTheme(isDark);
    channel.on('DARK_MODE', listener);
    return () => channel.off('DARK_MODE', listener);
  }, []);

  return (
    <Markdown
      options={{
        overrides: {
          h1: {
            component: Headline,
            props: { style: { fontSize: 'x-large' } },
          },
          h2: {
            component: Title,
            props: { style: { margin: '8px 0', fontSize: 'larger' } },
          },
          h3: { component: Subheading },
          code: { component: Code },
          pre: {
            component: (args) => <pre {...args} />,
            props: { style: { margin: '16px' } },
          },
          em: {
            component: (args) => <em {...args} />,
            props: { style: { fontStyle: 'italic' } },
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
