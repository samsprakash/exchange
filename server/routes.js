let views = require('./handlers/views');
let Request = require('reqwest');
let config = require('./config');
module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: views.login
  },
  {
    method: 'GET',
    path: '/exchangeRates',
    handler: function (request, reply) {
      let baseCurrency = request && request.url && request.url.query  && request.url.query.baseCurrency ? request.url.query.baseCurrency : 'USD';
      let exchangeCurrency = request && request.url && request.url.query  && request.url.query.exchangeCurrency ? request.url.query.exchangeCurrency : 'USD';
      return Request({
        url:  config.API_URL+'exchange-rates?currency='+baseCurrency,
        method: 'GET'
      }).then(response => {
       //console.log(response);
       console
        console.log(response.data.rates[exchangeCurrency]);
       reply(response.data.rates[exchangeCurrency]);
       
    
      });
    }
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './static',
        listing: true
      }
    }
  }
];
