import type { Block } from 'payload';

export const Banner: Block = {
  slug: 'banner',
  labels: {
    singular: 'Banner',
    plural: 'Banners',
  },
  fields: [
    {
      name: 'bannerType',
      type: 'select',
      label: 'Banner Type',
      defaultValue: 'hero',
      options: [
        {
          label: 'Hero Banner',
          value: 'hero',
        },
        {
          label: 'Standard Banner',
          value: 'standard',
        },
        {
          label: 'Minimal Banner',
          value: 'minimal',
        },
      ],
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      label: 'Background Image',
      relationTo: 'media',
    },
    {
      name: 'backgroundOverlay',
      type: 'checkbox',
      label: 'Enable Dark Overlay',
      defaultValue: false,
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      label: 'Overlay Opacity (0-100)',
      defaultValue: 50,
      min: 0,
      max: 100,
      admin: {
        condition: (data, siblingData) => siblingData.backgroundOverlay === true,
      },
    },
    {
      name: 'textAlignment',
      type: 'select',
      label: 'Text Alignment',
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    {
      name: 'textColor',
      type: 'select',
      label: 'Text Color',
      defaultValue: 'dark',
      options: [
        {
          label: 'Dark',
          value: 'dark',
        },
        {
          label: 'Light',
          value: 'light',
        },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Call to Action Buttons',
      maxRows: 3,
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
          required: true,
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Button Link',
          required: true,
        },
        {
          name: 'buttonStyle',
          type: 'select',
          label: 'Button Style',
          defaultValue: 'primary',
          options: [
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
            {
              label: 'Outline',
              value: 'outline',
            },
          ],
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in New Tab',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'height',
      type: 'select',
      label: 'Banner Height',
      defaultValue: 'medium',
      options: [
        {
          label: 'Small (300px)',
          value: 'small',
        },
        {
          label: 'Medium (500px)',
          value: 'medium',
        },
        {
          label: 'Large (700px)',
          value: 'large',
        },
        {
          label: 'Full Screen',
          value: 'fullscreen',
        },
      ],
    },
  ],
};