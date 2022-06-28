require('dotenv').config();
const app = require('./app.js');

app.listen(3010, () => {
  console.log(`Server Running on port 3010`);
  console.log('API Testing UI: http://localhost:3010/v0/api-docs/');
});

const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8082 });

wss.on("connection", ws => {
  console.log('new client connected!');

  ws.on("message", data => {
    console.log(`new message received: ${data}`);
    // 'ws.send(...);' to send just to the client that sent a mesage here
    // and the folowing code to broadcast to ALL connected clients: 
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`${data}`);
      }
    });

  });

  ws.on("close", () => {
    console.log('client has disconnected');
  });

});