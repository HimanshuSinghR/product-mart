
const app = require('./config/express');
const config = require('./config/config');
require(`./config/mongoose`)
//listen to the port 
app.listen(config.port,()=>{
    console.log(`happily running on port ${config.port} (${config.env})` );
});