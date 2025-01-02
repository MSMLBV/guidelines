import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: ['index'], 
    },
    {
      type: 'category',
      label: 'Code Guidelines',
      items: [
        'guidelines/laravel-php',
        'guidelines/react-native',
      ]
    },
    {
      type: 'category',
      label: 'Version Control & Git',
      items: [
        'version-control',
      ],
    }
  ],
};

export default sidebars;
