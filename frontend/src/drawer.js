import React, {useEffect} from 'react';
import {alpha, makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MenuListProfile from './profileMenu';
import MenuListWS from './workspaceMenu';
import MenuListCH from './smChannelMenu';
import QuestionAnswerTwoToneIcon
  from '@material-ui/icons/QuestionAnswerTwoTone';
import ChannelsList from './channelsList';
import DmsList from './dmsList';
import MenuIcon from '@material-ui/icons/Menu';
import LabelBottomNavigation from './bottomNavBar';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Chatbox from './chatbox';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import {Typography} from '@mui/material';
import {Divider} from '@mui/material';

// global context
import {GlobalProvider} from './globalContext';

const drawerWidth = 240;
// soruce: https://material-ui.com/components/drawers/

const useStyles = makeStyles((theme) => ({
  DMSnMentionsText: {
    color: 'white',
    top: 5,
    marginRight: theme.spacing(-3),
  },
  roott: {
    width: '500px',
    backgroundColor: theme.palette.background.paper,
  },
  sidebarIcons: {
    color: 'white',
    width: '30px',
  },
  sideIconsMargin: {
    marginTop: theme.spacing(-3),
    height: 30,
  },
  main: {

  },
  container: {

  },
  inner1: {
    right: 0,
    left: drawerWidth - 5,
    position: 'fixed',
    bottom: 88,
    [theme.breakpoints.between('sm', 'sm')]: {
      marginLeft: 0,
      left: 0,
      width: '100%',
    },
    [theme.breakpoints.between('xs', 'xs')]: {
      marginLeft: 0,
      left: 0,
      bottom: 156,
      width: '100%',
    },
  },
  beginnings: {
    textAlign: 'center',
    fontSize: 42,
    marginBottom: 120,
    [theme.breakpoints.between('xs', 'xs')]: {
      fontSize: 20,
    },
  },
  channelMenuSm: {
    display: 'none',
    [theme.breakpoints.between('xs', 'xs')]: {
    display: 'flex',
      left: 130,
      fontSize: 10,
    },
  },
  wsMenuSm: {
    display: 'none',
    [theme.breakpoints.between('xs', 'xs')]: {
      display: 'flex',
      left: 115,
      fontSize: 2,
    },
  },
  inner2: {
    display: 'flex',
    bottom: 0,
    position: 'fixed',
    right: 0,
    left: drawerWidth - 5,
    boxShadow: 'none',
    borderRadius: '0px',
    [theme.breakpoints.between('sm', 'sm')]: {
      marginLeft: 0,
      left: 0,
      width: '100%',
    },
    [theme.breakpoints.between('xs', 'xs')]: {
      marginLeft: 0,
      left: 0,
      bottom: 78,
      width: '100%',
    },
  },
  search: {
    'position': 'relative',
    'borderRadius': theme.shape.borderRadius,
    'marginRight': theme.spacing(19),
    'backgroundColor': alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      bordercolor: alpha(theme.palette.common.white, 0.25),
      borderStyle: 'solid',
    },
    'width': '110%',
    [theme.breakpoints.down('xs')]: {
      width: 0,
      borderRadius: 0,
      display: 'none',
    },
  },
  userIconTopCorner: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(3),
      width: 0,
      borderRadius: 0,
      display: 'flex',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xl')]: {
      width: '10ch',
    },
  },
  back: {
    display: 'flex',
  },
  drawer: {
    zIndex: 1,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // CREDIT: Fixing Drawer overlay to be below appbar
  // https://stackoverflow.com/questions/46706676/clipped-drawer-in-material-ui
  // zIndex: needs to be higher than component it needs to be over
  appBar: {
    zIndex: 50,
    backgroundColor: '#3F0E40',
    height: '10%',
    marginTop: theme.spacing(-1),
  },
  menuButton: {
    left: 175,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    fontSize: 'medium',
  },
  // This is what I was playing with to figure out the
  // MEDIUM screen size button popping up.
  // The med size button can be gotten from:
  // import MenuIcon from '@material-ui/icons/Menu';
  // Should probably be placed next to the "workspace
  // name will go here" div/span
  menuButtonMed: {
    display: 'none',
    [theme.breakpoints.between('lg', 'xl')]: {
      display: 'flex',
    },
    marginLeft: theme.spacing(-1.4),
    fontSize: 'large',
    color: 'white',
  },
  menuButtonSm: {
    display: 'none',
    [theme.breakpoints.between('sm', 'sm')]: {
      display: 'flex',
    },
    marginLeft: theme.spacing(-1.4),
    fontSize: 'large',
    color: 'white',
  },
  menuButtonDesktop: {
    marginLeft: theme.spacing(22),
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
    size: 'small',
    fontSize: 'small',
  },
  workspaceName: {
    width: '22%',
    whiteSpace: 'nowrap',
    fontSize: 'large',
    marginLeft: theme.spacing(-2),
    [theme.breakpoints.down('xs')]: {
      padding: '1px',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    zIndex: 1,
    paddingTop: theme.spacing(3.6),
    width: drawerWidth,
    backgroundColor: '#3F0E40',
    marginLeft: theme.spacing(-1.8),
  },
  option: (selectedListItem) => ({
    width: 400,
    maxWidth: 400,
    height: 50,
    left: -30,
    backgroundColor: selectedListItem.isSelected ? '#3f51b5' : '#3f51b5',
    padding: 20,
  }),
}));
// source: https://material-ui.com/components/drawers/

const userObj = JSON.parse(localStorage.getItem('user'));
const today = new Date();

const months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

/**
 *
 * @param {any} props
 * @return {any} drawer
 */
export default function ResponsiveDrawer(props) {
  const {window} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedListItem, setSelectedItem] = React.useState(false);
  const initialWorkspaces = userObj.workspaces;

  // GLOBAL CONTEXT
  const [currentWorkspace, setWorkspace] = React.useState(initialWorkspaces[0]);
  const [currentChannels, setChannels] = React.useState([]);
  const [currentDmdWith, setDmdWith] = React.useState([]);
  const [clickedDms, setClickedDms] = React.useState('false');
  const [clickedUserId, setClickedUserId] = React.useState('');
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [userStatus, setUserStatus] = React.useState('Active');
  const [userName] = React.useState('PLACEHOLDER_USER');

  console.log('I am inside drawer!!');

  function dateFormat(chatItem) {
    const date1 = chatItem.date.split('-');

    const year1 = date1[0];

    const month1 = date1[1];

    const day1 = date1[2].substring(0, date1[2].indexOf('T'));

    const hour1 = date1[2].substring(date1[2].indexOf('T') + 1,
      date1[2].indexOf(':'));

    const min1 = date1[2].substring(date1[2].indexOf(':') + 1,
      date1[2].lastIndexOf(':'));

    if ((today.getFullYear() === Number(year1)) &&
      (today.getMonth() + 1 === Number(month1)) &&
      (today.getDate() <= Number(day1))) {
      if (Number(hour1[0]) === 0) {
        return hour1[1] + ':' + min1;
      } else {
        return hour1 + ':' + min1;
      }
    } else if ((today.getFullYear() === Number(year1)) &&
      (today.getMonth() + 1 >= Number(month1))) {
      if (Number(day1[0]) === 0) {
        return months[Number(month1) - 1] + ' ' + day1[1];
      } else {
        return months[Number(month1) - 1] + ' ' + day1;
      }
    } else if ((today.getFullYear() > Number(year1))) {
      return year1;
    }
  }

  const getChannels = () => {
    try {
      let param = Object.values({currentWorkspace})[0];
      param = param.replace(/\s{1}/g, '%20');
      // I'm adding query params here
      fetch(`http://localhost:3010/v0/channelslist?ws=${param}`)
        .then((results) => {
          if (!results.ok) {
            throw results;
          }
          return results.json();
        })
        .then((json) => {
          setChannels(json);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getDmdWith = () => {
    try {
      const param1 = userObj.id;
      let param2 = Object.values({currentWorkspace})[0];
      param2 = param2.replace(/\s{1}/g, '%20');

      // I'm adding query params here http://localhost:3010/v0/dmdusers?id=1&ws=CSE%20183%20Summer%202021
      fetch(`http://localhost:3010/v0/dmdusers?id=${param1}&ws=${param2}`)
        .then((results) => {
          if (!results.ok) {
            throw results;
          }
          return results.json();
        })
        .then((json) => {
          setDmdWith(json);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getChannels();
    getDmdWith();
  }, [currentWorkspace]);

  const [currentChannel, setChannel] =
    React.useState('# General');

  // setting the chatlogs stuff:  ------------------------------------------
  const [currentChatlog, setChatlog] =
    React.useState([]);

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

  useEffect(() => {
    getChatlog();
  }, [currentChannel, currentWorkspace]);
  // --------------------------------------------------------------------------

  //  Object.values({currentChatlog})[0].sort(sortOrder);

  const handleListItemClick1 = (event) => {
    // close window when selected
    // double check if mobile is open first
    if (mobileOpen) {
      setMobileOpen(!mobileOpen);
    }
    setSelectedItem('All DMs');
  };
  const handleListItemClick2 = (event) => {
    // close window when selected
    // double check if mobile is open first
    if (mobileOpen) {
      setMobileOpen(!mobileOpen);
    }
    setSelectedItem('Mentions');
  };

  const getSelected = (input) => {
    if (selectedListItem === input) {
      return true;
    }
    return false;
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <GlobalProvider value={{
      setMobileOpen, currentChannels, currentDmdWith,
      setChannel, clickedDms, setClickedDms,
      clickedUserId, setClickedUserId}}>
      <div>
        <div className={classes.toolbar}/>
        <List className={classes.DMSnMentionsText}>
          <ListItem button className={classes.sideIconsMargin} id = 'All DMs'
            selected = {getSelected('All DMs')}
            onClick={(event) => handleListItemClick1(event)}>
            <QuestionAnswerTwoToneIcon
              className={classes.sidebarIcons}/>
            <div id = 'All DMs'
              useStyles={{'fontSize': 'medium'}}>All DMs</div>
          </ListItem>
          <ListItem button id = 'Mentions'
            selected = {getSelected('Mentions')}
            onClick={(event) => handleListItemClick2(event)}>
            <AlternateEmailIcon className={classes.sidebarIcons} />
            <div id = 'Mentions'
              useStyles={{'fontSize': 'medium'}}>Mentions</div>
          </ListItem>
        </List>
        <ChannelsList />
        <DmsList />
      </div>
    </GlobalProvider>
  );

  const container = window !==
    undefined ? () => window().document.body : undefined;

  return (
    <GlobalProvider value={{
      currentWorkspace, setWorkspace, setMobileOpen, settingsOpen,
      setSettingsOpen, userStatus, setUserStatus, userName,
      currentChannel, setChannel, clickedDms, setClickedDms,
      clickedUserId, setClickedUserId, setChatlog, currentChannels}}>
      <div className={classes.back}>
        <CssBaseline />
        <AppBar position="Absolute" className={classes.appBar}>
          <Toolbar className='toolbar'>
            <span className={classes.workspaceName}>
              <IconButton onClick={handleDrawerToggle}>
                <MenuIcon className={`${classes.menuButtonMed}
              ${classes.menuButtonSm}`} /></IconButton>
              {currentWorkspace}
            </span>
            <IconButton
              color="black"
              className={classes.menuButtonDesktop}
            >
              <MenuListWS />
            </IconButton>
            <div className={classes.search}>
              <InputBase
                placeholder="Search..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
                endAdornment={<SearchIcon />}
              />
            </div>
            <div className={classes.userIconTopCorner}>
              <MenuListProfile />
            </div>
            <IconButton
              color="black"
              aria-label="open drawer"
              edge="start"
              className={classes.channelMenuSm}
            >
              <MenuListCH />
            </IconButton>
            <IconButton
              color="black"
              aria-label="open drawer"
              edge="start"
              className={classes.wsMenuSm}
            >
              <MenuListWS />
            </IconButton>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}
          aria-label="mailbox folders">
          {/* The implementation can be swapped
          * with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
            <LabelBottomNavigation className={classes.bottomNavBarMobile}/>
          </Hidden>
          <Hidden smDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.main}>
          <div className={classes.inner1}>
            <div className={classes.beginnings}> Welcome to Beginnings! </div>
              {currentChatlog.map((chatItem) => (
                <>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={<div style=
                    {{
                      display: 'inline-block',
                    }}><Typography type="body2" style=
                      {{
                        color: 'black',
                        display: 'inline-block',
                        fontSize: 13,
                      }}>{chatItem.from} &nbsp;</Typography>
                    <Typography type="body2" style=
                      {{
                        color: 'grey',
                        display: 'inline-block',
                        fontSize: 12,
                      }}>{dateFormat(chatItem)}</Typography></div>} secondary=
                    {<Typography type="body2" style=
                      {{
                        color: 'black',
                        fontSize: 16,
                        }}>{chatItem.content}</Typography>} />
                  </ListItem>
                  </>
              ))}
                </div>
        </main>
        <div className={classes.inner2}>
          <Chatbox className={classes.inner2} />
        </div>
      </div>
    </GlobalProvider>
  );
}
// source: https://material-ui.com/components/drawers/
