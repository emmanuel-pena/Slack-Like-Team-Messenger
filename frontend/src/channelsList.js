// Credit: Material UI

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// Global context
import globalContext from './globalContext';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(-0.0),
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#3F0E40',
    color: 'white',
  },
  nested: {
    marginTop: theme.spacing(-2.0),
    marginLeft: theme.spacing(-3.5),
  },
  nestedAdd: {
    marginTop: theme.spacing(-2.0),
    marginLeft: theme.spacing(-1),
  },
  nestedAddText: {
    marginTop: theme.spacing(-2.0),
    marginLeft: theme.spacing(0.5),
  },
  option: (channel) => ({
    width: 400,
    maxWidth: 400,
    height: 50,
    left: -30,
    padding: 20,
  }),
}));

/**
 *@return{any} nestedList
 */
export default function ChannelsList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [channel, setChan] = React.useState(false);

  // Global Context
  const {setMobileOpen} = React.useContext(globalContext);
  const {currentChannels} = React.useContext(globalContext);
  const {currentWorkspace} = React.useContext(globalContext);
  const {currentAdmins} = React.useContext(globalContext);
  const {addedChannel, setAddedChannel} = React.useContext(globalContext);
  const {setChannel} = React.useContext(globalContext);
  const {clickedDms, setClickedDms} = React.useContext(globalContext);

  const [input, setInput] = React.useState('');
  const [openAddingChannel, setOpenAddingChannel] = React.useState(false);

  const handleChannel2 = (event) => {
    setChannel(event.target.innerText);
    setMobileOpen(false);
    setClickedDms('false');
    console.log('inside channelsClick)');
    console.log(clickedDms);
  };

  const handleClickOpenAddingChannel = () => {
    setOpenAddingChannel(true);
  };

  const handleInputChange = (event) => {
    const currInput = event.target.value;
    setInput(currInput);
  };

  const handleCloseAddingChannel = () => {
    setInput('');
    setOpenAddingChannel(false);
  };

  const createChannel = () => {
    setMobileOpen(false);

    const name = '# ' + input;
    if (name === '') {

    } else {
      const args = {workspacename: currentWorkspace, channelName: name};
      fetch('http://localhost:3010/v0/channelslist', {
        method: 'POST',
        body: JSON.stringify(args),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.status === 409) {
            alert('Could not create channel because channel already exists');
            throw res;
          } else if (!res.ok) {
            throw res;
          }
          console.log('fetched POST channelslist');
          return;
        })
        .catch((err) => {
          console.log(err);
          alert('Error adding channel');
        });
    }

    setAddedChannel(!addedChannel);
    setOpenAddingChannel(false);
  };

  const handleClick = () => {
    setOpen(!open);
  };
  /*
             {Object.values(currentChannels)[0].map((cn) => (
            <ListItem button
              selected={channel === {cn}}
              onClick={handleChannel2}
              className={classes.option}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={cn} />
            </ListItem>
          ))}
   */

  return (
    <>
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary="Channels" />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {currentChannels.map((cn) => (
            <ListItem button
              selected={channel === {cn}}
              onClick={handleChannel2}
              className={classes.option}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={cn} />
            </ListItem>
          ))}
          {currentAdmins.includes(JSON.parse(localStorage.getItem('user')).id) ?
            <ListItem button
              onClick={handleClickOpenAddingChannel}
              className={classes.option}>
              <ListItemIcon>
              </ListItemIcon>
              <AddBoxOutlinedIcon className={classes.nestedAdd} />
              <ListItemText
                className={classes.nestedAddText} primary="Add Channel" />
            </ListItem> :<></>
            }
        </List>
      </Collapse>
    </List>

      <div style={{backgroundColor: '#F6CDFF'}}>
      <Dialog open={openAddingChannel} onClose={handleCloseAddingChannel}>
        <DialogTitle style={{color: '#3F0E40'}}>Enter name of channel to create</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Channel name"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddingChannel} variant='contained' style={{backgroundColor: '#3F0E40'}}>Cancel</Button>
          <Button onClick={createChannel} variant='contained' style={{backgroundColor: '#3F0E40'}}>Ceate</Button>
        </DialogActions>
      </Dialog>
      </div>
      </>
  );
}
