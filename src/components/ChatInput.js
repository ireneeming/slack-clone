import React, {useRef} from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import {db} from "../firebase";
import firebase from "firebase/compat/app";


function ChatInput({channelName, channelId}) {
  //const inputRef = useRef(null);
  const [input, setInput] = React.useState('');
  console.log(channelId);

  const sendMessage = (e) => {
    e.preventDefault();//prevents refresh
    
    if(!channelId){
      return false;
    }

    db.collection("room").doc(channelId).collection("Messages").add({
      message:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      user:'Sonny PAPA',
      userImage:'https://img.hankyung.com/photo/202110/99.27898506.1-1200x.jpg'


    });

    setInput('');
  }

  return (
    <ChatInputContainer>
      <form>
        <input value={input} onChange={(e)=>{setInput(e.target.value)}}  placeholder={`Message #ROOM`} />
        <Button hidden type="submit" onClick={sendMessage}>SEND</Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius:20px;

  > form{
    position:relative;
    display: flex;
    justify-content:center;
  }

  > form > input {
    position:fixed;
    bottom:30px;
    width:60%;
    border:1px solid gray;
    border-radius: 3px;
    padding:20px;
    outline:none;
  }
  > form > button {

    display:none;
  }
`;
