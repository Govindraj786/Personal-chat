import React, { useState, useEffect } from "react";
import ScrollTOBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, username, room }) => {
  const [messages, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  console.log("messageList", messageList);

  const sendMessage = (e) => {
    e.preventDefault();
    if (messages !== "") {
      const messagedata = {
        room: room,
        author: username,
        message: messages,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getHours(),
      };
      // console.log("messagedata",messagedata);
      socket.emit("send_message", messagedata);
      setMessageList((list) => [...list, messagedata]);
      setMessage("")
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("data", data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>LIVE CHAT</p>
      </div>
      <div className="chat-body">
        <ScrollTOBottom className="message-container">
        {messageList.length > 0 &&
          messageList.map((x, i) => {
            return (
              <div key={i} className="message" id={username === x.author ? "you" : "other"}>
                <div >
                  <div className="message-content">
                    <p>{x.message}</p>
                  </div>
                    <div className="message-meta" >
                    <p id='time'>{x.time}</p>
                    <p id="author">{x.author}</p>
                    </div>
                </div>
              </div>
            );
          })}
          </ScrollTOBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={messages||""}
          placeholder="Text..."
          onChange={(e) => setMessage(e.target.value)}
        //   onKeyPress={(event)=>{
        //     event.key ==="Enter" && sendMessage();
        //   }}
        />
        <button onClick={(e) => sendMessage(e)}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
