import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'MSML',
  tagline: 'MSML\'s coding standards and best practices',
  favicon: 'img/favicon-32x32.png',

  // Set the production url of your site here
  url: 'https://msmlbv.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/guidelines/',

  // GitHub pages deployment config.
  organizationName: 'msmlbv', 
  projectName: 'guidelines',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
  },
  
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    navbar: {
      logo: {
        alt: 'MSML Logo',
        src: 'img/msml-logo-black.svg',
        srcDark: 'img/msml-logo.svg',
      },
      items: [
        {
          to: '/docs',
          label: 'Guidelines',
          position: 'left', 
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.palenight,
      additionalLanguages: ['php'],
    },

    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },

    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'YOUR_INDEX_NAME',
      searchParameters: {},
      searchPagePath: 'search',
      insights: false,
    },
    
  } satisfies Preset.ThemeConfig,
};

export default config;
