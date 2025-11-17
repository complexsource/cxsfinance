'use client'

import { useNode } from '@craftjs/core'
import ContentEditable from 'react-contenteditable'
import { useState } from 'react'

export function EditableText({ text = 'Add your text here' }: { text?: string }) {
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
        tagName="p"
        className="text-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-2 py-1"
        style={{ minHeight: '1em', cursor: 'text' }}
      />
    </div>
  )
}

EditableText.craft = {
  displayName: 'Text',
  props: {
    text: 'Add your text here',
  },
}
