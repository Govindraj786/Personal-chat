import React,{useState} from 'react';
import './App.css';
import ChatRoom from '../src/Component/Chat';
import io from "socket.io-client"

const socket = io.connect("http://localhost:8080")

function App() {
  const [state,setState] = useState({username:'',room:''})
  const [show,setShow]=useState(false)
  const handleJoin =()=>{
    console.log("state===>", state);
    if(state.username !== "" && state.room !== ""){
     socket.emit("join_room",state.room)
     setShow(true);
    }
  }

  return (
    <div className="App">
      {!show ? (<>
    <h1>JOIN A CHAT</h1>
    <div className="joinChatContainer">
    <input  type="text" placeholder="name" onChange={(e)=>{setState({...state, username: e.target.value})}}/>
    <input type="text" placeholder="room" onChange={(e)=>{setState({...state, room:e.target.value})}}/> 
    <button onClick={()=>handleJoin()}>JOIN ROOM</button>
    </div></>
      ):(
    <ChatRoom 
    socket={socket} 
    username={state.username}
    room={state.room}/>)}
    </div>
  );
}

export default App;
