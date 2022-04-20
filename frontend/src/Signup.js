import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Slide from '@mui/material/Slide';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#3F0E40',
  },
  topPic: {
    display: 'flex',
    flex: 1,
    flexShrink: 1,
    flexBasis: 5,
    width: '65%',
    height: '31%',
    [theme.breakpoints.up('xs')]: {
      left: '16%',
      position: 'relative',
      display: 'flex',
    },
    [theme.breakpoints.down('xs')]: {
      width: '5 px',
      left: 105,
      bottom: -140,
      position: 'fixed',
      display: 'flex',
      flex: 1,
      flexShrink: 1,
      flexBasis: 5,
    },
  },
  Img: {
    width: '99%',
    height: '80%',
    [theme.breakpoints.down('xs')]: {
      width: '66%',
      height: '37%',
    },
  },
  formBody: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15px',
    borderWidth: '5px',
    borderStyle: 'solid',
    width: '95%',
    [theme.breakpoints.up('xs')]: {
      position: 'relative',
      left: '2.5%',
      bottom: '5%',
    },
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
      borderWidth: '1px',
      borderStyle: 'solid',
      bottom: '0%',
    },
  },
  container: {
    backgroundColor: '#EBBDF8',
    position: 'fixed',
    top: '5%',
    left: '14%',
    [theme.breakpoints.between('sm', 'sm')]: {
      height: '100vh',
      width: '100vh',
      left: '1%',
      right: '0%',
    },
    [theme.breakpoints.between('md', 'md')]: {
      height: '100vh',
      width: '140vh',
      left: '17%',
    },
    [theme.breakpoints.up('xs')]: {
      height: '100vh',
      width: '150vh',
    },
    [theme.breakpoints.down('xs')]: {
      height: '100vh',
      width: '54vh',
      position: 'fixed',
      top: '8.1%',
      left: '3%',
    },
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 5px',
  },
  row0: {
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
      position: 'relative',
      left: '8%',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      marginTop: '0px',
      marginLeft: '73px',
      position: 'relative',
      left: '0%',
    },
    margin: '10px 5px',
  },
  row1: {
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
      marginTop: '50px',
      position: 'relative',
      left: '8%',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      marginTop: '-10px',
      marginLeft: '73px',
      position: 'relative',
      left: '0%',
    },
    margin: '10px 5px',
  },
  row2: {
    display: 'flex',
    [theme.breakpoints.up('xs')]: {
      marginTop: '50px',
      position: 'relative',
      left: '8%',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      marginTop: '-10px',
      marginLeft: '73px',
      position: 'relative',
      left: '0%',
    },
    margin: '10px 5px',
  },
  first: {
    flex: '1',
    [theme.breakpoints.down('xs')]: {
      margin: '5px 0px',
    },
    [theme.breakpoints.between('xs', 'md')]: {

    },
    [theme.breakpoints.up('md')]: {

    },
  },
  firstInput: {
    flex: '1',
    border: '1px solid black',
    [theme.breakpoints.down('xs')]: {

    },
    [theme.breakpoints.between('xs', 'md')]: {

    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
  },
  last: {
    flex: '1',
    [theme.breakpoints.down('xs')]: {
      margin: '5px 0px',
    },
    [theme.breakpoints.between('xs', 'md')]: {

    },
    [theme.breakpoints.up('md')]: {

    },
  },
  lastInput: {
    flex: '1',
    border: '1px solid black',
    [theme.breakpoints.down('xs')]: {

    },
    [theme.breakpoints.between('xs', 'md')]: {

    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
  },
  username: {
    flex: '1',
    [theme.breakpoints.down('xs')]: {
      margin: '5px 0px',
    },
    [theme.breakpoints.between('xs', 'md')]: {

    },
    [theme.breakpoints.up('md')]: {

    },
  },
  usernameInput: {
    flex: '1',
    border: '1px solid black',
    [theme.breakpoints.down('xs')]: {

    },
    [theme.breakpoints.between('xs', 'md')]: {

    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
  },
  email: {
    flex: '1',
    [theme.breakpoints.down('xs')]: {
      margin: '5px 0px',
    },
    [theme.breakpoints.between('xs', 'md')]: {

    },
    [theme.breakpoints.up('md')]: {

    },
  },
  emailInput: {
    flex: '1',
    border: '1px solid black',
    [theme.breakpoints.down('xs')]: {

    },
    [theme.breakpoints.between('xs', 'md')]: {

    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
  },
  password: {
    flex: '1',
    [theme.breakpoints.down('xs')]: {
      margin: '5px 0px',
    },
    [theme.breakpoints.between('xs', 'md')]: {

    },
    [theme.breakpoints.up('md')]: {

    },
  },
  passwordInput: {
    flex: '1',
    border: '1px solid black',
    [theme.breakpoints.down('xs')]: {

    },
    [theme.breakpoints.between('xs', 'md')]: {

    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
  },
  confirm: {
    flex: '1',
    [theme.breakpoints.down('xs')]: {
      margin: '5px 0px',
    },
    [theme.breakpoints.between('xs', 'md')]: {

    },
    [theme.breakpoints.up('md')]: {

    },
  },
  confirmInput: {
    flex: '1',
    border: '1px solid black',
    [theme.breakpoints.down('xs')]: {

    },
    [theme.breakpoints.between('xs', 'md')]: {

    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
  },
  buttons: {
    position: 'relative',
    display: 'flex',
    left: '45%',
    [theme.breakpoints.up('xs')]: {
      marginTop: '70px',
      height: '40px',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '0px',
      left: '40%',
      height: '35px',
    },
  },
}));

export default function Signup() {
  const [open, setOpen] = React.useState(true);

  const history = useHistory();
  const classes = useStyles();

  const [signUpMessage, setSignUpMessage] = React.useState(null);

  const [values, setValues] = React.useState({
    first: '',
    last: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const [emailOk, setFirstOk] = React.useState(false);
  const [firstOk, setLastOk] = React.useState(false);
  const [lastOk, setEmailOk] = React.useState(false);
  const [passwordsOk, setPasswordsOk] = React.useState(false);
  const [usernameOk, setUsernameOk] = React.useState(false);
  const [clickedSignup, setClickedSignup] = React.useState(false);

  const handleClose = () => {
    setSignUpMessage(null);
    setClickedSignup(false);
    setOpen(false);
    history.push('/');
  };

  const handleCancel = () => {
    setValues({
      first: '',
      last: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
    });
    setEmailOk(false);
    setUsernameOk(false);
    setPasswordsOk(false);
    handleClose();
  };

  const createUser = () => {
    try {
      console.log('inside createUser)');

      setSignUpMessage('waiting');

      const param1 = values.first;
      const param2 = values.last;
      const param3 = values.username;
      const param4 = values.email;
      const param5 = values.password;

      const body = {
        first: param1, last: param2,
        username: param3, email: param4, password: param5,
      };
      console.log(body);

      fetch('http://localhost:3010/v0/user', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.status === 409) {
            alert('User already exists');
          } else if (!res.ok && res.status !== 409) {
            alert('Server error');
            throw res;
          } else if (res.ok) {
            console.log('fetched post user');
            setSignUpMessage('Your account has been created. ' +
              'Please check your email for a verification link!');

            return;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {

    }
  };

  const creationResponse = (message) => {
    if (message === 'waiting') {
      return (
        <CircularProgress/>
      );
    }
    return (
      message.length > 0 ?
        <Alert severity= {`success`}>
          {message}
        </Alert> :
        null
    );
  };

  const handleSignUp = () => {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    const pwd = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    setClickedSignup(true);
    let fOk = false;
    let lOk = false;
    let eOk = false;
    let uOk = false;
    let pOk = false;


    if (/^[A-Z][a-z]+$/.test(values.first) === true) {
      fOk = true;
    }

    if (/^[A-Z][a-z]+$/.test(values.last) === true) {
      lOk = true;
    }

    if ((values.email).match(mailformat)) {
      eOk = true;
    }

    if ((values.username) !== '') {
      uOk = true;
    }

    if (values.password === values.confirmPassword &&
                  values.password.match(pwd)) {
      pOk = true;
    }

    if (values.first === '' || values.last === '' ||
      values.email === '' || values.password === '' ||
      values.confirmPassword === '' || values.username === '') {
      alert('Fields cannot be empty');
    } else if (fOk === false || lOk === false ||
      eOk === false || uOk === false || pOk === false) {
      setFirstOk(fOk);
      setLastOk(lOk);
      setEmailOk(eOk);
      setPasswordsOk(pOk);
      setUsernameOk(uOk);
      alert('Please correct errors (marked red)');
    } else {
      setFirstOk(fOk);
      setLastOk(lOk);
      setEmailOk(eOk);
      setPasswordsOk(pOk);
      setUsernameOk(uOk);
      createUser();
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value});
  };

  return (
    <div style={{
      backgroundColor: 'black',
    }}>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        style={{
          backgroundColor: 'black',
        }}
      >
        <AppBar sx={{position: 'relative'}} className={classes.appbar}
          style={{backgroundColor: '#3F0E40'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
              Sign up for an account here
            </Typography>
          </Toolbar>
        </AppBar>


        <React.Fragment style={{
          backgroundColor: 'black',
        }}>
          <CssBaseline style={{
            backgroundColor: 'black',
          }} />
          <div style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: '#D1D1D1',
          }}>
            <Box
              className={classes.container}>
              <div className={classes.topPic}>
                <img src='https://cdn.auth0.com/blog/user-analytics-funnel-social-login/slacklogo.png'
                  className={classes.Img}
                  alt='' />
              </div>

              <div className={classes.formBody}
                style={{
                  backgroundColor: 'transparent',
                  backgroundColor: 'rgba(255,255,255,0.5)'}}>
                <div className={classes.row0}>
                  <div className={classes.first}>
                    <InputLabel htmlFor="filled-adornment-password"
                      style={{
                        fontSize: 12,
                        fontFamily: 'Josefin Sans, cursive',
                        color: (firstOk === false &&
                          clickedSignup === true) ? 'red' : 'black',
                      }} >
                      First Name *</InputLabel>
                    <FilledInput
                      required
                      value={values.first}
                      onChange={handleChange('first')}
                      label="First Name"
                      placeholder="First Name"
                      className={classes.firstInput}
                      style={{
                        backgroundColor: 'white',
                      }}
                      margin="dense"
                    />
                  </div>

                  <div className={classes.last}>
                    <InputLabel htmlFor="filled-adornment-password"
                      style={{
                        fontSize: 12,
                        fontFamily: 'Josefin Sans, cursive',
                        color: (lastOk === false &&
                          clickedSignup === true) ? 'red' : 'black',
                      }} >
                      Last Name *</InputLabel>
                    <FilledInput
                      required
                      value={values.last}
                      onChange={handleChange('last')}
                      label="Last Name"
                      placeholder="Last Name"
                      className={classes.lastInput}
                      style={{
                        backgroundColor: 'white',
                      }}
                      margin="dense"
                    />
                  </div>
                </div>

                <div className={classes.row1}>
                  <div className={classes.username}>
                    <InputLabel htmlFor="filled-adornment-password"
                      style={{
                        fontSize: 12,
                        fontFamily: 'Josefin Sans, cursive',
                        color: (usernameOk === false && clickedSignup === true) ? 'red' : 'black',
                      }} >
            Username *</InputLabel>
                    <FilledInput
                      required
                      value={values.username}
                      onChange={handleChange('username')}
                      label="Username"
                      placeholder="Username"
                      className={classes.usernameInput}
                      style={{
                        backgroundColor: 'white',
                      }}
                      margin="dense"
                    />
                  </div>

                  <div className={classes.email}>
                    <InputLabel htmlFor="filled-adornment-password"
                      style={{
                        fontSize: 12,
                        fontFamily: 'Josefin Sans, cursive',
                        color: (emailOk === false && clickedSignup === true) ? 'red' : 'black',
                      }} >
                        Email Address *</InputLabel>
                    <FilledInput
                      required
                      value={values.email}
                      onChange={handleChange('email')}
                      label="Email Address"
                      placeholder="Email Address"
                      className={classes.emailInput}
                      style={{
                        backgroundColor: 'white',
                      }}
                      margin="dense"
                    />
                  </div>
                </div>

                <div className={classes.row2}>
                  <div className={classes.password}>
                    <InputLabel htmlFor="filled-adornment-password"
                      style={{
                        fontSize: 12,
                        fontFamily: 'Josefin Sans, cursive',
                        color: (passwordsOk === false && clickedSignup === true) ? 'red' : 'black',
                      }} >
            Password (length {'>'} 5 and contain a number) *</InputLabel>
                    <FilledInput
                      id="filled-adornment-password"
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange('password')}
                      placeholder="Password"
                      className={classes.passwordInput}
                      style={{
                        backgroundColor: 'white',
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </div>

                  <div className={classes.confirm}>
                    <InputLabel htmlFor="filled-adornment-password"
                      style={{
                        fontSize: 12,
                        fontFamily: 'Josefin Sans, cursive',
                        color: (passwordsOk === false && clickedSignup === true) ? 'red' : 'black',
                      }} >
            Confirm Password *</InputLabel>
                    <FilledInput
                      id="filled-adornment-password"
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.confirmPassword}
                      onChange={handleChange('confirmPassword')}
                      placeholder="Confirmed Password"
                      className={classes.confirmInput}
                      style={{
                        backgroundColor: 'white',
                      }}
                    />
                  </div>
                </div>

                <div className={classes.buttons}>
                  <Button style={{backgroundColor: 'black', color: 'white'}}
                    onClick={handleSignUp}>Sign Up</Button>
                </div>
              </div>

              {signUpMessage ? creationResponse(signUpMessage) : signUpMessage}


            </Box>
          </div>

        </React.Fragment>
      </Dialog>
    </div>
  );
}
