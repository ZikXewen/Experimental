function log(message){
    console.log(message);
}
module.exports.log = log;
// Exports as Object => (c++ overloads in class)
log('--From export.js');