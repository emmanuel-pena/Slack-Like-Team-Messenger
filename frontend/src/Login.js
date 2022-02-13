import React from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import globalContext from './globalContext';

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
      {id: '', email: '', name: '', password: '', role: '', workspaces: []},
    );

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


  const getDetails = () => {
    try {
      const email = user.email;
      const array = email.split('@');
      const param = array[0] + '%40' + array[1];
      // I'm adding query params here
      fetch(`http://localhost:3010/v0/ua?email=${param}`)
        .then((results) => {
          if (!results.ok) {
            throw results;
          }
          return results.json();
        })
        .then((json) => {
          console.log('getDetails 1)');
          console.log(json);
          localStorage.setItem('user', JSON.stringify(json));
          console.log('getDetails 2)');
          const obj = json;
          console.log(obj);
          console.log('getDetails 3)');
          const u = user;
          u.id = obj.id;
          u.name = obj.name;
          u.email = obj.email;
          u.password = obj.password;
          u.role = obj.role;
          u.workspaces = obj.workspaces;
          setUser(u);
          console.log(user);
          history.push('/home');
        });
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3010/v0/authenticate', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        getDetails();
        return;
      })
      .catch((err) => {
        console.log(err);
        alert('Error logging in, please try again');
      });
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
      </div>
    </Container>
  );
}
