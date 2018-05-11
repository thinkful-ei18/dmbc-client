import React from "react";
import moment from "moment";
import io from "socket.io-client";
import { connect } from "react-redux";

const socket = io()  

export class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      message: "",
      messageHistory: [],
      roomAttendance: 1
    };
  }

  sendMessage(event) {
    event.preventDefault();

    socket.emit("SEND_MESSAGE", {
      roomId: this.props.roomId,
      messageBody: {
        author: this.state.username,
        message: this.state.message,
        createdOn: moment().format("MMMM Do YYYY, h:mm:ss a")
      }
    });

    this.setState({ message: "" });
  }

  goToBottom(id) {
    const el = document.getElementById(id);
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }

  componentDidMount() {
    const { currentUser, roomId } = this.props;
    socket.emit("JOIN_ROOM", { roomId, currentUser });

    const addMessage = data => {
      const msg = {
        body: data
      };
      this.setState({ messageHistory: [...this.state.messageHistory, msg] });
      this.goToBottom("chat");
    };

   socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    socket.on("JOIN_ROOM", data => {
      const msg = {
        type: "broadcast",
        body: data
      };

      this.setState({
        roomAttendance: this.state.roomAttendance + 1,
        messageHistory: [...this.state.messageHistory, msg]
      });
    });

    socket.on("LEAVING_ROOM", data => {
      const msg = {
        type: "broadcast",
        body: data
      };

      this.setState({
        roomAttendance: this.state.roomAttendance - 1,
        messageHistory: [...this.state.messageHistory, msg]
      });
    });
    this.setState({
      username: currentUser.firstName
    });
  }

  componentWillUnmount() {
   socket.emit("LEAVING_ROOM", {
      roomId: this.props.roomId,
      username: this.state.username
    });
  }

  renderSenderList(message) {
    return (
      <div>
        {<span className="author">{message.author[0]}</span>}
        {<span className="message-style">{message.message}</span>}
        {<span className="date">{message.createdOn}</span>}
      </div>
    );
  }
  renderReceiverList(message) {
    return (
      <div>
        <span className="message-style message-receive-list">
          {message.message}
        </span>
        <span className="author author-receive-list">{message.author[0]}</span>
        <span className="date">{message.createdOn}</span>}
      </div>
    );
  }
  render() {
    return (
      <div>
        <h3>Chat With Your Ambassador</h3>
        <main>
          <ul id="chat" className="chat-list">
            {this.state.messageHistory.map((message, index) => {
              if (message.type === "broadcast") {
                return <li key={index}>{message.body}</li>;
              }
              return message.body.author === this.state.username ? (
                <li key={index}>{this.renderSenderList(message.body)}</li>
              ) : (
                <li key={index}>{this.renderReceiverList(message.body)}</li>
              );
            })}
          </ul>
          <footer>
            <form onSubmit={event => event.preventDefault()}>
              <div>
                <input
                  type="text"
                  placeholder="your message"
                  value={this.state.message}
                  onChange={event =>
                    this.setState({ message: event.target.value })
                  }
                />
              </div>
              <button
                label="Send"
                type="submit"
                onClick={event => this.sendMessage(event)}
              >
                Submit
              </button>
            </form>
          </footer>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    socket: state.socket.socket
  };
};

export default connect(mapStateToProps)(Chat);
