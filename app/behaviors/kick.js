module.exports = function (motor) {
  motor.run(1000);
  setTimeout(function () {
    motor.run(-50);
    setTimeout(function () {
      motor.stop();
      console.log('kick end');
    }, 1000);
  }, 150);
};