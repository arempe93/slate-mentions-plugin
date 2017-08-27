import React from 'react'

export default function Mention({ attributes, node, state: { selection } }) {
  const { data } = node
  const id = data.get('id')
  const handle = data.get('handle')
  const isSelected = selection.hasFocusIn(node)

  return (
    <a
      {...attributes}
      className={`mention ${isSelected ? 'selected' : ''}`}
      contentEditable={false}
      href={`https://example.com/user/${id}`}
      rel='noreferrer noopener'
      target='_blank'
    >
      {handle}
    </a>
  )
}
