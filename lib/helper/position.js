var sensor = require('./io/sensor.js');
var compass = new sensor.CompassSensor('in4:i2c1', output);
compass.check();

// var forward; // Not really but can't think of other var name

module.exports.direction = function (mode){
  if (mode == 'rel') {
    if (absDirection() > forward) {
      return (absDirection() - forward);
    } else if (absDirection() < forward) {
      return (360 - absDirection());
    } else {
      return (forward);
    }
  } else if (mode == 'abs') {
    return (compass.value());
  } else if (mode == 'setForward') {
    forward = compass.value()
    output.log('start', 'forward is ' + forward);
  }
}
