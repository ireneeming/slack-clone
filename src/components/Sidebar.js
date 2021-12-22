import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import {db} from '../firebase';

import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import SidebarOption from './SidebarOption';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';


function Sidebar() {
  const [channels, loading,error] = useCollection(db.collection("room"));
  console.log(channels, loading,error)

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SIdebarInfo>
          <h2>SIDE BAR</h2>
          <h3>
            <FiberManualRecordIcon/>
              name
          </h3>
        </SIdebarInfo>
        <CreateIcon/>
      </SidebarHeader>
      <SidebarOption Icon={InsertCommentIcon} title="Threads"/>
      <SidebarOption Icon={InboxIcon} title="Threads"/>
      <SidebarOption Icon={DraftsIcon} title="Threads"/>
      <SidebarOption Icon={BookmarkBorderIcon} title="Threads"/>
      <SidebarOption Icon={PeopleAltIcon} title="Threads"/>
      <SidebarOption Icon={AppsIcon} title="Threads"/>
      <SidebarOption Icon={FileCopyIcon} title="Threads"/>
      <SidebarOption Icon={ExpandLessIcon} title="Threads"/> 
      <hr/>
      <SidebarOption Icon={ExpandMoreIcon} title="Channels"/> 
      <hr/>
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel"/> 
     

      {channels?.docs.map((doc) =>(
        <SidebarOption key={doc.id} id={doc.id} title ={doc.data().name}/>
      ))}
    </SidebarContainer>
  )
}

export default Sidebar;

const SidebarContainer = styled.div`
  color:white;
  background-color: var(--slack-color);
  flex:0.3;
  max-width:260px;
  margin-top: 60px;
  border-top: 1px solid #49274b;

  >hr {
    margin-top:10px;
    margin-bottom:10px;
    border:1px solid #49274b;
  }

`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom:1px solid #49274b;
  padding:13px;
  >.MuiSvgIcon-root {
    padding:8px;
    color:#49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 50%;
  }
`;

const SIdebarInfo = styled.div`
  flex:1;
  >h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }
  >h3 {
    display: flex;
    font-size:13px;
    font-weight: 400;
    align-items: center;
  }
  >h3>.MuiSvgIcon-root{
    font-size:14px;
    margin-top:1px;
    margin-right:2px;
    color:green;
  }
`;