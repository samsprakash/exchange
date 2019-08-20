
const isLocalEnv = () => [ 'local'].indexOf(process.env.NODE_ENV) > -1;

module.exports = {
  login: (request, reply) => {
   
    try {
     
        let error =  false;
        let success = false;
      
        reply.view('index', {
          local: isLocalEnv(),
          error: error,
          localhost: request.info.hostname,
          success:(success) ? success.message : null
          
        });
    }
    catch (exception) {
      console.error(exception);
      reply.view('index', {
        local: isLocalEnv(),
        error: null,
        localhost: request.info.hostname,
        success: null
      });
    }
  }
};
