'use client';

import { useEditor } from '@craftjs/core';
import { EditableBanner } from '@/components/editor/editable/EditableBanner';
import { EditableText } from '@/components/editor/editable/EditableText';
import { EditableButton } from '@/components/editor/editable/EditableButton';
import { LayoutTemplate, Type, MousePointerClick, Image } from 'lucide-react';

export function Toolbox() {
  const { connectors } = useEditor();

  const components = [
    {
      name: 'Banner',
      icon: LayoutTemplate,
      description: 'Hero section with heading and CTA',
      color: 'blue',
      create: () => (
        <EditableBanner
          heading="New Banner"
          subheading="Add your content here"
        />
      ),
    },
    {
      name: 'Text',
      icon: Type,
      description: 'Paragraph or heading text',
      color: 'purple',
      create: () => <EditableText text="Add your text here" />,
    },
    {
      name: 'Button',
      icon: MousePointerClick,
      description: 'Call-to-action button',
      color: 'green',
      create: () => <EditableButton text="Click me" link="/" />,
    },
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <h2 className="text-lg font-bold text-gray-900 mb-1">
          Components
        </h2>
        <p className="text-sm text-gray-600">
          Drag components onto your page
        </p>
      </div>

      {/* Component List */}
      <div className="p-4 space-y-3">
        {components.map((component, index) => (
          <div
            key={index}
            ref={(ref) => ref && connectors.create(ref, component.create())}
            className="
              group relative p-4 rounded-lg border-2 border-gray-200
              bg-white hover:bg-gray-50 hover:border-blue-400
              cursor-move transition-all duration-200
              shadow-sm hover:shadow-md
            "
          >
            {/* Drag Handle Indicator */}
            <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex flex-col gap-0.5">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
            </div>

            {/* Component Content */}
            <div className="flex items-start gap-3 ml-4">
              {/* Icon */}
              <div
                className={`
                  p-2 rounded-lg
                  ${
                    component.color === 'blue'
                      ? 'bg-blue-100 text-blue-600'
                      : component.color === 'purple'
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-green-100 text-green-600'
                  }
                `}
              >
                <component.icon className="w-5 h-5" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {component.name}
                </h3>
                <p className="text-sm text-gray-600 leading-snug">
                  {component.description}
                </p>
              </div>
            </div>

            {/* Hover Indicator */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-lg pointer-events-none transition-colors" />
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="p-4 mt-4 mx-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2 text-sm">
          💡 Quick Tips
        </h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Drag components to add them</li>
          <li>• Click to select and edit</li>
          <li>• Delete key to remove</li>
          <li>• Drag to reorder sections</li>
        </ul>
      </div>
    </div>
  );
}