var buttons = require('./buttons.js')
var Logger = require('./log.js');
var extra = require('./io/extra.js');

var leds = new extra.Leds();
var output = new Logger(leds, (process.argv[2] == 'quiet'));

output.log('start', 'Setup finished')

buttons.event.pressed('back', function () {
  clearInterval(loopTimer);
  output.log('end', 'program finished');
})

loopTimer = setTimeout(loop, 10);

function loop() {
  output.info('button test', 'doing something')
}
