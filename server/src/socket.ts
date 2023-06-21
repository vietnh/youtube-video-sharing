import { Server } from 'socket.io';
import http from 'http';

let io: Server;

function setupSocket(server: http.Server) {
  io = new Server(server);

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

  return io;
}

function getSocket() {
  if (!io) {
    throw new Error('Socket.IO is not initialized!');
  }
  return io;
}

export { setupSocket, getSocket };
