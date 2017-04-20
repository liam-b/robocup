var button = require('./buttons.js')
var Logger = require('./log.js');
var extra = require('./io/extra.js');

var leds = new extra.Leds();
var output = new Logger(leds, (process.argv[2] == 'quiet'));

output.log('start', 'Setup finished')

loopTimer = setTimeout(loop, 10);

function loop() {
  output.info('button test', 'doing something')
  if (buttons.checkState('back') == 'pressed') {
    clearInterval(loopTimer);
    output.log('end', 'program finished');
  }
}
