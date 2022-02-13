const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// Credit: Professor David Harrison's Book Auth Example

const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

// ====== NOTE ======
/*
    will have to be updated to work with database
    rather than JSON, just placeholders for now
*/

// select secrets from SECRETS table from database
// const secrets = require('../data/secrets');
// select users from USERS table from database
// var users = require('../data/users.json');


exports.authenticate = async (req, res) => {
  const userReq = req.body;
  // search database for user with supplied request info
  const secrets = await getSecrets();
  const user = await getUser(userReq.email);

  if (!user) {
    res.status(401).send('Username or password incorrect');
  }

  const passwordCheck = bcrypt.compareSync(userReq.password, user.ua.password);
  if (user.ua.email.toUpperCase() === userReq.email.toUpperCase()  
    && passwordCheck)
  {
    const accessToken = jwt.sign(
      {email: user.email},
      secrets, {
      expiresIn: '25m',
      algorithm: 'HS256'
    });
    console.log(user.ua);
    console.log(user.ua["email"]);
    const info = {"id": user.ua['id'], "name": user.ua['name'], "accessToken": accessToken, "email": user.ua['email'], "role": user.ua['role'], "workspaces": user.ua['workspaces'] };
    console.log(info);
    res.status(200).send(info);
  } else {
    res.status(401).send('Username or password incorrect');
  }
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.autorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secrets.accessToken, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      console.log(user);
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

getUser = async (email) => {
  let select = `SELECT ua FROM users WHERE ua ->> 'email' = $1`;
  const query = {
    text: select,
    values: [`${email}`],
  };
  const {rows} = await pool.query(query);
  if (rows.length <= 0) {
    return null;
  } else {
    return rows[0];
  }
};

getSecrets = async () => {
  let select = `SELECT accessToken FROM secrets`;
  const query = {
    text: select,
  };
  const {rows} = await pool.query(query);
  if (rows.length <= 0) {
    return null;
  } else {
    return rows[0].accesstoken.secret;
  }
};