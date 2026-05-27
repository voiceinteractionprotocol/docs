import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Voice Interaction Protocol',
  tagline: 'An open standard for voice-first applications',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://voiceinteractionprotocol.io',
  baseUrl: '/',

  organizationName: 'voiceinteractionprotocol',
  projectName: 'docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/voiceinteractionprotocol/docs/tree/main/',
          versions: {
            current: {
              label: 'Next (Unreleased)',
              badge: true,
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/voiceinteractioprotocol-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'VIP',
      logo: {
        alt: 'Voice Interaction Protocol',
        src: 'img/logo.svg',
      },
      hideOnScroll: false,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'specSidebar',
          position: 'left',
          label: 'Specification',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        {
          href: 'https://github.com/voiceinteractionprotocol/docs',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Specification',
          items: [
            { label: 'Introduction', to: '/docs/spec/introduction' },
            { label: 'Protocol Overview', to: '/docs/spec/protocol-overview' },
            { label: 'Core Interaction Model', to: '/docs/spec/core-intercation-model' },
            { label: 'State & Flow Management', to: '/docs/spec/state-and-flow-management' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub', href: 'https://github.com/voiceinteractionprotocol/docs' },
            { label: 'Issues', href: 'https://github.com/voiceinteractionprotocol/docs/issues' },
            { label: 'Discussions', href: 'https://github.com/voiceinteractionprotocol/docs/discussions' },
          ],
        },
        {
          title: 'Coming Soon',
          items: [
            { label: 'Concepts', to: '/' },
            { label: 'Implementation Guides', to: '/' },
            { label: 'SDK Libraries', to: '/' },
          ],
        },
      ],
      copyright: `Voice Interaction Protocol — Open Specification. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['json', 'typescript', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
