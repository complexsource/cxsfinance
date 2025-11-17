'use client';

import { useNode } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';
import React, { useRef } from 'react';

export function EditableBanner({
  heading = 'Welcome',
  subheading = 'Your trusted partner',
  textAlignment = 'center',
  height = 'large',
  textColor = 'dark',
}: {
  heading?: string;
  subheading?: string;
  textAlignment?: 'left' | 'center' | 'right';
  height?: 'small' | 'medium' | 'large' | 'fullscreen';
  textColor?: 'dark' | 'light';
}) {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const headingRef = useRef(heading);
  const subheadingRef = useRef(subheading);

  const heightMap = {
    small: '300px',
    medium: '500px',
    large: '700px',
    fullscreen: '100vh',
  };

  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <section
      ref={(ref) => ref && connect(drag(ref))}
      className={`
        relative group
        ${selected ? 'ring-4 ring-blue-500 ring-opacity-75' : ''}
        transition-all duration-200
      `}
      style={{
        minHeight: heightMap[height],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '4rem 2rem',
      }}
    >
      {/* Selection Indicator */}
      {selected && (
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
          Banner Selected
        </div>
      )}

      {/* Content */}
      <div className={`max-w-4xl mx-auto ${alignmentClass[textAlignment]}`}>
        <ContentEditable
          innerRef={headingRef}
          html={heading}
          onChange={(e) => {
            headingRef.current = e.target.value;
            setProp((props: any) => {
              props.heading = e.target.value;
            }, 500);
          }}
          tagName="h1"
          className={`
            text-5xl lg:text-6xl font-bold mb-6
            ${textColor === 'light' ? 'text-white' : 'text-gray-900'}
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
            rounded px-4 py-2
            transition-all duration-200
          `}
          style={{
            minHeight: '1em',
            cursor: 'text',
          }}
        />

        <ContentEditable
          innerRef={subheadingRef}
          html={subheading}
          onChange={(e) => {
            subheadingRef.current = e.target.value;
            setProp((props: any) => {
              props.subheading = e.target.value;
            }, 500);
          }}
          tagName="p"
          className={`
            text-xl lg:text-2xl
            ${textColor === 'light' ? 'text-gray-200' : 'text-gray-700'}
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
            rounded px-4 py-2
            transition-all duration-200
          `}
          style={{
            minHeight: '1em',
            cursor: 'text',
          }}
        />
      </div>

      {/* Hover Overlay */}
      <div
        className={`
          absolute inset-0 pointer-events-none
          border-4 border-transparent
          group-hover:border-blue-400 group-hover:border-dashed
          transition-all duration-200
          ${selected ? 'opacity-0' : 'opacity-100'}
        `}
      />
    </section>
  );
}

EditableBanner.craft = {
  displayName: 'Banner',
  props: {
    heading: 'Welcome',
    subheading: 'Your trusted partner',
    textAlignment: 'center',
    height: 'large',
    textColor: 'dark',
  },
  related: {
    settings: BannerSettings,
  },
};

// Settings Component
function BannerSettings() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="space-y-4">
      {/* Text Alignment */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Text Alignment
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              onClick={() => {
                setProp((props: any) => {
                  props.textAlignment = align;
                });
              }}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  props.textAlignment === align
                    ? 'bg-blue-600 text-white shadow-md'
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
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Banner Height
        </label>
        <select
          value={props.height}
          onChange={(e) => {
            setProp((props: any) => {
              props.height = e.target.value;
            });
          }}
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        >
          <option value="small">Small (300px)</option>
          <option value="medium">Medium (500px)</option>
          <option value="large">Large (700px)</option>
          <option value="fullscreen">Full Screen</option>
        </select>
      </div>

      {/* Text Color */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Text Color
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'dark', label: 'Dark', color: 'bg-gray-900' },
            { value: 'light', label: 'Light', color: 'bg-white' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setProp((props: any) => {
                  props.textColor = option.value;
                });
              }}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  props.textColor === option.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <div className={`w-4 h-4 rounded-full ${option.color} border-2 border-gray-300`} />
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}