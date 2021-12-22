import React from 'react';
import styled from 'styled-components';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {selectRoomId} from "../features/appSlice";
import { useSelector } from 'react-redux';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

import Message from './Message';

import ChatInput from './ChatInput';
import { db } from '../firebase';

function Chat() {

  const chatRef = React.useRef(null);

  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("room").doc(roomId)
  );
  const [roomMessages, loading] = useDocument(
    roomId && 
    db.collection("room").doc(roomId).collection("Messages").orderBy("timestamp", "asc")
  );
// 새로고침 했을 때 최신 메시지가 바로 보이도록 하기
  React.useEffect(()=>{
    chatRef?.current?.scrollIntoView();
  },[roomId, loading]);

  return (
    <ChatContainer>

      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong> 
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
    
          {
            roomMessages?.docs.map(doc=>{
              const {message, timestamp, user, userImage} = doc.data();
              
              return(
                <Message
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
                />
              );
            })
          }
          <ChatBottom ref={chatRef}/>
    
    
          </ChatMessages>
          <ChatInput 
            //channelName
            chatRef={chatRef}
            channelName = {roomDetails?.data().name}
            channelId={roomId}
          />
    
        </>
      )}

    </ChatContainer>
  )
}

export default Chat;

const ChatBottom = styled.div`
padding-bottom:200px;`;

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
