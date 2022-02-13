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

exports.getUA = async (email) => {

  const select = 'SELECT ua FROM Users WHERE email = $1';

  await setUserToActive(email);

  const query = {
    text: select,
    values: [email],
  };
  const { rows } = await pool.query(query);
  console.log(rows);

  if (rows.length > 0) {
    console.log(rows.length);
    return rows[0].ua;
  }
  else {
    return null;
  }
};


exports.getChannelChat = async (ws, cn) => {
  console.log('1) inside db.js');
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
  console.log('db.js) inside db.js');
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
  const select = 'SELECT firstName, lastName FROM Users WHERE ident LIKE $1';
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
  const select = 'SELECT ua->\'workspaces\' AS theColumn FROM Users WHERE ident LIKE $1';
  const query = {
    text: select,
    values: [id],
  };

  const { rows } = await pool.query(query);


  if (rows.length > 0) {

    return rows[0]["thecolumn"];;
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

exports.addChannels = async (ws, cn) => {
  const select = 'INSERT INTO Channels(workspacename, channelname) VALUES ($1, $2)';
  const query = {
    text: select,
    values: [ws, cn],
  };


  const {rows} = await pool.query(query);

  if (rows.length > 0) {
    return;
  }
  else {
    return null;
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

