import React from 'react'

const DEFAULT_OPTIONS = {
  Mark: ({ attributes, children }) => <span {...attributes}>{children}</span>,
  ignoreInsideBlocks: [],
  insertOnSpace: false,
  onlyInsideBlocks: [],
  trigger: '@',
  type: 'default',
  onInsert: () => {},
  onSearch: () => {},
  onSeek: () => {},
  onTrigger: () => {},
}

export default function validateOptions(options) {
  const pluginOptions = { ...DEFAULT_OPTIONS, ...options }

  if (!pluginOptions.Mention) {
    throw new Error('[slate-mentions-plugin] Mention component is required')
  }

  return pluginOptions
}
