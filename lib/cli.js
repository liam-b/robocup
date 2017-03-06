var readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

var word = '> ';
process.stdout.write(word);
var match = function () {};

module.exports = function (matcher) {
  match = matcher;
  process.stdin.on('keypress', function (str, key) {
    if (key.name == 'c' && key.ctrl) {
      process.stdout.write('\n');
      process.exit();
    }

    if (key.name == 'backspace') {
      word = word.slice(0, -1);
    }
    else {
      word += str;
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(word);

    if (key.name == 'return') {
      if (!match(word.substr(2).slice(0, -1))) process.stdout.write('\n');
      word = '> ';
      process.stdout.write(word);
    }
  })
}