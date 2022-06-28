import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import debounce from 'lodash.debounce';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import {Divider} from '@mui/material';

// Global context
import globalContext from './globalContext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(-2.0),
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#3F0E40',
    color: 'white',
  },
  nested: {
    marginLeft: theme.spacing(-3.5),
  },
  nestedAdd: {
    marginLeft: theme.spacing(3.5),
  },
  nestedAddText: {
    marginLeft: theme.spacing(0.5),
  },
  suggestions: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  active: {
    backgroundColor: '#F9FC7D',
  },
}));

/**
 *@return{any} nestedList
 */
export default function DmsList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [openMessageNew, setOpenMessageNew] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState('');
  console.log('I am inside DmsList!!');
  // Global Context
  const {setMobileOpen} = React.useContext(globalContext);
  const {currentDmdWith} = React.useContext(globalContext);
  const {setChannel} = React.useContext(globalContext);
  const {clickedDms, setClickedDms} = React.useContext(globalContext);
  const {setClickedUserId} = React.useContext(globalContext);
  const {currentWorkspace} = React.useContext(globalContext);
  const {updatedDmsList, setUpdatedDmsList} = React.useContext(globalContext);

  const handleClickUser = (event) => {
    setMobileOpen(false);
    setClickedDms('true');
    setChannel(event.target.innerText);
    setClickedUserId(event.currentTarget.id);
    console.log(clickedDms);
  };

  const handleClickAdd = () => {
    setMobileOpen(false);
    setOpenMessageNew(true);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSelect = (suggestion) => {
    const obj = suggestion.suggestion;

    const name = obj.name;
    const idOfSelected = obj.id;

    setSuggestions([]);
    setValue(name);

    const args = {id: JSON.parse(localStorage.getItem('user')).id, idWith: idOfSelected, ws: currentWorkspace};

    console.log(args);

    fetch('http://localhost:3010/v0/dmdusers', {
      method: 'POST',
      body: JSON.stringify(args),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 409) {
          alert('Dms already exist!');
          throw res;
        }
        if (res.status !== 201) {
          throw res;
        }
        console.log('fetched post dmdusers');
        setUpdatedDmsList(!updatedDmsList);
        setValue('');
        handleCloseMessageNew();
        return;
      })
      .catch((err) => {
        console.log(err);
        alert('Error creating new Dms');
      });

    setSuggestionsActive(false);
  };

  const handleCloseMessageNew = () => {
    setOpenMessageNew(false);
  };

  const handleSuggest = (currInput) => {
    if (currInput.length > 0) {
      const param1 = currentWorkspace;
      const param2 = currInput;
      const param3 = JSON.parse(localStorage.getItem('user')).id;
      console.log('here');
      fetch(`http://localhost:3010/v0/searchedusers?ws=${param1}&query=${param2}&id=${param3}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setSuggestions(json);
          console.log(suggestions);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setSuggestionsActive(false);
      setSuggestions([]);
    }
  };

  const handleInputChange = (event) => {
    const currInput = event.target.value;

    setValue(currInput);
    setSuggestionsActive(true);
    const debouncedSuggestions = debounce(() => handleSuggest(currInput), 400);
    debouncedSuggestions();
  };

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    } else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    } else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    return (
      <ul className={classes.suggestions}>
        {suggestions.map((suggestion, index) => {
          return (
            <>
            <li
                style={{cursor: 'pointer'}}
                className={index === suggestionIndex ? classes.active : ''}
                key={index}
                onClick={() => {
                  handleSelect({suggestion});
                }}
            >
                <span>{suggestion.name}</span> <span style={{color: '#939393'}}>#{suggestion.id}</span>
            </li>
              <Divider />
            </>
          );
        })}
        </ul>
    );
  };

  return (
    <>
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button
        onClick={handleClick}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary="Direct Messages" />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.nested}>
          {currentDmdWith.map((user) => (
            <ListItem button id={user.id} onClick={handleClickUser}>
              <ListItemIcon id={user.id}>
              </ListItemIcon>
              <PersonIcon id={user.id} color='white'/>
              <ListItemText id={user.id} primary={user.name} />
            </ListItem>
          ))}
          <ListItem button
            onClick={handleClickAdd}
            className={classes.nested}>
            <ListItemIcon>
            </ListItemIcon>
            <AddBoxOutlinedIcon className={classes.nestedAdd}/>
            <ListItemText
              className={classes.nestedAddText} primary="New Person" />
          </ListItem>
        </List>
      </Collapse>
      </List>

      <div style={{backgroundColor: '#F6CDFF'}}>
        <Dialog open={openMessageNew} onClose={handleCloseMessageNew}>
          <DialogTitle style={{color: '#3F0E40'}}>Enter name of person to message</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="New message"
              fullWidth
              variant="filled"
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              InputProps={{
                startAdornment: <InputAdornment position="start">to: </InputAdornment>,
              }}
            />
            {suggestionsActive? <Suggestions /> : <></>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMessageNew} variant='contained' style={{backgroundColor: '#3F0E40'}}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
      </>
  );
}

