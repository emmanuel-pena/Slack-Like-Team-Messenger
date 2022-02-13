// CREDIT: Material UI
// Dialogs
// https://material-ui.com/components/dialogs/
// Text fields: https://material-ui.com/components/text-fields/
import React, {useState, Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
// import AlertDialog from './alert';
import Divider from '@material-ui/core/Divider';
import {useHistory} from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// global context
import globalContext from './globalContext';

// CREDIT: Status Indicators
// https://codepen.io/tbugai/pen/GJojI

import Avatars from './avatars';
import {Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 500,
    position: 'relative',
    backgroundColor: '#3F0E40',
    height: 40,
  },
  title: {
    zIndex: 500,
    marginLeft: theme.spacing(0),
    flex: 1,
  },
  close: {
    top: -65,
    left: -5,
    position: 'relative',
  },
  userName: {
    top: -45,
    right: -70,
    position: 'relative',
  },
  status: {
    top: -45,
    right: -70,
    position: 'relative',
  },
  updateStatus: {
    top: -1,
    right: -10,
    position: 'relative',
    height: 20,
    width: 355,
  },
  statusToggle: {
    top: 35,
    left: -55,
    width: 300,
    position: 'relative',
  },
  divider: {
    top: 35,
    left: -55,
    width: 9999,
    position: 'relative',
  },
  signOut: {
    paddingTop: 5,
    top: 35,
    left: -15,
    width: 300,
    position: 'relative',
  },
  statusActive: {
    top: 70,
    left: 45,
    margin: '25px',
    backgroundColor: '#94E185',
    borderColor: '#78D965',
    boxShadow: '0px 0px 4px 1px #94E185',
    position: 'fixed',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
/**
 * @param {*} props name of user
 * @return {*}
 */
function Settings(props) {
  const classes = useStyles();

  // Global Context
  const {settingsOpen, setSettingsOpen} = React.useContext(globalContext);
  const {userStatus, setUserStatus} = React.useContext(globalContext);
  const {userName} = React.useContext(globalContext);
  const [status, setStatus] = useState('update your status');
  const history = useHistory();

  const handleClose = () => {
    setSettingsOpen(false);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const toggleStatus = () => {
    if (userStatus === ('Active')) {
      setUserStatus('Away');
    }
  };

  const handleLogout = () => {
    history.push('/');
  };

  return (
    <Fragment>
      <Dialog fullScreen open={settingsOpen}
        onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar />
          <Toolbar>
            <IconButton className={classes.close}
              onClick={handleClose} edge="start"
              color="inherit" aria-label="close">
              <ArrowBackIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Avatars/>
        <div className={classes.userName}>{userName}</div>
        <div className={classes.statusActive}><li>{userStatus}</li></div>
        <TextField
          label= {status}
          onChange={handleChange}
          variant="outlined"
          className={classes.updateStatus}
        />
        <Button
          onClick={toggleStatus}
          className={classes.statusToggle}>Set yourself as AWAY</Button>
        <Divider className={classes.divider}/>
        <Button
          onClick={handleLogout}
          className={classes.signOut}>Sign out of CSE183 Summer 2021</Button>
      </Dialog>
    </Fragment>
  );
}

Settings.propTypes = {
  onSubmit: PropTypes,
};

export default Settings;
