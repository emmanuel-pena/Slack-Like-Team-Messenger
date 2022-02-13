// Credit: Material-UI
// https://material-ui.com/components/bottom-navigation/


import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import Settings from './settings';

// Global context
import globalContext from './globalContext';

const useStyles = makeStyles({
  root: {
    zIndex: 500,
    flexGrow: 1,
    width: 375,
    position: 'fixed',
    bottom: 0,
    left: 0,
  },
  searchBarIcon: {
    zIndex: 500,
    width: '100%',
    position: 'fixed',
    top: 0,
    bottom: 490,
    left: 10,
  },
  searchBar: {
    zIndex: 500,
    width: '100%',
    position: 'fixed',
    top: 75,
    left: 40,
    bottom: 300,
  },
});

/**
 *
 * @return {*} obj
 */
export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const [homeOpen, setHomeOpen] = React.useState(false);
  const [DMsOpen, setDMsOpen] = React.useState(false);
  const [mentionsOpen, setMentionsOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  // Global Context
  const {settingsOpen, setSettingsOpen} = React.useContext(globalContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleHomeToggle = () => {
    if (!homeOpen) {
      setHomeOpen(!homeOpen);
    }
    setDMsOpen(false);
    setMentionsOpen(false);
    setSearchOpen(false);
    setSettingsOpen(false);
  };
  const handleDMsToggle = () => {
    if (!DMsOpen) {
      setDMsOpen(!DMsOpen);
    }
    setHomeOpen(false);
    setMentionsOpen(false);
    setSearchOpen(false);
    setSettingsOpen(false);
  };
  const handleMentionsToggle = () => {
    if (!mentionsOpen) {
      setMentionsOpen(!mentionsOpen);
    }
    setHomeOpen(false);
    setDMsOpen(false);
    setSearchOpen(false);
    setSettingsOpen(false);
  };
  const handleSearchToggle = () => {
    if (!searchOpen) {
      setSearchOpen(!searchOpen);
    }
    setHomeOpen(false);
    setDMsOpen(false);
    setMentionsOpen(false);
    setSettingsOpen(false);
  };
  const handleSettingsToggle = () => {
    if (!settingsOpen) {
      setSettingsOpen(!settingsOpen);
      setSettingsOpen(true);
    }
    setHomeOpen(false);
    setDMsOpen(false);
    setMentionsOpen(false);
    setSearchOpen(false);
  };

  return (
    <div>
      <Settings/>
      <BottomNavigation value={value}
        onChange={handleChange} className={classes.root}>
        <BottomNavigationAction onClick={handleHomeToggle}
          icon={<HomeIcon />} />
        <BottomNavigationAction onClick={handleDMsToggle}
          icon={<ForumIcon />} />
        <BottomNavigationAction onClick={handleMentionsToggle}
          icon={<AlternateEmailIcon />} />
        <BottomNavigationAction onClick={handleSearchToggle}
          icon={<SearchIcon />} />
        <BottomNavigationAction onClick={handleSettingsToggle}
          icon={<PersonIcon />} />
      </BottomNavigation>
    </div>
  );
}
