import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Editor, Plain, Raw } from 'slate'

import Mention from './Mention'
import Suggestion from './Suggestion'

import createMentionsPlugin from '../src'

import './main.scss'

const initialState = {}

class App extends Component {
  state = {
    state: Plain.deserialize('Type @ to add a mention\n\n'),
    index: 0,
    open: false,
    suggestions: [{ id: 1, handle: '@andrew' }, { id: 2, handle: '@matthew' }, { id: 3, handle: '@james' }]
  }

  addMention = (mention) => {
    const { state } = this.state
    this.setState({ open: false })
    return this.mentionPlugin.addMention(mention, state).insertText(' ')
  }

  onCollapseMentions = () => {
    this.setState({ open: false })
  }

  onInsertMention = () => {
    const { index, suggestions } = this.state

    return this.addMention(suggestions[index])
  }

  onSeekMentions = (delta) => {
    const { index, suggestions } = this.state

    let newIndex = index + delta
    if (newIndex < 0) newIndex = 0
    if (newIndex >= suggestions.length) newIndex = suggestions.length - 1

    this.setState({ index: newIndex })
  }

  onTriggerMentions = () => {
    this.setState({ index: 0, open: true })
  }

  mentionPlugin = createMentionsPlugin({
    Mention,
    trigger: '@',
    type: 'user',
    onCollapse: this.onCollapseMentions,
    onTrigger: this.onTriggerMentions,
    onSeek: this.onSeekMentions,
    onInsert: this.onInsertMention
  })

  onClickAddMention = mention => (
    this.onChange(this.addMention(mention).apply())
  )

  onClickLogRaw = () => {
    console.log(Raw.serialize(this.state.state))
  }

  onChange = (state) => {
    this.setState({ state })
  }

  render() {
    const { index, open, state, suggestions } = this.state

    return (
      <div>
        <h1 className='navbar'>Slate Mentions Plugin</h1>
        <div className='container'>
          <div className='editor-wrapper'>
            <Editor
              className='editor'
              plugins={[this.mentionPlugin]}
              state={state}
              onChange={this.onChange}
            />
          </div>
          <ul className={`suggestions ${open ? 'open' : ''}`}>
            {suggestions.map((suggestion, idx) => (
              <Suggestion
                key={suggestion.id}
                data={suggestion}
                selected={index === idx}
                onClick={this.onClickAddMention}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
