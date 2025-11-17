'use client'

import { useNode } from '@craftjs/core'
import ContentEditable from 'react-contenteditable'
import { useState } from 'react'

export function EditableButton({
  text = 'Click me',
  link = '/',
}: {
  text?: string
  link?: string
}) {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }))

  const [content, setContent] = useState(text)

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref))
        }
      }}
      className={`
        relative group p-4
        ${selected ? 'ring-4 ring-blue-500 ring-opacity-75' : ''}
      `}
    >
      <ContentEditable
        html={content}
        onChange={(e) => {
          const newValue = e.target.value
          setContent(newValue)
          setProp((props: any) => {
            props.text = newValue
          }, 500)
        }}
        tagName="button"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
        style={{ cursor: 'text' }}
      />
    </div>
  )
}

EditableButton.craft = {
  displayName: 'Button',
  props: {
    text: 'Click me',
    link: '/',
  },
  related: {
    settings: ButtonSettings,
  },
}

function ButtonSettings() {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Button Link</label>
        <input
          type="text"
          value={props.link}
          onChange={(e) => {
            setProp((props: any) => {
              props.link = e.target.value
            })
          }}
          placeholder="/contact"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        />
      </div>
    </div>
  )
}
