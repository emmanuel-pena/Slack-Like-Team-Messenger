import React from 'react';
import ResponsiveDrawer from './drawer';
import Login from './Login';
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


/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
// const [dummy, setDummy] = React.useState('Click the button!');
// const [emoji, setEmoji] = React.useState(false);
// const [chatLog, setChat] = React.useState({});
//  const temp = userInfo;
//  setInfo(temp);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" exact>
          <ResponsiveDrawer />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
