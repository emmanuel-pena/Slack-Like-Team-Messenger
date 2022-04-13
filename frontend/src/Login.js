import React from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import globalContext from './globalContext';

// CREDIT: Checkbox from Material-UI
// https://material-ui.com/components/checkboxes/
// import Checkbox from '@material-ui/core/Checkbox';

// CREDIT: hide password/show password:
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_toggle_password


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  topPic: {
    marginLeft: '32%',
    display: 'fex',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#3F0E40',
  },
  signup: {
    width: '45%',
    [theme.breakpoints.down('xs')]: {
      width: '48%',
    },
    backgroundColor: '#3F0E40',
  },
  Img: {

    width: '50%',
    display: 'flex',
  },
  Input: {
    display: 'block',
  },
  background: {
    display: 'inline-block',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'left',
  },
}));

/**
 *@return {object} login screen
 */
export default function Login() {
  const [user, setUser] =
    React.useState(
      {id: '', name: '', email: '', username: '', accessToken: '', role: '', workspaces: []},
    );
  const {newLogin, setNewLogin} = React.useContext(globalContext);
  const {setUserObj} = React.useContext(globalContext);
  const {setShow} = React.useContext(globalContext);
  const {setWorkspace} = React.useContext(globalContext);
  // Checkbox
  let [setChecked] = React.useState(false);

  const history = useHistory();
  const classes = useStyles();

  const handleEmailChange = (event) => {
    const {value} = event.target;
    const u = user;
    u.email = value;
    setUser(u);
  };

  const handlePasswordChange = (event) => {
    const {value} = event.target;
    const u = user;
    u.password = value;
    setUser(u);
  };

  const handleSignup = () => {
    console.log('signup clicked');
    history.push('/signup');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      console.log('inside loginUser)');
      console.log('Logging in user!');

      const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const param1 = user.email;
      const param2 = user.password;

      let body = {email: '', password: ''};

      if ((param1).match(emailValidator)) {
        body = {email: param1, password: param2};
        console.log(body);
      } else {
        body = {username: param1, password: param2};
        console.log(body);
      }

      fetch('http://localhost:3010/v0/login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 401) {
              console.log('401 code means invalid credentials');
            }
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          console.log('getDetails 1)');
          console.log(json);
          localStorage.setItem('user', JSON.stringify(json));
          setNewLogin(!newLogin);
          setUserObj(JSON.parse(localStorage.getItem('user')));
          console.log(JSON.parse(localStorage.getItem('user')).workspaces[0]);
          setWorkspace(JSON.parse(localStorage.getItem('user')).workspaces[0]);
          setShow(false);

          console.log('getDetails 2)');
          const obj = json;
          console.log(obj);

          console.log('getDetails 3)');
          const u = user;
          u.id = obj.id;
          u.name = obj.name;
          u.email = obj.email;
          u.username = obj.username;
          u.accessToken = obj.accessToken;
          u.role = obj.role;
          u.workspaces = obj.workspaces;
          setUser(u);
          console.log(user);
          history.push('/home');
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log('console.loggin e');
      console.log(e);
    }
  };

  const toggleRemember = () => {
    setChecked = !setChecked;
  };

  const togglePassword = () => {
    const passwordInput = document.getElementById('pass');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  };

  return (
    <Container component="main" maxWidth="xs"
      className={classes.mainBackground}>
      <div className={classes.paper}>
        <div className={classes.topPic}>
          <img src='https://cdn.auth0.com/blog/user-analytics-funnel-social-login/slacklogo.png'
            className={classes.Img}
            alt=''/>
        </div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          onSubmit={onSubmit} className={classes.background}>
          <input
            id = "email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            placeholder="Email"
            onChange={handleEmailChange}
            className={classes.Input}
            autoFocus
          />
          <input
            id = "pass"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            placeholder="Password"
            onChange={handlePasswordChange}
            className={classes.Input}
          />
          <div>
            <div>
              <input
                id = "passwordCheck"
                type = "checkbox"
                onClick = {togglePassword}
              />
              Show Password
            </div>
            <div>
              <input
                id = "rememberCheck"
                type = "checkbox"
                onClick = {toggleRemember}
              />
              Remember Me?
            </div>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.signup}
          onClick={handleSignup}
        >
          Sign Up
        </Button>
      </div>
    </Container>
  );
}
