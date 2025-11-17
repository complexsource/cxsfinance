'use client'

import { Editor, Frame, Element } from '@craftjs/core'
import { useState } from 'react'
import { Toolbox } from './Toolbox'
import { SettingsPanel } from './SettingsPanel'
import { Topbar } from './Topbar'
import { Container } from '@/components/editor/editable/Container'
import { EditableBanner } from '@/components/editor/editable/EditableBanner'
import { EditableText } from '@/components/editor/editable/EditableText'
import { EditableButton } from '@/components/editor/editable/EditableButton'

export default function VisualEditor({ page }: { page: any }) {
  const [enabled, setEnabled] = useState(true)

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-900">
      <Editor
        resolver={{
          Container,
          EditableBanner,
          EditableText,
          EditableButton,
        }}
      >
        {/* Top Bar */}
        <div className="flex-shrink-0">
          <Topbar
            enabled={enabled}
            setEnabled={setEnabled}
            pageId={String(page.id)}
            pageSlug={page.slug || ''}
            pageTitle={page.title || 'Untitled'}
          />
        </div>

        {/* Main Editor Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Component Toolbox */}
          <div className="w-72 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
            <Toolbox />
          </div>

          {/* Center - Canvas */}
          <div className="flex-1 overflow-auto bg-gray-100">
            <div className="p-6 min-h-full">
              <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  <Frame>
                    <Element
                      is={Container}
                      canvas
                      style={{
                        minHeight: '80vh',
                        background: 'white',
                      }}
                    >
                      {page.pageBuilder &&
                      Array.isArray(page.pageBuilder) &&
                      page.pageBuilder.length > 0 ? (
                        page.pageBuilder.map((block: any, index: number) => {
                          if (block.blockType === 'banner') {
                            const bannerProps = {
                              heading: block.heading || 'Welcome',
                              subheading: block.subheading || 'Your trusted partner',
                              textAlignment: block.textAlignment || 'center',
                              height: block.height || 'large',
                              textColor: block.textColor || 'light',
                              ...(block.backgroundImage && {
                                backgroundImage: block.backgroundImage,
                              }),
                            }

                            return <EditableBanner key={index} {...bannerProps} />
                          }
                          return null
                        })
                      ) : (
                        <div
                          className="flex items-center justify-center"
                          style={{ minHeight: '400px' }}
                        >
                          <div className="text-center p-12">
                            <div className="text-7xl mb-6 animate-bounce">👈</div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">
                              Drag Components Here
                            </h2>
                            <p className="text-lg text-gray-500">
                              Select a component from the left sidebar and drag it onto the canvas
                            </p>
                          </div>
                        </div>
                      )}
                    </Element>
                  </Frame>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Settings Panel */}
          <div className="w-80 flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto">
            <SettingsPanel />
          </div>
        </div>
      </Editor>
    </div>
  )
}
