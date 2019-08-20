let config = {};

switch(process.env.NODE_ENV) {
  
  case 'local':
    config = {
      API_URL: 'https://api.coinbase.com/v2/',
      APP_URL: 'http://{localhost}:8090/',
      CLIENT_ID: '1679091c5a880faf6fb5e6087eb1b2dc',
      CLIENT_SECRET: 'c81e728d9d4c2f636f067f89cc14862c'
    };
    break;
}

const setbase = url => config.API_URL + url;



console.log(JSON.stringify(config, null, 2)); //eslint-disable-line no-console

module.exports = config;
