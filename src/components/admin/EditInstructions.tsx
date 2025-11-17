'use client'

import { useDocumentInfo } from '@payloadcms/ui'
import React from 'react'

export default function EditInstructions() {
  const { id } = useDocumentInfo()

  if (!id) {
    return (
      <div
        style={{
          padding: '1rem',
          background: '#f3f4f6',
          borderRadius: '0.5rem',
          color: '#6b7280',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '0.875rem', margin: 0 }}>
          Save the page first to enable visual editor
        </p>
      </div>
    )
  }

  const editorUrl = `/editor/${id}`

  return (
    <div
      style={{
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '0.75rem',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '0.75rem',
        }}
      >
        {/* Sparkles Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3v18M3 12h18M7.5 7.5l9 9M16.5 7.5l-9 9" />
        </svg>

        <h3
          style={{
            margin: 0,
            fontSize: '1.125rem',
            fontWeight: 'bold',
            letterSpacing: '-0.025em',
          }}
        >
          Visual Editor Available
        </h3>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '0.875rem',
          marginBottom: '1.25rem',
          opacity: 0.95,
          lineHeight: '1.5',
          margin: '0 0 1.25rem 0',
        }}
      >
        Edit this page with drag &amp; drop, inline text editing, and real-time preview!
      </p>

      {/* Button */}
      <a
        href={editorUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: '600',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          transition: 'all 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* External Link Icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>

        <span>Open Visual Editor</span>
      </a>

      {/* Tip Section */}
      <div
        style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <p
          style={{
            fontSize: '0.75rem',
            opacity: 0.8,
            margin: 0,
          }}
        >
          💡 Tip: Bookmark the visual editor link for quick access
        </p>
      </div>
    </div>
  )
}
