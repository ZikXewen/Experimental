const fs = require('fs');
fs.writeFileSync('node.txt', 'test ');
fs.appendFileSync('node.txt', 'node');