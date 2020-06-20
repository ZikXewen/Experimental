const logobj = require('./export.js');
const logfnc = require('./export2.js');
const car = require('./export3');

logobj.log('Magic!');
logfnc('magic!');

const mycar = new car(4, 'red', 'pick-up');
logfnc('this dude\'s car is ' + mycar.color);