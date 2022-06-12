// Handle all user database interactions

const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

setUserToActive = async (email) => {
  const select = 'UPDATE Users SET active = true WHERE email = $1';
  const query = {
    text: select,
    values: [email],
  };

  await pool.query(query);
};

exports.userExists = async (userInfo) => {
  let select = 'SELECT * FROM Users';
  const queryValues = [];

  if (userInfo.username && userInfo.email) {
    select += ' WHERE email = $1 OR username = $2';
    queryValues.push(userInfo.email, userInfo.username);
  } else if (userInfo.email) {
    select += ' WHERE email = $1 ';
    queryValues.push(userInfo.email);
  } else {
    select += ' WHERE username = $1 ';
    queryValues.push(userInfo.username);
  }

  const query = {
    text: select,
    values: queryValues,
  };

  const {rows} = await pool.query(query);
  return rows.length == 0 ? false : rows;
};

checkNumUsers = async () => {
  const select = 'SELECT email FROM Users';
  const query = {
    text: select,
    values: [],
  };

  const {rows} = await pool.query(query);
  return rows.length;
};

exports.addUser = async (newUser) => {
  const fullName = newUser.first + ' ' + newUser.last;
  const emptyArray = [];
  const initWS = JSON.stringify(emptyArray);;

  const numUsers = await checkNumUsers();
  const ident = String(numUsers + 1);

  const insert =
    'INSERT INTO Users(id, username, email, firstName, lastName, fullName, password_hash, workspaces)' +
    'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, username, email';

  const query = {
    text: insert,
    values: [
      ident,
      newUser.username,
      newUser.email,
      newUser.first,
      newUser.last,
      fullName,
      newUser.password,
      initWS,
    ],
  };

  const { rows } = await pool.query(query);
  console.log('db.js line 85)');
  console.log(rows);
  const obj = {id: rows[0].id, username: rows[0].username, email: rows[0].email};
  console.log('db.js line 87)');
  console.log(obj);
  return obj;
};

exports.getUA = async (email) => {

  const select = 'SELECT * FROM Users WHERE email = $1';

  await setUserToActive(email);

  const query = {
    text: select,
    values: [email],
  };
  const { rows } = await pool.query(query);
  console.log(rows);
  const ua = {id: '', name: '', password: '', email: '', workspaces: []};


  if (rows.length > 0) {
    console.log(rows.length);
    ua.id = rows[0].id;
    ua["name"] = rows[0].fullName;
    ua.password = rows[0].password_hash;
    ua["email"] = rows[0].email;
    ua.workspaces = rows[0].workspaces;
    return ua;
  }
  else {
    return null;
  }
};


exports.getChannelChat = async (ws, cn) => {
  const select = 'SELECT chatlog FROM Channels WHERE workspacename = $1 AND channelname = $2';

  const query = {
    text: select,
    values: [ws, cn],
  };
  const { rows } = await pool.query(query);
  console.log(rows);

  if (rows.length > 0) {
    console.log(rows.length);
    return rows[0].chatlog;
  }
  else {
    return null;
  }
};

exports.getDmsWithUser = async (id, idWith, ws) => {
  const select = 'SELECT chatlog FROM Dms WHERE userID LIKE $1 AND withID LIKE $2 AND workspacename = $3';

  const query = {
    text: select,
    values: [id, idWith, ws],
  };

  console.log('console.logging query.values:');
  console.log(query.values);

  const { rows } = await pool.query(query);
  console.log('console.logging rows:');
  console.log(rows);

  console.log('db.js) ran query. Going to count rows now.. count will apear if > 0');
  if (rows.length > 0) {
    console.log('counted rows. going to return chatlog now');
    console.log('about to print row count..');
    console.log(rows.length);
    console.log('about to print row 0');
    console.log(rows[0]);
    console.log('about to print row 0.chatlog');
    console.log(rows[0].chatlog);
    return rows[0].chatlog;
  }
  else {
    return null;
  }
};



getFullName = async (ident) => {  // A helper func for posting. Retrieves the full name of the current user's id to use in 'from' part
  const select = 'SELECT firstName, lastName FROM Users WHERE id LIKE $1';
  const query = {
    text: select,
    values: [ident],
  };

  const { rows } = await pool.query(query);

  if (rows.length > 0) {
    const result = rows[0].firstname.toString() + ' ' + rows[0].lastname.toString();
    return result.toString();
  }
  else {
    return null;
  }
};


exports.pushToChannel = async (id, ws, cn, content) => {

  const select = 'SELECT chatlog FROM Channels WHERE workspacename = $1 AND channelname = $2';
  const query = {
    text: select,
    values: [ws, cn],
  };

  const {rows} = await pool.query(query);


  const copy = rows[0].chatlog;

  const newObj = {};
  newObj['senderID'] = parseInt(id);
  console.log('about to call getFullName');
  newObj['from'] = await getFullName(id);
  newObj['date'] = new Date().toISOString();
  newObj['content'] = content;

  copy.push(newObj);

  const copyy = JSON.stringify(copy);
  console.log(copyy);

  await updateChannelChat(copyy, ws, cn);
};


updateChannelChat = async (replacement, ws, cn, ) => {
  const select = 'UPDATE Channels SET chatlog = $1 WHERE workspacename = $2 AND channelname = $3';
  const query = {
    text: select,
    values: [replacement, ws, cn],
  };

  await pool.query(query);
};

exports.pushToDmsWithUser = async (id, idWith, ws, content) => {

  const select = 'SELECT chatlog FROM Dms WHERE userID LIKE $1 AND withID LIKE $2 AND workspacename = $3';
  const query = {
    text: select,
    values: [id.toString(), idWith.toString(), ws],
  };

  const { rows } = await pool.query(query);


  const copy = rows[0].chatlog;

  const newObj = {};
  newObj['senderID'] = parseInt(id);
  newObj['from'] = await getFullName(id.toString);
  newObj['date'] = new Date().toISOString();
  newObj['content'] = content;

  copy.push(newObj);
  console.log(copy);
  console.log('inPushDmsWithUser');

  const copyy = JSON.stringify(copy);
  console.log(copyy);

  await updateUserDms(copyy, ws, id, idWith);
  await updateUserDms(copyy, ws, idWith, id);
};

updateUserDms = async (replacement, ws, id, idWith, ) => {
  const select = 'UPDATE Dms SET chatlog = $1 WHERE workspacename = $2 AND userID LIKE $3 AND withID LIKE $4';
  const query = {
    text: select,
    values: [replacement, ws, id, idWith],
  };

  await pool.query(query);
};

exports.getDmdUsers = async (id, ws) => {

  const select = 'SELECT DISTINCT withID FROM Dms WHERE userID LIKE $1 AND workspacename = $2';

  const query = {
    text: select,
    values: [id, ws],
  };

  const {rows} = await pool.query(query);

  let usersArray = [];
  let userObj = {id: '', name: ''};

  for (let i = 0; i < parseInt(rows.length); i++) {
    userObj["id"] = rows[i].withid;
    userObj.name = await getFullName(rows[i].withid);
    const copy = {id: userObj.id, name: userObj.name};
    usersArray.push(copy);
  }

  if (rows.length > 0) {
    return usersArray;
  }
  else {
    return null;
  }
};

exports.getWorkspaces = async (id) => {
  const select = 'SELECT workspaces AS theColumn FROM Users WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };

  const { rows } = await pool.query(query);


  if (rows.length > 0) {
    console.log('db.js line 313)');
    console.log(rows[0]["thecolumn"]);
    return rows[0]["thecolumn"];
  }
  else {
    return null;
  }

};

exports.getChannels = async (ws) => {
  const select = 'SELECT channelname FROM Channels WHERE workspacename = $1';
  const query = {
    text: select,
    values: [ws],
  };

  const results = [];

  const {rows} = await pool.query(query);

  if (rows.length > 0) {
    for (let i = 0; i < rows.length; i++) {
      results.push(rows[i].channelname);
    }
    return results;
  }
  else {
    return null;
  }
};

exports.addChannel = async (ws, cn) => {

  const chatlog = [];

  const select = 'INSERT INTO Channels(workspacename, channelname, chatlog) VALUES ($1, $2, $3)';

  const query = {
    text: select,
    values: [ws, cn, JSON.stringify(chatlog)],
  };

  const channelExists = searchIfChannelsExists(ws, cn);

  if (channelExists === true) {
    return 'conflict';
  } else {
    await pool.query(query);

    return 'created';
  }

};

searchIfChannelsExists = async (ws, cn) => {

  const select = 'SELECT * FROM Channels WHERE workspacename = $1 AND channelname = $2';

  const query = {
    text: select,
    values: [ws, cn],
  };

  const {rows} = await pool.query(query);

  if (rows.length > 0) {
    return true;
  } else {
    return false;
  }
};

exports.getWorkspaceAdmins = async (ws) => {

  const select = 'SELECT admins FROM Workspaces where workspacename = $1';

  const query = {
    text: select,
    values: [ws],
  };

  const {rows} = await pool.query(query);

  if (rows.length > 0) {
    return rows[0].admins;
  } else {
    return null;
  }

};

exports.joinWorkspace = async (ws, id) => {

  const exists = await searchIfWorkspaceExists(ws);

  if (exists === false) {
    return 'not found';
  } else if (exists === true) {
    await getUserCurrentWorkspacesThenUpdate(ws, id);

    return 'success';
  }

};

exports.createWorkspace = async (ws, ad) => {

  const select = 'INSERT INTO Workspaces(workspacename, admins) VALUES ($1, $2)';

  const query = {
    text: select,
    values: [ws, JSON.stringify(ad)],
  };

  const exists = await searchIfWorkspaceExists(ws);

  if (exists === true) {
    return 'conflict';
  } else if (exists === false) {

    await pool.query(query);

    await addInitialChannel(ws);
    await getUserCurrentWorkspacesThenUpdate(ws, ad[0]);

    return 'created';
  }

};

addInitialChannel = async (ws) => {

  const temp = [];
  const emptyArray = JSON.stringify(temp);

  const select = 'INSERT INTO Channels(workspacename, channelname, chatlog) VALUES ($1, $2, $3)';

  const query = {
    text: select,
    values: [ws, '# General', emptyArray],
  };

  await pool.query(query);
};

getUserCurrentWorkspacesThenUpdate = async (ws, id) => {

  const select = 'SELECT workspaces FROM Users WHERE id = $1';

  const query = {
    text: select,
    values: [id],
  };

  const {rows} = await pool.query(query);
  console.log(rows[0].workspaces);

  const updatedWorkspaces = rows[0].workspaces;
  updatedWorkspaces.push(ws);
  console.log(updatedWorkspaces);

  await updateWorkspacesOfUser(id, updatedWorkspaces);
};

updateWorkspacesOfUser = async (id, data) => {

  const select = 'UPDATE Users SET WORKSPACES = $1 WHERE id = $2';

  const query = {
    text: select,
    values: [JSON.stringify(data), id],
  };

  await pool.query(query);
};

searchIfWorkspaceExists = async (ws) => {

  const select = 'SELECT * FROM Workspaces WHERE workspacename = $1';

  const query = {
    text: select,
    values: [ws],
  };

  const {rows} = await pool.query(query);

  if (rows.length > 0 && rows[0].workspacename === ws) {
    return true;
  } else {
    return false;
  }
};

exports.getActiveDms = async (id, ws) => {


};


exports.getAllDms = async (table, id, ws) => {
  const results = [];

  let who = '';
  who = 'jack';
  const arr1 = await getDmsFrom(who, table, id, ws);
  if (arr1[0] != undefined) {
    results.push(arr1[arr1.length - 1]);
  }


  if (results.length > 0) {
    return results;
  }
  else {
    return null;
  }
};

