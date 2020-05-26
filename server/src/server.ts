import express from 'express';
import http, { Server } from 'http';
import SocketIO from 'socket.io';

import { router } from './routes';
import { VehicleMock } from './mocks/vehicle';

const app: express.Application = express();
const server: Server = http.createServer(app);
const io: SocketIO.Server = SocketIO(server);

const port = process.env.PORT || 3001;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(router);

io.origins('*:*');

io.on('connection', (socket) => {
  console.log('New client connected');

  const vehicle = new VehicleMock(io);
  vehicle.startSimulation();

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    vehicle.stopSimulation();
  });
});

server.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
