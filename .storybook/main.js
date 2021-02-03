module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: [
    {
      name: '@storybook/addon-docs',
    },
    '@storybook/addon-controls',
    'storybook-dark-mode/register',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: /\.stories\.tsx?$/,
        },
        loaderOptions: {
          parser: 'typescript',
        },
      },
    },
    '@storybook/addon-actions',
  ],
};
