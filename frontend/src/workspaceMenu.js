import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 *@return{any} menu
 */
export default function MenuListWS() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [openAdding, setOpenAdding] = React.useState(false);
  const [openNewName, setOpenNewName] = React.useState(false);
  const [openExistingName, setOpenExistingName] = React.useState(false);
  const [input, setInput] = React.useState('');

  console.log('I am inside workspace Menu!');

  const workspaces = userObj.workspaces;
  // Global Context
  const {setWorkspace} = React.useContext(globalContext);
  const {setChannel} = React.useContext(globalContext);
  const {setClickedDms} = React.useContext(globalContext);

  const handleAddWorkspace = () => {
    setOpenAdding(true);
  };

  const handleCloseAdding = () => {
    setOpenAdding(false);
  };

  const handleClickOpenNewName = () => {
    setOpenNewName(true);
  };

  const handleCloseNewName = () => {
    setInput('');
    setOpenNewName(false);
  };

  const handleClickOpenExistingName = () => {
    setOpenExistingName(true);
  };

  const handleCloseExistingName = () => {
    setInput('');
    setOpenExistingName(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleSelectWorkspace = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setWorkspace(event.target.innerText);
    setChannel('# General');
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

  const handleInputChange = (event) => {
    const currInput = event.target.value;
    setInput(currInput);
  };

  const addExistingWorkspace = () => {
    const name = input;
    if (name === '') {

    } else {
      const id = userObj.id;

      if ((userObj.workspaces).includes(name)) {
        alert('Already in workspace');
      } else {
        const args = {workspacename: name, id: id};
        console.log(args);

        fetch('http://localhost:3010/v0/userworkspaces', {
          method: 'PUT',
          body: JSON.stringify(args),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            if (res.status === 404) {
              alert('Workspace not found');
              throw res;
            } else if (!res.ok) {
              throw res;
            }
            console.log('fetched put workspaceslist');
            (userObj.workspaces).push(name);
            console.log(userObj.workspaces);
            localStorage.setItem('user', JSON.stringify(userObj));
            return;
          })
          .catch((err) => {
            console.log(err);
            alert('Error joining workspace');
          });
      }
    }

    setOpenExistingName(false);
  };

  const addNewWorkspace = () => {
    const name = input;
    if (name === '') {

    } else {
      const admins = [];
      admins.push(userObj.id);

      console.log(admins);
      const args = {workspacename: name, admins: admins};
      console.log(args);

      fetch('http://localhost:3010/v0/workspaceslist', {
        method: 'POST',
        body: JSON.stringify(args),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.status === 409) {
            alert('Workspace already exists!');
            throw res;
          }
          if (res.status !== 201) {
            throw res;
          }
          console.log('fetched post workspaceslist');
          (userObj.workspaces).push(name);
          console.log(userObj.workspaces);
          localStorage.setItem('user', JSON.stringify(userObj));
          return;
        })
        .catch((err) => {
          console.log(err);
          alert('Error creating workspace');
        });
    }

    setOpenNewName(false);
  };

  return (
    <>
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
                      <Button style={{width: '238px', textAlign: 'center', backgroundColor: '#3F0E40'}}
                        onClick={handleAddWorkspace}
                        variant='contained' endIcon={<AddIcon />}>
                        Add new workspace
                      </Button>
                      {workspaces.map((ws) => (
                        <MenuItem onClick={handleSelectWorkspace}>{ws}</MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>

      <div>
        <Dialog
          fullScreen
          open={openAdding}
          onClose={handleCloseAdding}
          TransitionComponent={Transition}
        >
          <AppBar sx={{backgroundColor: '#3F0E40', position: 'relative'}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseAdding}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                Adding a workspace
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button onClick={handleClickOpenExistingName}>
              <ListItemText primary="Add an existing workspace" />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleClickOpenNewName}>
              <ListItemText
                primary="Create new workspace"
              />
            </ListItem>
            <Divider />
          </List>
        </Dialog>
      </div>

      <div style={{backgroundColor: '#F6CDFF'}}>
        <Dialog open={openExistingName} onClose={handleCloseExistingName}>
          <DialogTitle style={{color: '#3F0E40'}}>Enter name of workspace to join</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Workspace name"
              fullWidth
              variant="standard"
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseExistingName} variant='contained' style={{backgroundColor: '#3F0E40'}}>Cancel</Button>
            <Button onClick={addExistingWorkspace} variant='contained' style={{backgroundColor: '#3F0E40'}}>Join</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div style={{backgroundColor: '#F6CDFF'}}>
        <Dialog open={openNewName} onClose={handleCloseNewName}>
          <DialogTitle style={{color: '#3F0E40'}}>Enter name of workspace to create</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Workspace name"
              fullWidth
              variant="standard"
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNewName} variant='contained' style={{backgroundColor: '#3F0E40'}}>Cancel</Button>
            <Button onClick={addNewWorkspace} variant='contained' style={{backgroundColor: '#3F0E40'}}>Ceate</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
// source: https://material-ui.com/components/menus/
