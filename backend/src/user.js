const db = require('./db');

exports.getUA = async (req, res) => {
  const email = req.query.email;

  const ua = await db.getUA(email);
  if (ua === null) {
    res.status(404).send();
  } else {
    res.status(200).send(ua);
  }
};

exports.getChannelChat = async (req, res) => {
  const ws = req.query.ws;
  const cn = req.query.cn;

  const channelChat = await db.getChannelChat(ws, cn);
  if (channelChat === null) {
    res.status(404).send();
  } else {
    res.status(200).send(channelChat);
  }
};


exports.pushToChannel = async (req, res) => {
  const id = req.body.id;
  const ws = req.body.ws;
  const cn = req.body.cn;
  const content = req.body.content;


  if (id && ws && cn && content) {
    await db.pushToChannel(id, ws, cn, content);

    res.status(200).send();
  } else {
    res.status(400).send();
  }
};


exports.getDmsWithUser = async (req, res) => {
  const id = req.query.id
  const idWith = req.query.idWith;
  const ws = req.query.ws;

  console.log('user.js) about to enter db.js');
  const chat = await db.getDmsWithUser(id, idWith, ws);
  if (chat === null) {
    console.log('user.js) returned null. no rows counted');
    res.status(404).send();
  } else {
    res.status(200).send(chat);
  }
};


exports.pushToDmsWithUser = async (req, res) => {
  console.log('here0');
  const id = req.body.id;
  const idWith = req.body.idWith;
  const ws = req.body.ws;
  const content = req.body.content;

  if (id && ws && idWith && content) {
    await db.pushToDmsWithUser(id, idWith, ws, content);
    res.status(200).send();
  } else {
    res.status(400).send();
  }
};

exports.getDmdUsers = async (req, res) => {
  const id = req.query.id
  const ws = req.query.ws;

  const array = await db.getDmdUsers(id, ws);
  if (array === null) {
    res.status(404).send();
  } else {
    res.status(200).send(array);
  }
};

exports.getWorkspaces = async (req, res) => {
  const id = req.query.ident;
  const workspaces = await db.getWorkspaces(id);

  if (workspaces === null) {
    res.status(404).send();
  } else {
    res.status(200).send(workspaces);
  }
};


exports.getChannels = async (req, res) => {
  const workspacename = req.query.ws;

  const channelsList = await db.getChannels(workspacename);
  if (channelsList === null) {
    res.status(404).send();
  } else {
    res.status(200).send(channelsList);
  }
};


exports.addChannels = async (req, res) => {
  const workspacename = req.query.ws;
  const channel = req.query.cn;

  const channelsList = await db.getChannels(workspacename, channel);
  if (channelsList === null) {
    res.status(404).send();
  } else {
    res.status(201).send();
  }
};


exports.getActiveDms = async (req, res) => {
  const id = req.query.ident;
  const ws = req.query.ws;

  const activeDms = await db.getActiveDms(id, ws);
  if (activeDms === null) {
    res.status(404).send();
  } else {
    res.status(200).send(activeDms);
  }
};


// Beyond here doesn't work. I realize  -------------------------------------------------------------------------------------------------------------------
// late that db queries can only have
// identifiers after WHERE..
// ie: SELECT $1 FROM $2 doesn't work!
exports.getAllDms = async (req, res) => {
  const id = req.query.ident;
  const ws = req.query.ws;

  let table = '';
  if (ws === 'CSE 183') {
    table = 'dms183';
  }
  else if (ws === 'CSE 130') {
    table = 'dms130';
  }
  else if (ws === 'Investors') {
    table = 'investorsdms';
  }

  const dmsChat = await db.getAllDms(table, id, ws);
  if (dmsChat === null) {
    res.status(404).send();
  } else {
    res.status(200).send(dmChat);
  }
};

