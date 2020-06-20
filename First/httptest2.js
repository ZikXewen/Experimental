const http = require('http');
const server = http.createServer(function(req, res){
    var obj = {name: "Boy", age: "13", city: "Bangkok"};
    if(req.url === '/') {
        res.write('You are at home page'); 
        res.write('\n');
        res.write(JSON.stringify(obj));
        res.end();
    }
});
server.on('connection', function(socket){
    console.log('Client Connected');
});
server.listen(3000);
console.log('Listening from port 3000');