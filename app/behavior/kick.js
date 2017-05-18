// check whether motors are spinning the right direction
// also specs will be needed

module.exports.reset = function (motor) {
  module.exports.kick(motor)
  
  // console.log('reset start');
  // motor.run(-40); // probbably find a speed better than this
  // setTimeout(function () {
  //   motor.stop();
  //   console.log('reset end');
  // }, 1000); // find a delay that won't over rotate the motor
}

module.exports.kick = function (motor) {
  console.log('kick start');
  motor.run(1000);
  setTimeout(function () {
    motor.run(-100);
    setTimeout(function () {
      motor.stop();
      console.log('kick end');
    }, 1000); // again find appropriate delays
  }, 150);
}