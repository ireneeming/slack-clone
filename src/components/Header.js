import React from 'react';
import styled from "styled-components";
import {Avatar} from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Header() {
  const [user] = useAuthState(auth);
  // console.lot("user is", user)
  return (
    <div>
      <HeaderContainer>
        <HeaderLeft>
          <HeaderAvatar 
            onClick={()=>{auth.signOut()}}
            alt ={user?.displayName}
            src={user?.photoURL}
          />
         {/* //TODO: AccessTiemeIcon 필요 */}
         <AccessTimeIcon></AccessTimeIcon>
        </HeaderLeft>

        <HeaderSearch>
         <SearchIcon/>
         <input type="text" placeholder="Search CLONESLACK"/>
        </HeaderSearch>

        <HeaderRight>
          <HelpOutlineIcon/>
        </HeaderRight>


      </HeaderContainer>
    </div>
  )
}

export default Header;

const HeaderRight = styled.div`
  flex:0.3;
  display:flex;
  align-items: flex-end;
  >.MuiSvgIcon-root{
    margin-left:auto;
    margin-right:20px;
  }
`;

const HeaderSearch = styled.div`
  flex:0.4;
  opacity:1;
  border-radius: 6px;
  background-color:#421f44;
  text-align: center;
  display: flex;
  padding:0 50px;
  color: gray;
  border:1px solid gray;
  > input {
    background-color: transparent;
    border:none;
    text-align: center;
    min-width:30vw;
    outline:none;
    color:#fff;
  }
`;

const HeaderContainer = styled.div`
  display:flex;
  position:fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding:10px 0;
  background-color:var(--slack-color);
  color:#fff;

`;

const HeaderLeft = styled.div`
  flex:0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root{
    margin-left:auto;
    margin-right:30px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor:pointer;

  :hover{
    opacity:0.8;
  }
`;

