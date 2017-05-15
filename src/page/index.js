import React from 'react'
import {Editor, EditorState, RichUtils} from 'draft-js'

class Zieditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {editorState: EditorState.createEmpty()}
    this.onChange = (editorState)=>this.setState({editorState})
    this.handleKeyCommand = this.handleKeyCommand.bind(this)
  }
  handleKeyCommand(command){
    const newState = RichUtils.handleKeyCommand(this.state.editorState,command)
    if(newState){
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }
  render() {
    const {editorState} = this.state
    return (
      <div>
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <Editor editorState={editorState}
        handleKeyCommand={this.handleKeyCommand}
        onChange={this.onChange} />
      </div>
    )
  }
}

export default Zieditor