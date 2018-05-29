import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';
import authentication from '@feathersjs/authentication-client';

const isDev = process.env.NODE_ENV === 'development';
let site;

if (isDev) {
  site = 'http://localhost:3030';
} else {
  site = 'https://mynewpath.com';
}

const socket = io(site);

export const app = feathers()
  .configure(socketio(socket))
  .configure(authentication({storage: window.localStorage}));

socket.on('reconnect', () => {
  app.authenticate();
});

export const userService = app.service('users');
