const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const dummy = require('./dummy');
const user = require('./user');
const auth = require('./auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

app.post('/v0/login', auth.authenticate);

app.get('/v0/dummy', dummy.get);
// Your routes go here
app.post('/v0/user', user.createUser);

app.get('/v0/ua', user.getUA);

app.get('/v0/channelschat', user.getChannelChat);
app.post('/v0/channelschat', user.pushToChannel);

app.get('/v0/dmschat', user.getDmsWithUser);
app.put('/v0/dmschat', user.pushToDmsWithUser);

app.get('/v0/dmdusers', user.getDmdUsers);
app.post('/v0/dmdusers', user.createDmsWithUser);

app.get('/v0/channelslist', user.getChannels);
app.post('/v0/channelslist', user.addChannel);

app.get('/v0/workspaceslist', user.getWorkspaces);
app.post('/v0/workspaceslist', user.createWorkspace);

app.put('/v0/userworkspaces', user.joinWorkspace);

app.get('/v0/workspaceadmins/:ws', user.getWorkspaceAdmins);

app.get('/v0/searchedusers', user.getSearchedUsers);


app.get('/v0/data', user.getActiveDms);            //unf
app.get('/v0/data', user.getAllDms);               //unf


app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
