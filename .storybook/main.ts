import type { StorybookConfig } from '@storybook/nextjs';
import webpack from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  docs: {},

  webpackFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NEXT_PUBLIC_STRAPI_URI': JSON.stringify(
          process.env.NEXT_PUBLIC_STRAPI_URI
        ),
      })
    );
    return config;
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
};

export default config;
