import React from 'react';
import styled from 'styled-components';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {selectRoomId} from "../features/appSlice";
import { useSelector } from 'react-redux';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

import ChatInput from './ChatInput';
import { db } from '../firebase';

function Chat() {

  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("room").doc(roomId)
  );
  const [roomMessage] = useDocument(
    roomId && 
    db.collection("room").doc(roomId).collection("messages").orderBy("timestamp", "asc")
  );

  return (
    <ChatContainer>
      <>
      <Header>
        <HeaderLeft>
          <h4>
            <strong>#Room-name</strong> 
          </h4>
          <StarBorderIcon/>
         
        </HeaderLeft>
        <HeaderRight>
          <p>
            <InfoOutlinedIcon/> Details
          </p>

        </HeaderRight>

      </Header>
      <ChatMessages>
      {/* List out the messages */}

      </ChatMessages>
      <ChatInput 
        //channelName
        channelId={roomId}
      />

      </>
    </ChatContainer>
  )
}

export default Chat;

const ChatContainer = styled.div`
  flex:0.7;
  flex-grow: 1;
  overflow-y:auto;
  margin-top:60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding:20px;
  border-bottom:1px solid lightgray;
`;

const ChatMessages = styled.div`
  /* List out the messages */
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items:center;
 >h4 {
   display: flex;
   text-transform:lowercase;
 }

 >.MuiSvgIcon-root{
   margin-left:10px;
   font-size:18px;
 }
`;

const HeaderRight = styled.div`
  >p {
    display: flex;
    align-items: center;
    font-size:14px;
  }
  > p >.MuiSvgIcon-root{
    margin-right:5px;
    font-size:16px;
  }
`;
