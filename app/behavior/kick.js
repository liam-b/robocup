// check whether motors are spinning the right direction
// also specs will be needed

module.exports.reset = function (motor) {
  motor.run(100); // probbably find a speed better than this
  setTimeout(function () {
    motor.stop();
  }, 1000); // find a delay that won't over rotate the motor
}

module.exports.kick = function () {
  motor.run(-800);
  setTimeout(function () {
    motor.run(800);
    setTimeout(function () {
      motor.stop();
    }, 200); // again find appropriate delays
  }, 200);
}