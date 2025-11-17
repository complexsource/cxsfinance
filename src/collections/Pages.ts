import type { CollectionConfig } from 'payload'
import { Banner } from '../blocks/Banner'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Page Title',
      required: true,
    },
    {
      name: 'visualEditor',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '/components/admin/EditInstructions',
        },
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Page Slug',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title (e.g., "home", "about-us")',
      },
    },
    {
      name: 'pageType',
      type: 'select',
      label: 'Page Type',
      defaultValue: 'standard',
      options: [
        {
          label: 'Homepage',
          value: 'homepage',
        },
        {
          label: 'Standard Page',
          value: 'standard',
        },
        {
          label: 'Landing Page',
          value: 'landing',
        },
      ],
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Page Content',
          fields: [
            {
              name: 'pageBuilder',
              type: 'blocks',
              label: 'Page Builder',
              minRows: 1,
              blocks: [Banner],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              admin: {
                description: 'Title that appears in search results (recommended: 50-60 characters)',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              admin: {
                description:
                  'Description that appears in search results (recommended: 150-160 characters)',
              },
            },
            {
              name: 'metaImage',
              type: 'upload',
              label: 'Social Share Image',
              relationTo: 'media',
              admin: {
                description: 'Image that appears when sharing on social media',
              },
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            {
              name: 'publishedDate',
              type: 'date',
              label: 'Published Date',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'status',
              type: 'select',
              label: 'Status',
              defaultValue: 'draft',
              options: [
                {
                  label: 'Draft',
                  value: 'draft',
                },
                {
                  label: 'Published',
                  value: 'published',
                },
              ],
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
