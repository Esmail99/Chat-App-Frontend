import React, { Component } from 'react';
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';
import { changeMessageInput } from '../../redux/actions';
import './Chat.css';

const scrollToBottom = () => {
    document.getElementById('scroll').scrollIntoView({ behavior: "smooth" });
}

// Connecting Socket.io
const socket = socketIOClient('http://localhost:4000');
socket.on('chat',(data) => {
    document.getElementById('typing').innerHTML = '';
    document.getElementById('chatMessages').innerHTML += '<p><strong>' + data.name + ': </strong>' + data.message + '</p><br/>';
    scrollToBottom();
})
socket.on('typing',(data) => {
    document.getElementById('typing').innerHTML = data + ' is typing ...'
})

// Handle redux
const mapStateToProps = (state) => {
    return {
        messageField: state.messageInput.messageField,
        username: state.userInfo.username,
        isSignedin: state.userInfo.isSignedin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInputChange: (event) => dispatch(changeMessageInput(event.target.value))
    }
}


class Chat extends Component {
    onFormSubmit = (e) => {
        e.preventDefault();
        if(this.props.messageField.length)
        {
            socket.emit('chat',{
                name: this.props.username,
                message: this.props.messageField
            })
            document.getElementsByTagName('input')[0].value = '';
            this.props.onInputChange({target: { value: '' }});
            scrollToBottom();
        }
    }

      
    render(){
        const { isSignedin, onInputChange, username} = this.props
        return isSignedin
        ?   <div className="card mx-auto my-5 bg-light chat-container">
                <header className='text-center border-bottom font-italic'>
                    <h4 className=' my-3'>Global Chat</h4>
                </header>
                <div className="card-body overflow-auto">
                    <div id='chatMessages'></div>
                    <div id='scroll'></div>
                </div>
                <p id='typing' className='ml-3'></p>
                <form onSubmit={this.onFormSubmit} className="input-group p-1">
                    <input 
                        onChange={(event) =>{
                            onInputChange(event)
                            socket.emit('typing', username)
                        }}
                        type="text" 
                        className="form-control rounded-pill" 
                        placeholder="Type a message.." 
                        aria-label="Type a message.." 
                        aria-describedby="button-addon2" 
                    />
                    <div className="input-group-append btn m-0 p-0">
                        <svg onClick={this.onFormSubmit} height="36px" width="36px" viewBox="0 0 36 36">
                            <g fill="none" fillRule="evenodd"><g>
                            <polygon points="0 36 36 36 36 0 0 0"></polygon>
                            <path d="M31.1059281,19.4468693 L10.3449666,29.8224462 C8.94594087,30.5217547 7.49043432,29.0215929 8.17420251,27.6529892 C8.17420251,27.6529892 10.7473302,22.456697 11.4550902,21.0955966 C12.1628503,19.7344961 12.9730756,19.4988922 20.4970248,18.5264632 C20.7754304,18.4904474 21.0033531,18.2803547 21.0033531,17.9997309 C21.0033531,17.7196073 20.7754304,17.5095146 20.4970248,17.4734988 C12.9730756,16.5010698 12.1628503,16.2654659 11.4550902,14.9043654 C10.7473302,13.5437652 8.17420251,8.34697281 8.17420251,8.34697281 C7.49043432,6.9788693 8.94594087,5.47820732 10.3449666,6.1775158 L31.1059281,16.553593 C32.298024,17.1488555 32.298024,18.8511065 31.1059281,19.4468693" fill="#0099ff"></path></g></g>
                        </svg>
                    </div>
                </form>
            </div>
        :   <div className='text-center mt-5'>
                <h1>
                    <Link to="/">Please register first</Link>
                </h1>
            </div> 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);