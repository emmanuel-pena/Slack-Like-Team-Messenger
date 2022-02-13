import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import {makeStyles} from '@material-ui/core/styles';
import {useEffect} from 'react';
import globalContext from './globalContext';
import {StyledPaper} from './chatbox.styles.js';
import {useRef} from 'react';

const useStyles = makeStyles((theme) => ({
  placeholder: {
    color: 'black',
    fontSize: 'large',
  },
  placeholder: {
    color: 'black',
    fontSize: 'large',
  },
  placeholder: {
    color: 'black',
    fontSize: 'large',
  },
}));


export default function Chatbox() {
  const classes = useStyles();
  const [currentInput, setCurrentInput] = React.useState('');
  const {currentWorkspace} = React.useContext(globalContext);
  const {currentChannel} = React.useContext(globalContext);
  const {clickedDms} = React.useContext(globalContext);
  const {clickedUserId} = React.useContext(globalContext);
  const {setChatlog} = React.useContext(globalContext);

  const [placeholder, setPlaceholder] =
    React.useState('Message ' + Object.values({currentChannel})[0]);

  useEffect(() => {
    setPlaceholder('Message ' + Object.values({currentChannel})[0]);
  }, [currentChannel]);

  const userObj = JSON.parse(localStorage.getItem('user'));

  const inputElement = React.useRef(null);

  const getChatlog = () => {
    try {
      console.log(clickedDms);
      if (clickedDms === 'false') {
        let param1 = Object.values({currentWorkspace})[0];
        param1 = param1.replace(/\s{1}/g, '%20');
        param1 = param1.replace(/#/g, '%23');
        param1 = param1.replace(/!/g, '%21');

        let param2 = Object.values({currentChannel})[0];
        param2 = param2.replace(/\s{1}/g, '%20');
        param2 = param2.replace(/#/g, '%23');
        param2 = param2.replace(/!/g, '%21');

        fetch(`http://localhost:3010/v0/channelschat?ws=${param1}&cn=${param2}`)
          .then((results) => {
            if (!results.ok) {
              throw results;
            }
            return results.json();
          })
          .then((json) => {
            setChatlog(json);
          });
      } else if (clickedDms === 'true') {
        console.log('fetching dms!!!');
        const param1 = userObj.id;
        const param2 = Object.values({clickedUserId})[0];

        let param3 = Object.values({currentWorkspace})[0];
        param3 = param3.replace(/\s{1}/g, '%20');
        param3 = param3.replace(/#/g, '%23');
        param3 = param3.replace(/!/g, '%21');

        fetch(`http://localhost:3010/v0/dmschat?id=${param1}&idWith=${param2}&ws=${param3}`)
          .then((results) => {
            if (!results.ok) {
              throw results;
            }
            return results.json();
          })
          .then((json) => {
            setChatlog(json);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const pushToChatlog = () => {
    try {
      console.log('inside pushToChatLog)');
      console.log(clickedDms);
      if (Object.values({clickedDms})[0] === 'false') {
        console.log('pushing to channels!!');

        const param1 = parseInt(userObj.id);

        const param2 = Object.values({currentWorkspace})[0];

        const param3 = Object.values({currentChannel})[0];

        const param4 = currentInput;

        const args = {id: param1, ws: param2, cn: param3, content: param4};
        console.log(args);

          fetch('http://localhost:3010/v0/channelschat', {
            method: 'POST',
            body: JSON.stringify(args),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {
              if (!res.ok) {
                throw res;
              }
              console.log('fetched post channels');
              getChatlog();
              return;
            })
            .catch((err) => {
              console.log(err);
              alert('Error pushing to channels chat');
            });
      } else if (Object.values({clickedDms})[0] === 'true') {
        console.log('pushing to dms!!!');

        const param1 = parseInt(userObj.id);

        const param2 = parseInt(Object.values({clickedUserId})[0]);

        const param3 = Object.values({currentWorkspace})[0];

        const param4 = currentInput;

        const args = {id: param1, idWith: param2, ws: param3, content: param4};
        console.log(args);

        fetch('http://localhost:3010/v0/dmschat', {
          method: 'POST',
          body: JSON.stringify(args),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw res;
            }
            console.log('fetched post dms');
            getChatlog();
            return;
          })
          .catch((err) => {
            console.log(err);
            alert('Error pushing to dms chat');
          });
      }
    } catch (e) {

    }
  };

  const handleInputChange = (event) => {
    setCurrentInput(event.target.value);
    console.log(currentInput);
  };

  const handleKeypress = (event) => {
    event.preventDefault();
    inputElement.current.click();
    if (event.keyCode === 13) {
      console.log('You clicked submit.');
      pushToChatlog();
    }
  };

  return (
    <StyledPaper
      component="form"
      onSubmit={handleKeypress}
      sx={{
        p: '4px 8px', display: 'flex', alignItems: 'center',
        flexShrink: 1, width: 1670}}>
      <InputBase
        sx={{ml: 4, flex: 1}}
        placeholder={placeholder}
        inputProps={{'aria-label': 'chatbox'}}
        className={classes.placeholder}
        onChange={handleInputChange}
        onSubmit={handleKeypress}
      />
      <Divider sx={{height: 48, m: 0.5}} orientation="vertical" />
      <IconButton sx={{p: '25px'}} aria-label="send"
        ref={inputElement}
        onSubmit={handleKeypress} onClick={pushToChatlog}>
        <SendIcon/>
      </IconButton>
    </StyledPaper>
  );
}
