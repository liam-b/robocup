process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

process.stdin.on('data', function (text) {
  console.log('> received:', util.inspect(text));
  if (text[0] === '$') eval(text.substr(1, text.length))
  if (text === 'quit\n') {
    console.log('> exiting');
    process.exit();
  }
});