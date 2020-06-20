const http = require('http');
const server = http.createServer();
server.on('connection', function(socket){
    console.log('Client Connected');
});
server.listen(3000);
console.log('Listening from port 3000');