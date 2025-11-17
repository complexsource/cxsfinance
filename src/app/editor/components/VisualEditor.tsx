'use client';

import { Editor, Frame, Element } from '@craftjs/core';
import { useState } from 'react';
import { Toolbox } from './Toolbox';
import { SettingsPanel } from './SettingsPanel';
import { Topbar } from './Topbar';
import { Container } from '@/components/editor/editable/Container';
import { EditableBanner } from '@/components/editor/editable/EditableBanner';
import { EditableText } from '@/components/editor/editable/EditableText';
import { EditableButton } from '@/components/editor/editable/EditableButton';

export default function VisualEditor({ page }: { page: any }) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Editor
        resolver={{
          Container,
          EditableBanner,
          EditableText,
          EditableButton,
        }}
      >
        {/* Top Bar with Save/Publish */}
        <Topbar
          enabled={enabled}
          setEnabled={setEnabled}
          pageId={page.id}
          pageSlug={page.slug}
        />

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Component Toolbox */}
          <Toolbox />

          {/* Center - Canvas/Editor Area */}
          <div className="flex-1 overflow-auto p-8">
            <div className="max-w-7xl mx-auto">
              <Frame>
                <Element
                  is={Container}
                  canvas
                  style={{
                    minHeight: '100vh',
                    background: 'white',
                    boxShadow: '0 0 40px rgba(0,0,0,0.1)',
                  }}
                >
                  {/* Render existing page blocks */}
                  {page.pageBuilder?.map((block: any, index: number) => {
                    if (block.blockType === 'banner') {
                      return (
                        <EditableBanner
                          key={index}
                          heading={block.heading}
                          subheading={block.subheading}
                          textAlignment={block.textAlignment}
                          height={block.height}
                          textColor={block.textColor}
                        />
                      );
                    }
                    return null;
                  })}
                </Element>
              </Frame>
            </div>
          </div>

          {/* Right Sidebar - Settings Panel */}
          <SettingsPanel />
        </div>
      </Editor>
    </div>
  );
}