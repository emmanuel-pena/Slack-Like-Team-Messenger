import React, {useEffect} from 'react';
import ResponsiveDrawer from './drawer';
import Login from './Login';
import Signup from './Signup';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import Emoji from './Emoji';
// // testing git push
// /**
//  * Simple component with no state.
//  *
//  * @param {function} setDummy set the dummy state
// */
// function getDummy(setDummy) {
// fetch('http://localhost:3010/v0/dummy')
// .then((response) => {
// if (!response.ok) {
// throw response;
// }
// return response.json();
// })
// .then((json) => {
// setDummy(json.message);
// })
// .catch((error) => {
// setDummy(error.toString());
// });
// }

import {GlobalProvider} from './globalContext';
/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
const ws = new WebSocket('ws://localhost:8082');

function App() {
// const [dummy, setDummy] = React.useState('Click the button!');
// const [emoji, setEmoji] = React.useState(false);
// const [chatLog, setChat] = React.useState({});
//  const temp = userInfo;
//  setInfo(temp);
  const [updateChatlog, setUpdateChatlog] = React.useState(false);
  const [updateDms, setUpdateDms] = React.useState(false);
  const [updateWorkspaces, setUpdateWorkspaces] = React.useState(false);
  const [updatedDmsList, setUpdatedDmsList] = React.useState(false);
  const [newLogin, setNewLogin] = React.useState(false);
  const [show, setShow] = React.useState(true);
  const [currentWorkspace, setWorkspace] = React.useState('No Workspace Joined');
  const [currentChannels, setChannels] = React.useState([]);
  const [currentAdmins, setAdmins] = React.useState([]);
  const [currentChannel, setChannel] =
    React.useState('# General');
  const [currentChatlog, setChatlog] =
    React.useState([]);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentDmdWith, setDmdWith] = React.useState([]);
  const [clickedDms, setClickedDms] = React.useState('false');
  const [clickedUserId, setClickedUserId] = React.useState('');
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [userStatus, setUserStatus] = React.useState('Active');
  const [addedChannel, setAddedChannel] = React.useState(false);
  const [userName] = React.useState('PLACEHOLDER_USER');

  useEffect(() => {
    ws.addEventListener('message', function(event) {
      console.log(event.data);
      if (event.data === 'chatlog updated') {
        setUpdateChatlog(!updateChatlog);
      } else if (event.data === 'dmsList updated') {
        setUpdateDms(!updateDms);
      }
    });
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signup">
          <Signup/>
        </Route>

        <GlobalProvider value={{
          show, setShow, updateChatlog, setUpdateChatlog,
          newLogin, setNewLogin, currentChatlog,
          mobileOpen, updatedDmsList, setUpdatedDmsList,
          setMobileOpen, currentChannels, currentDmdWith,
          setChannel, setDmdWith, currentAdmins, setAdmins,
          clickedUserId, setClickedUserId, setChannels,
          currentWorkspace, setWorkspace, settingsOpen,
          setSettingsOpen, userStatus, setUserStatus, userName,
          currentChannel, clickedDms, setClickedDms,
          setChatlog, addedChannel, setAddedChannel,
          updateDms, setUpdateDms,
        }}>
          <Route exact path="/home">
            <ResponsiveDrawer/>
          </Route>

          <Route exact path="/">
            <Login/>
          </Route>
        </GlobalProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
