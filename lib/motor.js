var ev3dev = require('ev3dev-lang');

module.exports.DriveMotors = function (left, right) {
  this.left = new ev3dev.LargeMotor(left);
  this.right = new ev3dev.LargeMotor(right);

  this.SLIGHT_LEFT = [0.7, 1];
  this.SLIGHT_RIGHT = [1, 0.7];
  this.HARD_LEFT = [-1, 1];
  this.HARD_RIGHT = [1, -1];

  this.run = function (left, right) {
    if (this.left.connected && this.right.connected) {
      this.left.runForever(left);
      this.right.runForever(right);
    }
  }

  this.ratio = function (ratio, power) {
    if (this.left.connected && this.right.connected) {
      this.left.runForever(ratio[0] * power);
      this.right.runForever(ratio[1] * power);
    }
  }

  this.stop = function () {
    if (this.left.connected && this.right.connected) {
      this.left.stop();
      this.right.stop();
    }
  }

  this.check = function (output) {
    output.log('check', 'checking motors');

    (this.left.connected) ? output.info('check', 'left motor connected') : output.err('check', 'left motor is not connected');
    (this.right.connected) ? output.info('check', 'right motor connected') : output.err('check', 'right motor is not connected');
  }
}