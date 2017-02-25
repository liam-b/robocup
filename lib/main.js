var Logger = require('./log.js');
var output = new Logger ();

var version = 'alpha 0'

function start () {
  output.log('start', 'started running version ' + version);
}

function loop () {
  output.log('loop', 'looping');
}

module.exports = {'start': start, 'loop': loop}