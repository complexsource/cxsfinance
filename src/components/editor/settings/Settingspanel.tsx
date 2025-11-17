'use client';

import { useEditor } from '@craftjs/core';
import { Settings, Info } from 'lucide-react';

export function SettingsPanel() {
  const { selected } = useEditor((state) => {
    const selectedNodeId = state.events.selected;
    let selectedNode = null;

    if (selectedNodeId) {
      selectedNode = state.nodes[selectedNodeId];
    }

    return {
      selected: selectedNode,
    };
  });

  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-5 h-5 text-purple-600" />
          <h2 className="text-lg font-bold text-gray-900">Properties</h2>
        </div>
        <p className="text-sm text-gray-600">
          {selected ? 'Edit component settings' : 'Select a component'}
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        {!selected ? (
          // No component selected
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              No component selected
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Click on any component in the canvas to edit its properties
            </p>
          </div>
        ) : (
          // Component selected - Show settings
          <div className="space-y-6">
            {/* Component Name */}
            <div className="pb-4 border-b border-gray-200">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {selected.data.displayName || selected.data.name || 'Component'}
              </div>
            </div>

            {/* Settings Form */}
            {selected.related?.settings ? (
              <selected.related.settings />
            ) : (
              <div className="text-sm text-gray-600">
                This component has no additional settings.
              </div>
            )}

            {/* Delete Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  // Delete functionality will be added
                }}
                className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
              >
                Delete Component
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}