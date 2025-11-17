'use client';

import { useEditor } from '@craftjs/core';
import { useState } from 'react';
import { Save, Eye, Sparkles, X, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Topbar({
  enabled,
  setEnabled,
  pageId,
  pageSlug,
}: {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  pageId: string;
  pageSlug: string;
}) {
  const { query } = useEditor();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    try {
      // Get the current editor state
      const json = query.serialize();

      // Convert to Payload format
      const pageBuilder = convertToPayloadFormat(json);

      // Save to Payload CMS
      const response = await fetch(`/api/pages/${pageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageBuilder,
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert('Failed to save');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving page');
    }

    setSaving(false);
  };

  const handlePreview = () => {
    window.open(`/${pageSlug}`, '_blank');
  };

  const handleExit = () => {
    if (confirm('Exit without saving changes?')) {
      router.push('/admin/collections/pages');
    }
  };

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left - Mode Toggle */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-900">Visual Editor</h1>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium
              transition-all duration-200
              ${
                enabled
                  ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {enabled ? (
              <>
                <Sparkles className="w-4 h-4" />
                Edit Mode
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Preview Mode
              </>
            )}
          </button>
        </div>

        {/* Right - Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Preview Button */}
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-lg font-medium
              transition-all duration-200
              ${
                saved
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved!
              </>
            ) : saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save
              </>
            )}
          </button>

          {/* Exit Button */}
          <button
            onClick={handleExit}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors"
          >
            <X className="w-4 h-4" />
            Exit
          </button>
        </div>
      </div>

      {/* Status Bar */}
      {saved && (
        <div className="bg-green-50 border-t border-green-200 px-6 py-2">
          <p className="text-sm text-green-800">
            ✓ Changes saved successfully
          </p>
        </div>
      )}
    </div>
  );
}

// Helper function to convert Craft.js format to Payload format
function convertToPayloadFormat(craftJson: string) {
  // Parse Craft.js state
  const state = JSON.parse(craftJson);
  const blocks: any[] = [];

  // Convert each node to Payload block format
  Object.values(state).forEach((node: any) => {
    if (node.type?.resolvedName === 'EditableBanner') {
      blocks.push({
        blockType: 'banner',
        heading: node.props.heading,
        subheading: node.props.subheading,
        textAlignment: node.props.textAlignment,
        height: node.props.height,
        textColor: node.props.textColor,
      });
    }
    // Add more block type conversions here
  });

  return blocks;
}