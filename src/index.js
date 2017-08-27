import React from 'react'

import clearCurrentMention from './utils/clearCurrentMention'
import getCurrentMentionText from './utils/getCurrentMentionText'
import getSearchText from './utils/getSearchText'
import insertMentionNode from './utils/insertMentionNode'
import isInsideMention from './utils/isInsideMention'
import validateOptions from './utils/validateOptions'

import { TAB, ENTER, SPACE, UP, DOWN } from './keys'

export default function createMentionPlugin(options) {
  const pluginOptions = validateOptions(options)

  const {
    Mark, Mention, SuggestionItem, trigger, type,
    onCollapse, onInsert, onSearch, onSeek, onTrigger
  } = pluginOptions

  const key = `${type}-mention`

  const schema = {
    marks: {
      [key]: Mark
    },
    nodes: {
      [key]: Mention
    }
  }

  function render(props, state) {
    return (
      <div id={`${key}-plugin`}>
        {props.children}
      </div>
    )
  }

  function addMention(mention, state) {
    return insertMentionNode(mention, state, trigger, key)
  }

  function addMark(state) {
    return state.transform()
                .addMark(key)
                .insertText(trigger)
  }

  function onKeyDown(event, { code }, state) {
    if (!isInsideMention(state, key)) return

    switch (code) {
      case SPACE:
        return clearCurrentMention(state, trigger, key).apply()

      case TAB:
      case ENTER:
        event.preventDefault()

        onCollapse()
        return onInsert().apply()

      case DOWN:
        event.preventDefault()

        onSeek(1)
        return

      case UP:
        event.preventDefault()

        onSeek(-1)
        return
    }
  }

  function onBeforeInput(event, data, state) {
    if (isInsideMention(state, key)) {
      if (event.data === trigger) {
        event.preventDefault()
        return state
      }

      const mentionText = getCurrentMentionText(state.endText.text, trigger)
      onSearch(getSearchText(mentionText, event.data))
    } else {
      if (event.data === trigger) {
        event.preventDefault()

        onTrigger()

        return addMark(state).apply()
      }
    }
  }

  function onChange(state) {
    const { selection } = state

    if (!selection.isCollapsed) {
      onCollapse()
      return
    }

    if (isInsideMention(state, key)) {
      onTrigger()
    } else {
      onCollapse()
    }
  }

  return {
    addMark,
    addMention,
    onBeforeInput,
    onChange,
    onKeyDown,
    render,
    schema,
  }
}
