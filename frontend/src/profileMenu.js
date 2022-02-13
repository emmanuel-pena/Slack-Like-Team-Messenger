import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {makeStyles} from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useHistory} from 'react-router-dom';

// Global Context
import globalContext from './globalContext';

const useStyles = makeStyles((theme) => ({
  userPic: {
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(3),
      width: 0,
      borderRadius: 0,
      display: 'none',
      fontsize: 'large',
    },
  },
  settingSmall: {
    color: 'black',
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(3),
      width: 0,
      borderRadius: 0,
      display: 'none',
      fontsize: 'large',
    },
  },
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

/**
 *@return{any} menu
 */
export default function MenuListProfile() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const {setSettingsOpen} = React.useContext(globalContext);
  const history = useHistory();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleCloseProfile = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setSettingsOpen(true);
    setOpen(false);
  };
  const handleLogOut = () => {
    history.push('/');
  };

  /**
  *@param{event} event desc
  */
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <AccountCircleIcon fontSize="large" className={classes.userPic}/>
        </IconButton>
        <Popper open={open} anchorEl={anchorRef.current}
          role={undefined} transition disablePortal>
          {({TransitionProps, placement}) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ?
                  'center top' : 'center bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow"
                    className={classes.settingSmall}
                    onKeyDown={handleListKeyDown}>
                    <MenuItem
                      onClick={handleCloseProfile}>My Profile</MenuItem>
                    <MenuItem
                      onClick={handleLogOut}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
// source: https://material-ui.com/components/menus/
