const { themes } = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
const fs = require('fs');
const path = require('path');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Anocca sequence viewer',
  tagline: 'Display amino acid and peptide sequences',
  url: 'https://anocca-ab.github.io',
  baseUrl: '/sequence-viewer/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'anocca-ab', // Usually your GitHub org/user name.
  trailingSlash: true,
  projectName: 'sequence-viewer', // Usually your repo name.
  themeConfig: {
    colorMode: {
      disableSwitch: true
    },
    navbar: {
      title: 'Anocca sequence viewer',
      logo: {
        alt: 'Anocca Logo',
        src: 'img/logo.png'
      },
      items: [
        {
          type: 'doc',
          docId: 'tutorial/get-started',
          position: 'left',
          label: 'Tutorial'
        },
        {
          type: 'doc',
          docId: 'examples/index',
          position: 'left',
          label: 'Examples'
        },
        {
          type: 'doc',
          docId: 'api/index',
          position: 'left',
          label: 'API'
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/anocca-ab/sequence-viewer',
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/tutorial/get-started'
            }
          ]
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/sequence-viewer'
            },
            {
              label: 'Linkedin',
              href: 'https://linked.com/anocca-ab'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog'
            },
            {
              label: 'GitHub',
              href: 'https://github.com/anocca-ab/sequence-viewer'
            }
          ]
        }
      ],
      copyright: `MIT ${new Date().getFullYear()} Anocca AB`
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['typescript']
    }
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
          sidebarItemsGenerator: async function ({ defaultSidebarItemsGenerator, ...args }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            // return sidebarItems;
            const next = sidebarItems
              .map((item) => {
                if (item.id === 'api/index') {
                  return { ...item, label: 'Home' };
                }
                return item;
              })
              .filter((item) => !item.id || !item.id.match(/^api\/sequence-viewer-/));
            const categories = {};
            const ids = [];
            sidebarItems.forEach((item) => {
              if (item.id) {
                ids.push(item.id);
              }
              if (item.id && item.id.match(/^api\/sequence-viewer-/)) {
                let m = item.id.match(/^api\/sequence-viewer-([^.]+)\.?(.*)?$/);
                if (m) {
                  const [, pkgName, exportName] = m;
                  if (pkgName) {
                    categories[pkgName] = categories[pkgName] || [];
                    m = item.id.match(/^api\/sequence-viewer-([^.]+)/);
                    if (exportName) {
                      categories[pkgName].push(exportName);
                    }
                  }
                }
              }
            });
            Object.entries(categories).forEach(([category, docExports]) => {
              next.push({
                type: 'category',
                label: category,
                collapsible: true,
                collapsed: true,
                items: [
                  {
                    type: 'doc',
                    id: 'api/sequence-viewer-' + category
                    // label: 'Exports',
                  },
                  ...docExports
                    .map((name) => {
                      const id = 'api/sequence-viewer-' + category + '.' + name;
                      if (!ids.includes(id)) {
                        return;
                      }
                      return {
                        type: 'doc',
                        id
                      };
                    })
                    .filter((a) => a)
                ]
              });
            });
            return next;
          }
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/anocca-ab/sequence-viewer/edit/main/website/blog/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
};
