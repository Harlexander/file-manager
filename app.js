//require node modules
const http = require('http');


const respond = require('./libs/respond.js')
//create the server to port 5500
const server = http.createServer(respond);

//create a port

const port = process.env.port || 5500;
//listen to the server

server.listen(port, ()=> {
    console.log(`listening to port ${port} created by peachy`)
})
