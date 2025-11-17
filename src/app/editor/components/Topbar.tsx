'use client'

import { useEditor } from '@craftjs/core'
import { useState } from 'react'
import { Save, Eye, Sparkles, X, Check, FileText, Monitor } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Topbar({
  enabled,
  setEnabled,
  pageId,
  pageSlug,
  pageTitle,
}: {
  enabled: boolean
  setEnabled: (v: boolean) => void
  pageId: string
  pageSlug: string
  pageTitle: string
}) {
  const { query } = useEditor()
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)

    try {
      const json = query.serialize()
      const pageBuilder = convertToPayloadFormat(json)

      const response = await fetch(`/api/pages/${pageId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageBuilder,
        }),
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        alert('Failed to save')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Error saving page')
    }

    setSaving(false)
  }

  const handlePreview = () => {
    window.open(`/${pageSlug}`, '_blank')
  }

  const handleExit = () => {
    if (confirm('Exit editor? Any unsaved changes will be lost.')) {
      router.push('/admin/collections/pages')
    }
  }

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left - Page Info & Mode Toggle */}
        <div className="flex items-center gap-4">
          {/* Page Info */}
          <div className="flex items-center gap-3 pr-4 border-r border-gray-700">
            <div className="p-2 bg-blue-600 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold">{pageTitle}</h1>
              <p className="text-xs text-gray-400">/{pageSlug}</p>
            </div>
          </div>

          {/* Edit/Preview Toggle */}
          <button
            onClick={() => setEnabled(!enabled)}
            className={`
              flex items-center gap-2 px-5 py-2 rounded-lg font-medium text-sm
              transition-all duration-200 transform hover:scale-105
              ${
                enabled
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50'
                  : 'bg-gray-700 hover:bg-gray-600'
              }
            `}
          >
            {enabled ? (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Edit Mode</span>
              </>
            ) : (
              <>
                <Monitor className="w-4 h-4" />
                <span>Preview Mode</span>
              </>
            )}
          </button>
        </div>

        {/* Right - Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Preview Button */}
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-sm transition-all"
          >
            <Eye className="w-4 h-4" />
            <span>Preview Site</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-sm
              transition-all duration-200 transform hover:scale-105
              ${
                saved
                  ? 'bg-green-600 shadow-lg shadow-green-500/50'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-600/50 hover:shadow-xl'
              }
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            `}
          >
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved!</span>
              </>
            ) : saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>

          {/* Exit Button */}
          <button
            onClick={handleExit}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded-lg font-medium text-sm transition-all"
          >
            <X className="w-4 h-4" />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Save Success Bar */}
      {saved && (
        <div className="bg-green-600 px-6 py-2 animate-pulse">
          <p className="text-sm flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Changes saved successfully!</span>
          </p>
        </div>
      )}
    </div>
  )
}

function convertToPayloadFormat(craftJson: string) {
  const state = JSON.parse(craftJson)
  const blocks: any[] = []

  Object.values(state).forEach((node: any) => {
    if (node.type?.resolvedName === 'EditableBanner') {
      blocks.push({
        blockType: 'banner',
        heading: node.props.heading,
        subheading: node.props.subheading,
        textAlignment: node.props.textAlignment,
        height: node.props.height,
        textColor: node.props.textColor,
        backgroundImage: node.props.backgroundImage,
      })
    }
  })

  return blocks
}
