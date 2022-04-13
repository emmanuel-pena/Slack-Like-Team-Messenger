const db = require('./db');
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
  const info = req.body;
  const secrets = await getSecrets();

  if ((!info.email && !info.username) || (!info.password)) {
    res.status(400).send();
    return;
  }
  const user = await db.userExists(info);
  if (user) {
    const passwordCorrect = bcrypt.compareSync(
      info.password, user[0].password_hash);
    if (!passwordCorrect) {
      res.status(401).send();
      return;
    } else {
      const accessToken = jwt.sign({
        email: user[0].email,
        id: user[0].id,
        username: user[0].username,
      },
        secrets, {
        expiresIn: '2h',
        algorithm: 'HS256',
      });
      const response = {
        'id': user[0].id,
        'name': user[0].fullName,
        'email': user[0].email,
        'username': user[0].username,
        'accessToken': accessToken,
        'role': user[0].accRole,
        'workspaces': user[0].workspaces,
      };
      console.log(`${info.username} has succesfully logged-in!`);
      res.status(200).send(response);
    }
  } else {
    res.status(401).send();
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