import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiCustomerStory from '../../models/strapi/StrapiCustomerStory';

export const strapiCustomerStoryMock: IStrapiData<StrapiCustomerStory> = {
  id: 1,
  attributes: {
    slug: 'customer-1',
    createdAt: '2023-10-31T12:10:43.324Z',
    updatedAt: '2023-10-31T13:10:25.010Z',
    locale: 'en',
    metadata: null,
    title: 'This is the title',
    customerName: 'Jodok Bals Bau',
    customerIndustry: 'Bau',
    customerLogo: {
      id: 71,
      alt: 'Alt',
      img: {
        data: {
          id: 1,
          attributes: {
            name: 'default_shareimage.jpeg',
            alternativeText: '',
            caption: '',
            width: 1200,
            height: 630,
            formats: {
              thumbnail: {
                name: 'thumbnail_default_shareimage.jpeg',
                hash: 'thumbnail_default_shareimage_fecd5ccc7e',
                ext: '.jpeg',
                mime: 'image/jpeg',
                width: 245,
                height: 129,
                size: 9.36,
                path: null,
                url: 'https://cdn.tree.ly/storybook/v1/icon_tree.png',
              },
              large: {
                name: 'large_default_shareimage.jpeg',
                hash: 'large_default_shareimage_fecd5ccc7e',
                ext: '.jpeg',
                mime: 'image/jpeg',
                width: 1000,
                height: 525,
                size: 132.73,
                path: null,
                url: 'https://cdn.tree.ly/storybook/v1/icon_tree.png',
              },
              medium: {
                name: 'medium_default_shareimage.jpeg',
                hash: 'medium_default_shareimage_fecd5ccc7e',
                ext: '.jpeg',
                mime: 'image/jpeg',
                width: 750,
                height: 394,
                size: 78.75,
                path: null,
                url: 'https://cdn.tree.ly/storybook/v1/icon_tree.png',
              },
              small: {
                name: 'small_default_shareimage.jpeg',
                hash: 'small_default_shareimage_fecd5ccc7e',
                ext: '.jpeg',
                mime: 'image/jpeg',
                width: 500,
                height: 263,
                size: 35.08,
                path: null,
                url: 'https://cdn.tree.ly/storybook/v1/icon_tree.png',
              },
              xSmall: {
                name: 'xSmall_default_shareimage.jpeg',
                hash: 'xSmall_default_shareimage_fecd5ccc7e',
                ext: '.jpeg',
                mime: 'image/jpeg',
                width: 64,
                height: 34,
                size: 1.31,
                path: null,
                url: 'https://cdn.tree.ly/storybook/v1/icon_tree.png',
              },
            },
            hash: 'default_shareimage_fecd5ccc7e',
            ext: '.jpeg',
            mime: 'image/jpeg',
            size: 188.72,
            url: 'https://cdn.tree.ly/storybook/v1/icon_tree.png',
            previewUrl: null,
            provider: 'local',
            provider_metadata: null,
            createdAt: '2021-07-26T08:01:15.702Z',
            updatedAt: '2021-09-09T12:50:57.817Z',
          },
        },
      },
    },
    img: {
      id: 71,
      alt: 'Alt',
      img: {
        data: {
          id: 1,
          attributes: {
            name: 'default_shareimage.jpeg',
            alternativeText: '',
            caption: '',
            width: 1200,
            height: 630,
            formats: {
              thumbnail: {
                name: 'thumbnail_default_shareimage.jpeg',
                hash: 'thumbnail_default_shareimage_fecd5ccc7e',
                ext: '.jpeg',
                mime: 'image/jpeg',
                width: 245,
                height: 129,
                size: 9.36,
                path: null,
                url: 'https://cdn.tree.ly/storybook/v1/icon_tree.png',
              },
              large: {
                name: 'large_default_shareimage.jpeg',
                hash: 'large_default_shareimage_fecd5ccc7e',
                ext: '.jpeg',
                mime: 'image/jpeg',
                width: 1000,
                height: 525,
                size: 132.73,
                path: null,
                url: 'https://cdn.tree.ly/storybook/v1/icon_tree.png',
              },
              medium: {
                name: 'medium_default_shareimage.jpeg',
                hash: 'medium_default_shareimage_fecd5ccc7e',
                ext: '.jpeg',
                mime: 'image/jpeg',
                width: 750,
                height: 394,
                size: 78.75,
                path: null,
                url: 'https://cdn.tree.ly/storybook/v1/icon_tree.png',
              },
              small: {
                name: 'small_default_shareimage.jpeg',
                hash: 'small_default_shareimage_fecd5ccc7e',
                ext: '.jpeg',
                mime: 'image/jpeg',
                width: 500,
                height: 263,
                size: 35.08,
                path: null,
                url: 'https://cdn.tree.ly/storybook/v1/icon_tree.png',
              },
              xSmall: {
                name: 'xSmall_default_shareimage.jpeg',
                hash: 'xSmall_default_shareimage_fecd5ccc7e',
                ext: '.jpeg',
                mime: 'image/jpeg',
                width: 64,
                height: 34,
                size: 1.31,
                path: null,
                url: 'https://cdn.tree.ly/storybook/v1/icon_tree.png',
              },
            },
            hash: 'default_shareimage_fecd5ccc7e',
            ext: '.jpeg',
            mime: 'image/jpeg',
            size: 188.72,
            url: 'https://cdn.tree.ly/storybook/v1/icon_tree.png',
            previewUrl: null,
            provider: 'local',
            provider_metadata: null,
            createdAt: '2021-07-26T08:01:15.702Z',
            updatedAt: '2021-09-09T12:50:57.817Z',
          },
        },
      },
    },
    slices: [
      {
        __component: 'sections.rich-text',
        id: 6,
        content: '# This is my rich text!',
      },
    ],
    localizations: [
      {
        id: 2,
        locale: 'de',
      },
    ],
  },
};