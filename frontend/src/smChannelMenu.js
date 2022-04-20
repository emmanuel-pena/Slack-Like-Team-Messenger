import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {makeStyles} from '@material-ui/core/styles';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';

// global context
import globalContext from './globalContext';

const useStyles = makeStyles((theme) => ({
  userPic: {
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

const userObj = JSON.parse(localStorage.getItem('user'));

/**
 *@return{any} menu
 */
export default function MenuListWS() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  console.log('I am inside workspace Menu!');

  const workspaces = userObj.workspaces;
  // Global Context
  const {setWorkspace} = React.useContext(globalContext);
  const {setChannel} = React.useContext(globalContext);
  const {setClickedDms} = React.useContext(globalContext);
  const {currentChannels} = React.useContext(globalContext);
  const {setMobileOpen} = React.useContext(globalContext);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleClose2 = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setChannel(event.target.innerText);
    setMobileOpen(false);
    setClickedDms('false');
    setOpen(false);
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
          <ArrowDropDownCircleIcon fontSize="large" style={{fill: 'white'}} />
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
                    onKeyDown={handleListKeyDown}>
                    {currentChannels.map((cn) => (
                      <MenuItem onClick={handleClose2}>{cn}</MenuItem>
                    ))}
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
