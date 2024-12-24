import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'MSML',
  tagline: 'MSML\'s coding standards and best practices',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://msmlbv.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/guidelines/docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'msmlbv', // Usually your GitHub org/user name.
  projectName: 'guidelines', // Usually your repo name.
  deploymentBranch: 'master',

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
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
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
    
  } satisfies Preset.ThemeConfig,
};

export default config;
