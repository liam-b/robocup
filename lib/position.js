var sensor = require('./sensor.js');
var compass = new sensor.CompassSensor('in4:i2c1', output);
compass.check();

var north = compass.value(); // Not really but can't think of other var name

function absDirection () {
  return (compass.value());
}

function relDirection (){
  if (absDirection() > north) {
    return (absDirection() - north);
  } else if (absDirection() < north) {
    return (360 - absDirection());
  } else {
    return (north);
  }
}
