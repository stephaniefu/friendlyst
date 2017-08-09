import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import MessageList from './MessageList.jsx'
import axios from 'axios'

class ChatRoomListEntry extends Component {
  constructor() {
    super()
    this.state = {
      value: '',
      messages: []
    }
  }

  
  componentDidMount() {
    this.props.room.mainUser.on('private message received', msg => {
      msg.fromOthers = true
      this.setState({
        messages: [...this.state.messages, msg]
      })
    })
  }

  sendPrivateMessage(text) {
    let msg = {
      msg: text,
      to: this.props.room.friend,
      from: this.props.room.mainUser.nickname
    }
    

    this.props.room.mainUser.emit('private message', msg)
    

    if (msg.to === msg.from) {
      return
    } 

    axios.post('/api/friend/message', msg)

    this.setState({
        messages: [...this.state.messages, msg]
    })
  }

  closeCurrentRoom() {
    let room = {
      friend: this.props.room.friend,
      mainUser: this.props.room.mainUser
    }

    this.props.closeRoom(room)
  }

  handleEnter(e) {
    if (e.target.value.length < 1) {
      return 
    }
    if (e.key === 'Enter') {
      this.sendPrivateMessage(e.target.value)
      e.target.value= ''
    }
  }

  render() {
    return (
    <div className="chatroom" ref="chatroom">
        <div className="chatroom-header">
          <div className="chatroom-header-name">{this.props.room.friend}</div><div onClick={this.closeCurrentRoom.bind(this)} className="chatroom-header-button">x</div>
        </div>

        <div className="private-message-area">
           <MessageList messages={this.state.messages} friend={this.props.room.friend} mainUser={this.props.room.mainUser}/> 
        </div>

        <div className="chatroom-inputs">
          <input onKeyPress={this.handleEnter.bind(this)} placeholder="Type a message..."/>
        </div>
      </div>
    )
  }
}

export default ChatRoomListEntry