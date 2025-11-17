'use client'

import { useNode } from '@craftjs/core'
import ContentEditable from 'react-contenteditable'
import React, { useState } from 'react'
import Image from 'next/image'

// Add proper interface at the top
interface EditableBannerProps {
  heading?: string
  subheading?: string
  textAlignment?: 'left' | 'center' | 'right'
  height?: 'small' | 'medium' | 'large' | 'fullscreen'
  textColor?: 'light' | 'dark'
  backgroundImage?: string | { url?: string; alt?: string } | null
}

export function EditableBanner({
  heading = 'Welcome',
  subheading = 'Your trusted partner',
  textAlignment = 'center',
  height = 'large',
  textColor = 'light',
  backgroundImage,
}: EditableBannerProps) {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }))

  const [headingContent, setHeadingContent] = useState(heading)
  const [subheadingContent, setSubheadingContent] = useState(subheading)

  const heightMap = {
    small: '300px',
    medium: '500px',
    large: '700px',
    fullscreen: '100vh',
  }

  const alignmentClass = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  // Get background image URL
  const getBackgroundImageUrl = (): string | null => {
    if (!backgroundImage) return null

    if (typeof backgroundImage === 'string') {
      return backgroundImage
    }

    if (typeof backgroundImage === 'object' && backgroundImage.url) {
      return backgroundImage.url
    }

    return null
  }

  const bgImageUrl = getBackgroundImageUrl()

  return (
    <section
      ref={(ref) => {
        if (ref) {
          connect(drag(ref))
        }
      }}
      className={`relative group overflow-hidden ${selected ? 'ring-4 ring-blue-500 ring-opacity-75' : ''}`}
      style={{
        minHeight: heightMap[height],
      }}
    >
      {/* Background Image */}
      {bgImageUrl && (
        <div className="absolute inset-0">
          <Image
            src={bgImageUrl}
            alt="Banner background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-60" />
        </div>
      )}

      {/* Fallback Gradient */}
      {!bgImageUrl && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        />
      )}

      {/* Selection Indicator */}
      {selected && (
        <div className="absolute top-4 left-4 z-30 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          Banner Selected - Click text to edit
        </div>
      )}

      {/* Content */}
      <div
        className={`relative z-20 h-full flex flex-col justify-center px-8 py-16 ${alignmentClass[textAlignment]}`}
      >
        <div className="max-w-4xl">
          <ContentEditable
            html={headingContent}
            onChange={(e) => {
              const newValue = e.target.value
              setHeadingContent(newValue)
              setProp((props: any) => {
                props.heading = newValue
              }, 500)
            }}
            tagName="h1"
            className={`
              text-4xl md:text-5xl lg:text-6xl font-bold mb-6
              ${textColor === 'light' ? 'text-white' : 'text-gray-900'}
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50
              rounded px-4 py-2
              transition-all duration-200
              ${selected ? 'cursor-text' : 'cursor-default'}
            `}
            style={{
              minHeight: '1em',
              textShadow: textColor === 'light' ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
            }}
          />

          <ContentEditable
            html={subheadingContent}
            onChange={(e) => {
              const newValue = e.target.value
              setSubheadingContent(newValue)
              setProp((props: any) => {
                props.subheading = newValue
              }, 500)
            }}
            tagName="p"
            className={`
              text-xl md:text-2xl lg:text-3xl
              ${textColor === 'light' ? 'text-gray-100' : 'text-gray-700'}
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50
              rounded px-4 py-2
              transition-all duration-200
              ${selected ? 'cursor-text' : 'cursor-default'}
            `}
            style={{
              minHeight: '1em',
              textShadow: textColor === 'light' ? '0 1px 3px rgba(0,0,0,0.5)' : 'none',
            }}
          />
        </div>
      </div>

      {/* Hover Overlay */}
      <div
        className={`
          absolute inset-0 pointer-events-none z-10
          border-4 border-transparent
          group-hover:border-blue-400 group-hover:border-dashed
          transition-all duration-200
          ${selected ? 'opacity-0' : 'opacity-100'}
        `}
      />
    </section>
  )
}

EditableBanner.craft = {
  displayName: 'Banner',
  props: {
    heading: 'Welcome',
    subheading: 'Your trusted partner',
    textAlignment: 'center',
    height: 'large',
    textColor: 'light',
    backgroundImage: null,
  },
  related: {
    settings: BannerSettings,
  },
}

function BannerSettings() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <div className="space-y-6">
      {/* Text Alignment */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Text Alignment</label>
        <div className="grid grid-cols-3 gap-2">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              onClick={() => {
                setProp((props: any) => {
                  props.textAlignment = align
                })
              }}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  props.textAlignment === align
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Height */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Banner Height</label>
        <select
          value={props.height}
          onChange={(e) => {
            setProp((props: any) => {
              props.height = e.target.value
            })
          }}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        >
          <option value="small">Small (300px)</option>
          <option value="medium">Medium (500px)</option>
          <option value="large">Large (700px)</option>
          <option value="fullscreen">Full Screen</option>
        </select>
      </div>

      {/* Text Color */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Text Color</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'light', label: 'Light (for dark images)', color: 'bg-white' },
            { value: 'dark', label: 'Dark (for light images)', color: 'bg-gray-900' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setProp((props: any) => {
                  props.textColor = option.value
                })
              }}
              className={`
                flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  props.textColor === option.value
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <div
                className={`w-5 h-5 rounded-full ${option.color} border-2 border-gray-300 shadow-sm`}
              />
              <span className="text-xs">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Background Image Info */}
      {props.backgroundImage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800 font-medium">
            ✓ Background image loaded from Payload
          </p>
          <p className="text-xs text-green-600 mt-1">
            Change image in Payload admin to update here
          </p>
        </div>
      )}
    </div>
  )
}
