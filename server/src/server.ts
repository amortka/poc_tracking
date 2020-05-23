import express from 'express';
import http, { Server } from 'http';
import SocketIO from 'socket.io';

import { router } from './routes';

const app: express.Application = express();
const server: Server = http.createServer(app);
const io: SocketIO.Server = SocketIO(server);

const port = process.env.PORT || 3001;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(router);

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit('FromAPI', response);
};

let interval;

io.origins('*:*');
io.on('connection', (socket) => {
  console.log('New client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

server.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
