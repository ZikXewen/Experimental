const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('myEvent', function(args){
    console.log(`I found myEvent with: `, args);
})

emitter.emit('myEvent', {id: 1, name: 'boy'});
emitter.emit('myEvent', {type: 'student', content_type: 'text/html', header: '200 OK'});