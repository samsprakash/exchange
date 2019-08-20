'use strict';

const Hapi = require('hapi');

let port = Number(process.env.PORT_NUMBER) || (process.env.NODE_ENV === 'production' ? 9000 : 8090);

const server = new Hapi.Server();

server.connection({ 
  host: 'localhost',
  port: port 
});

const onServerStart = err => {
  if (err) {
    throw err;
  }

  console.log('Auth Server running at:', server.info.uri); // eslint-disable-line no-console

  server.route(require('./routes'));
};

const onPluginsRegistered = err => {
  if (err) {
    throw err;
  }

  server.state('visit-info', {
    ttl: 1000 * 60 * 15, // 15 minutes
    isSecure: ['local', 'local-rwa'].indexOf(process.env.NODE_ENV) === -1,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: false,
    path: '/'
  });



  server.views({
    engines: {
      hbs: require('handlebars')
    },
    path: './views'
  });

  server.start(onServerStart);
};

const plugins = [
  require('inert'),
  require('vision')
];

server.register(plugins, onPluginsRegistered);
