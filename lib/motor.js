module.exports.Base = function (port, errorHandler) {
  this._super.call(this, port, errorHandler);

  this.command = 'reset';
  this.speed = 0;

  this.run = function (speed) {
    if (speed) {
      if (this.speed != speed) {
        this.set('speed_sp', speed);
        this.speed = speed;
        this.set('command', 'run-forever');
      }
    }
    else if (this.command != 'run-forever') this.set('command', 'run-forever');
  };

  this.stop = function () {
    if (this.command != 'stop') this.set('command', 'stop');
  };

  this.position = function () {
    return this.get('position');
  };

  this.reset = function () {
    this.set('position', 0);
  };
};

module.exports.Base.prototype = Object.create(Device.prototype);
module.exports.Base.prototype.constructor = module.exports.Base;
module.exports.Base.prototype._super = Device;

module.exports.Drive = function (leftPort, rightPort, errorHandler) {
  this.leftPort = leftPort;
  this.rightPort = rightPort;

  this.left = new Motor(leftPort, errorHandler);
  this.right = new Motor(rightPort, errorHandler);

  this.run = function (speed) {
    this.left.run(speed);
    this.right.run(speed);
  };

  this.stop = function () {
    this.left.stop();
    this.right.stop();
  };

  this.position = function () {
    return (this.left.position() + this.right.position()) / 2;
  };

  this.reset = function () {
    this.left.reset();
    this.right.reset();
  };
};